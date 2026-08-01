import {
  Badge,
  Button,
  Card,
  CardHeader,
  Divider,
  FluentProvider,
  Tag,
  TagGroup,
  Text,
  makeStyles,
  tokens,
  webDarkTheme,
  webLightTheme,
  type Theme,
} from "@fluentui/react-components";
import { useEffect, useRef, useState, type KeyboardEvent } from "react";

type StackId = "react" | "typescript" | "fluent";

type StackItem = {
  id: StackId;
  monogram: string;
  name: string;
  role: string;
  detail: string;
  proof: string;
};

const stack: StackItem[] = [
  {
    id: "react",
    monogram: "R",
    name: "React",
    role: "Interactive interface",
    detail:
      "React powers the stateful stack explorer you are using right now, while Astro keeps the rest of the page static.",
    proof: "Selection state, keyboard interaction, and client-side updates.",
  },
  {
    id: "typescript",
    monogram: "TS",
    name: "TypeScript",
    role: "Typed contracts",
    detail:
      "The stack data, selected state, event handlers, and component boundaries are all explicitly typed.",
    proof: "Strict types across Astro and the React island.",
  },
  {
    id: "fluent",
    monogram: "F",
    name: "Fluent UI",
    role: "Component system",
    detail:
      "Fluent UI provides this panel’s cards, buttons, badges, tags, design tokens, focus states, and dark theme.",
    proof: "Fluent UI 9 components with a custom warm brand theme.",
  },
];

const lightTheme: Theme = {
  ...webLightTheme,
  colorBrandBackground: "#a93b1d",
  colorBrandBackgroundHover: "#8f2f16",
  colorBrandBackgroundPressed: "#72230f",
  colorBrandForeground1: "#a93b1d",
  colorBrandForeground2: "#8f2f16",
  colorNeutralBackground1: "#f8f3ea",
  colorNeutralBackground2: "#ece3d5",
  colorNeutralBackground3: "#e3d8c8",
  colorNeutralForeground1: "#191815",
  colorNeutralForeground2: "#625d54",
  colorNeutralStroke1: "#cec4b3",
  colorNeutralStroke2: "#ddd3c4",
};

const darkTheme: Theme = {
  ...webDarkTheme,
  colorBrandBackground: "#8f321a",
  colorBrandBackgroundHover: "#a93b1d",
  colorBrandBackgroundPressed: "#72230f",
  colorBrandForeground1: "#ffad8f",
  colorBrandForeground2: "#ff895f",
  colorNeutralBackground1: "#1b1916",
  colorNeutralBackground2: "#25221e",
  colorNeutralBackground3: "#302c27",
  colorNeutralForeground1: "#f1ebdf",
  colorNeutralForeground2: "#aaa195",
  colorNeutralStroke1: "#49443d",
  colorNeutralStroke2: "#39352f",
};

const useStyles = makeStyles({
  provider: {
    display: "block",
    backgroundColor: "transparent",
  },
  shell: {
    overflow: "hidden",
    border: `${tokens.strokeWidthThin} solid ${tokens.colorNeutralStroke1}`,
    borderRadius: tokens.borderRadiusXLarge,
    backgroundColor: tokens.colorNeutralBackground1,
    boxShadow: tokens.shadow16,
  },
  header: {
    display: "flex",
    alignItems: "flex-start",
    justifyContent: "space-between",
    gap: tokens.spacingHorizontalL,
    padding: tokens.spacingVerticalXXL,
    paddingBottom: tokens.spacingVerticalL,
    "@media (max-width: 560px)": {
      flexDirection: "column",
    },
  },
  overline: {
    display: "block",
    color: tokens.colorBrandForeground1,
    fontFamily: "ui-monospace, SFMono-Regular, Consolas, monospace",
    letterSpacing: "0.1em",
    textTransform: "uppercase",
  },
  title: {
    display: "block",
    marginTop: tokens.spacingVerticalXS,
    letterSpacing: "-0.025em",
  },
  liveBadge: {
    flexShrink: 0,
  },
  tags: {
    display: "flex",
    flexWrap: "wrap",
    gap: tokens.spacingHorizontalS,
    paddingRight: tokens.spacingHorizontalXXL,
    paddingBottom: tokens.spacingVerticalXXL,
    paddingLeft: tokens.spacingHorizontalXXL,
  },
  body: {
    display: "grid",
    gridTemplateColumns: "minmax(12rem, 0.52fr) minmax(0, 1fr)",
    gap: tokens.spacingHorizontalXL,
    padding: tokens.spacingHorizontalXXL,
    borderTop: `${tokens.strokeWidthThin} solid ${tokens.colorNeutralStroke1}`,
    backgroundColor: tokens.colorNeutralBackground2,
    "@media (max-width: 720px)": {
      gridTemplateColumns: "1fr",
    },
  },
  tabs: {
    display: "grid",
    alignContent: "start",
    gap: tokens.spacingVerticalS,
  },
  tab: {
    justifyContent: "flex-start",
    width: "100%",
    minHeight: "3.4rem",
  },
  monogram: {
    display: "grid",
    width: "1.75rem",
    height: "1.75rem",
    placeItems: "center",
    borderRadius: tokens.borderRadiusCircular,
    backgroundColor: tokens.colorNeutralBackground3,
    color: tokens.colorNeutralForeground1,
    fontFamily: "ui-monospace, SFMono-Regular, Consolas, monospace",
    fontSize: tokens.fontSizeBase100,
    fontWeight: tokens.fontWeightBold,
  },
  detailCard: {
    minHeight: "16rem",
    padding: tokens.spacingHorizontalXL,
  },
  detailBody: {
    display: "grid",
    gap: tokens.spacingVerticalL,
    marginTop: tokens.spacingVerticalL,
  },
  proof: {
    display: "grid",
    gap: tokens.spacingVerticalXS,
    padding: tokens.spacingHorizontalL,
    borderLeft: `${tokens.strokeWidthThick} solid ${tokens.colorBrandBackground}`,
    backgroundColor: tokens.colorNeutralBackground1,
  },
  proofLabel: {
    color: tokens.colorBrandForeground1,
    fontFamily: "ui-monospace, SFMono-Regular, Consolas, monospace",
    letterSpacing: "0.08em",
    textTransform: "uppercase",
  },
  footer: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    gap: tokens.spacingHorizontalL,
    padding: `${tokens.spacingVerticalL} ${tokens.spacingHorizontalXXL}`,
    borderTop: `${tokens.strokeWidthThin} solid ${tokens.colorNeutralStroke1}`,
    color: tokens.colorNeutralForeground2,
    "@media (max-width: 560px)": {
      alignItems: "flex-start",
      flexDirection: "column",
    },
  },
});

