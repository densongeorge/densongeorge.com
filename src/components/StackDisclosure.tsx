import {
  FluentProvider,
  Tab,
  TabList,
  Text,
  makeStyles,
  tokens,
  webDarkTheme,
  webLightTheme,
  type SelectTabData,
  type SelectTabEvent,
  type Theme,
} from "@fluentui/react-components";
import { useEffect, useState } from "react";

type StackId = "ui" | "backend" | "platform";

type StackItem = {
  name: string;
  role: string;
  detail: string;
};

const stack: Record<StackId, StackItem> = {
  ui: {
    name: "UI",
    role: "Interface",
    detail: "React, TypeScript, and Fluent UI.",
  },
  backend: {
    name: "Backend",
    role: "Services",
    detail: "C# and .NET; Java and Spring Boot; Python.",
  },
  platform: {
    name: "Platform",
    role: "Infrastructure",
    detail: "Kubernetes.",
  },
};

const lightTheme: Theme = {
  ...webLightTheme,
  colorBrandForeground1: "#8b3d2a",
  colorBrandForeground2: "#6f2f20",
  colorCompoundBrandForeground1: "#8b3d2a",
  colorCompoundBrandForeground1Hover: "#6f2f20",
  colorCompoundBrandForeground1Pressed: "#572518",
  colorCompoundBrandStroke: "#8b3d2a",
  colorCompoundBrandStrokeHover: "#6f2f20",
  colorCompoundBrandStrokePressed: "#572518",
  colorNeutralBackground1: "#f7f5ef",
  colorNeutralForeground1: "#1d1c19",
  colorNeutralForeground2: "#69645c",
  colorNeutralStroke1: "#d8d3c9",
};

const darkTheme: Theme = {
  ...webDarkTheme,
  colorBrandForeground1: "#dfa08e",
  colorBrandForeground2: "#efb7a7",
  colorCompoundBrandForeground1: "#dfa08e",
  colorCompoundBrandForeground1Hover: "#efb7a7",
  colorCompoundBrandForeground1Pressed: "#f4c7ba",
  colorCompoundBrandStroke: "#dfa08e",
  colorCompoundBrandStrokeHover: "#efb7a7",
  colorCompoundBrandStrokePressed: "#f4c7ba",
  colorNeutralBackground1: "#121210",
  colorNeutralForeground1: "#efede7",
  colorNeutralForeground2: "#aaa59b",
  colorNeutralStroke1: "#37342f",
};

const useStyles = makeStyles({
  provider: {
    display: "block",
    backgroundColor: "transparent",
  },
  shell: {
    paddingTop: tokens.spacingVerticalL,
    paddingBottom: tokens.spacingVerticalL,
    borderTop: `${tokens.strokeWidthThin} solid ${tokens.colorNeutralStroke1}`,
    borderBottom: `${tokens.strokeWidthThin} solid ${tokens.colorNeutralStroke1}`,
  },
  label: {
    display: "block",
    color: tokens.colorNeutralForeground2,
    fontSize: tokens.fontSizeBase100,
    fontWeight: tokens.fontWeightSemibold,
    letterSpacing: "0.09em",
    textTransform: "uppercase",
  },
  tabs: {
    marginTop: tokens.spacingVerticalS,
  },
  detail: {
    display: "grid",
    gridTemplateColumns: "minmax(6rem, 0.22fr) minmax(0, 1fr)",
    gap: tokens.spacingHorizontalXL,
    minHeight: "5.5rem",
    marginTop: tokens.spacingVerticalL,
    paddingTop: tokens.spacingVerticalL,
    borderTop: `${tokens.strokeWidthThin} solid ${tokens.colorNeutralStroke1}`,
    "@media (max-width: 560px)": {
      gridTemplateColumns: "1fr",
      gap: tokens.spacingVerticalXS,
    },
  },
  role: {
    color: tokens.colorBrandForeground1,
  },
  description: {
    maxWidth: "36rem",
    color: tokens.colorNeutralForeground2,
    lineHeight: tokens.lineHeightBase400,
  },
});

function prefersDarkMode(): boolean {
  return (
    typeof window !== "undefined" &&
    window.matchMedia("(prefers-color-scheme: dark)").matches
  );
}

function isStackId(value: SelectTabData["value"]): value is StackId {
  return typeof value === "string" && Object.hasOwn(stack, value);
}

export default function StackDisclosure() {
  const styles = useStyles();
  const [isDark, setIsDark] = useState(prefersDarkMode);
  const [selectedId, setSelectedId] = useState<StackId>("ui");
  const selected = stack[selectedId];

  useEffect(() => {
    const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");
    const updateTheme = (event: MediaQueryListEvent) =>
      setIsDark(event.matches);

    mediaQuery.addEventListener("change", updateTheme);
    return () => mediaQuery.removeEventListener("change", updateTheme);
  }, []);

  const handleTabSelect = (_event: SelectTabEvent, data: SelectTabData) => {
    if (isStackId(data.value)) {
      setSelectedId(data.value);
    }
  };

  return (
    <FluentProvider
      className={styles.provider}
      theme={isDark ? darkTheme : lightTheme}
    >
      <div className={styles.shell}>
        <Text className={styles.label}>Full-stack toolkit</Text>
        <TabList
          className={styles.tabs}
          selectedValue={selectedId}
          onTabSelect={handleTabSelect}
          aria-label="Full-stack technology areas"
        >
          {Object.entries(stack).map(([id, item]) => (
            <Tab key={id} id={`stack-tab-${id}`} value={id}>
              {item.name}
            </Tab>
          ))}
        </TabList>

        <div
          className={styles.detail}
          role="tabpanel"
          aria-labelledby={`stack-tab-${selectedId}`}
        >
          <Text className={styles.role} weight="semibold">
            {selected.role}
          </Text>
          <Text className={styles.description} as="p">
            {selected.detail}
          </Text>
        </div>
      </div>
    </FluentProvider>
  );
}
