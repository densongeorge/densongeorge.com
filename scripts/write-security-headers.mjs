import { createHash } from "node:crypto";
import { readdir, readFile, stat, writeFile } from "node:fs/promises";
import path from "node:path";

const outputDirectory = path.resolve("dist");

async function listHtmlFiles(directory) {
  const entries = await readdir(directory, { withFileTypes: true });
  const files = await Promise.all(
    entries.map(async (entry) => {
      const resolvedPath = path.join(directory, entry.name);

      if (entry.isDirectory()) {
        return listHtmlFiles(resolvedPath);
      }

      return entry.name.endsWith(".html") ? [resolvedPath] : [];
    }),
  );

  return files.flat();
}

function inlineScriptHashes(html) {
  return [...html.matchAll(/<script(?:\s[^>]*)?>([\s\S]*?)<\/script>/gi)]
    .map((match) => match[1])
    .filter((script) => script.length > 0)
    .map((script) => {
      const digest = createHash("sha256").update(script).digest("base64");
      return `'sha256-${digest}'`;
    });
}

const outputStats = await stat(outputDirectory).catch(() => undefined);

if (!outputStats?.isDirectory()) {
  throw new Error("Expected dist/ to exist before writing Cloudflare headers.");
}

const htmlFiles = await listHtmlFiles(outputDirectory);
const hashes = new Set();

for (const htmlFile of htmlFiles) {
  const html = await readFile(htmlFile, "utf8");

  for (const hash of inlineScriptHashes(html)) {
    hashes.add(hash);
  }
}

const scriptSources = ["'self'", ...hashes].join(" ");
const contentSecurityPolicy = [
  "default-src 'self'",
  "base-uri 'self'",
  "form-action 'self'",
  "frame-ancestors 'none'",
  "img-src 'self' data:",
  "object-src 'none'",
  `script-src ${scriptSources}`,
  "style-src 'self'",
  "font-src 'self'",
].join("; ");

const headers = `/*
  Content-Security-Policy: ${contentSecurityPolicy}
  Permissions-Policy: camera=(), geolocation=(), microphone=()
  Referrer-Policy: strict-origin-when-cross-origin
  X-Content-Type-Options: nosniff
  X-Frame-Options: DENY
`;

await writeFile(path.join(outputDirectory, "_headers"), headers, "utf8");

console.log(
  `Generated Cloudflare security headers with ${hashes.size} inline script hashes.`,
);