function prefersDarkMode(): boolean {
  return (
    typeof window !== "undefined" &&
    window.matchMedia("(prefers-color-scheme: dark)").matches
  );
}

export default function StackExplorer() {
  const styles = useStyles();
  const [isDark, setIsDark] = useState(prefersDarkMode);
  const [selectedId, setSelectedId] = useState<StackId>("react");
  const tabRefs = useRef<Array<HTMLElement | null>>([]);
  const selectedIndex = stack.findIndex((item) => item.id === selectedId);
  const selected = stack[selectedIndex];

  useEffect(() => {
    const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");
    const updateTheme = (event: MediaQueryListEvent) =>
      setIsDark(event.matches);

    mediaQuery.addEventListener("change", updateTheme);
    return () => mediaQuery.removeEventListener("change", updateTheme);
  }, []);

  const selectTab = (index: number) => {
    const nextIndex = (index + stack.length) % stack.length;
    setSelectedId(stack[nextIndex].id);
    tabRefs.current[nextIndex]?.focus();
  };

  const handleTabKeyDown = (
    event: KeyboardEvent<HTMLButtonElement>,
    index: number,
  ) => {
    if (event.key === "ArrowDown" || event.key === "ArrowRight") {
      event.preventDefault();
      selectTab(index + 1);
    }

    if (event.key === "ArrowUp" || event.key === "ArrowLeft") {
      event.preventDefault();
      selectTab(index - 1);
    }

    if (event.key === "Home") {
      event.preventDefault();
      selectTab(0);
    }

    if (event.key === "End") {
      event.preventDefault();
      selectTab(stack.length - 1);
    }
  };

  return (
    <FluentProvider
      className={styles.provider}
      theme={isDark ? darkTheme : lightTheme}
    >
      <div className={styles.shell}>
        <div className={styles.header}>
          <div>
            <Text className={styles.overline} size={200} weight="semibold">
              Interactive proof / React island
            </Text>
            <Text className={styles.title} as="h3" size={600} weight="semibold">
              Built with the stack it names.
            </Text>
          </div>
          <Badge className={styles.liveBadge} appearance="tint" color="success">
            Running in the browser
          </Badge>
        </div>

        <TagGroup className={styles.tags} aria-label="Technology stack">
          <Tag appearance="filled" shape="rounded" value="React">
            React
          </Tag>
          <Tag appearance="filled" shape="rounded" value="TypeScript">
            TypeScript
          </Tag>
          <Tag appearance="brand" shape="rounded" value="Fluent UI">
            Fluent UI
          </Tag>
        </TagGroup>

        <div className={styles.body}>
          <div
            className={styles.tabs}
            role="tablist"
            aria-label="Stack details"
          >
            {stack.map((item, index) => {
              const isSelected = item.id === selectedId;

              return (
                <Button
                  key={item.id}
                  ref={(element) => {
                    tabRefs.current[index] = element;
                  }}
                  id={`stack-tab-${item.id}`}
                  className={styles.tab}
                  appearance={isSelected ? "primary" : "subtle"}
                  icon={
                    <span className={styles.monogram} aria-hidden="true">
                      {item.monogram}
                    </span>
                  }
                  role="tab"
                  aria-controls="stack-detail"
                  aria-selected={isSelected}
                  tabIndex={isSelected ? 0 : -1}
                  onClick={() => setSelectedId(item.id)}
                  onKeyDown={(event) => handleTabKeyDown(event, index)}
                >
                  {item.name}
                </Button>
              );
            })}
          </div>

          <Card
            id="stack-detail"
            className={styles.detailCard}
            appearance="filled-alternative"
            size="large"
            role="tabpanel"
            aria-labelledby={`stack-tab-${selected.id}`}
          >
            <CardHeader
              header={
                <Text as="h4" size={500} weight="semibold">
                  {selected.name}
                </Text>
              }
              description={<Text size={300}>{selected.role}</Text>}
              action={
                <Badge appearance="outline" color="brand">
                  Selected
                </Badge>
              }
            />
            <Divider />
            <div className={styles.detailBody}>
              <Text as="p" size={400}>
                {selected.detail}
              </Text>
              <div className={styles.proof}>
                <Text className={styles.proofLabel} size={100} weight="bold">
                  On this page
                </Text>
                <Text as="p" size={300}>
                  {selected.proof}
                </Text>
              </div>
            </div>
          </Card>
        </div>

        <div className={styles.footer}>
          <Text size={200}>
            Astro shell · React island · TypeScript strict mode
          </Text>
          <Badge appearance="outline" color="brand">
            Fluent UI 9
          </Badge>
        </div>
      </div>
    </FluentProvider>
  );
}
