import { useEffect, useState } from "react"
import { Smear } from "@yeunoia/smear"

const themes = {
  dark: {
    bg: "#0d0d0d",
    surface: "#141414",
    border: "#1e1e1e",
    text: "#d0d0d0",
    muted: "#555",
    heading: "#eee",
    code: "#aaa",
    blobColors: [
      "#2a1a3aB3",
      "#1a2535B3",
      "#3a1a2aB3",
      "#1a2a2aB3",
      "#3a1a1aB3",
    ],
    heroSmear: "#1a3a2aB3",
    heroText: "#ccc",
  },
  light: {
    bg: "#fafafa",
    surface: "#f0f0f0",
    border: "#e0e0e0",
    text: "#2a2a2a",
    muted: "#999",
    heading: "#111",
    code: "#555",
    blobColors: [
      "#e8d5f5B3",
      "#d5e8f5B3",
      "#f5d5e8B3",
      "#d5f5e8B3",
      "#f5e8d5B3",
    ],
    heroSmear: "#c8f0dcB3",
    heroText: "#333",
  },
}

const names = ["rainbow", "cloud", "dusk", "mist", "ember"]

export default function App() {
  const [mode, setMode] = useState<"dark" | "light">(() =>
    window.matchMedia("(prefers-color-scheme: dark)").matches
      ? "dark"
      : "light",
  )

  useEffect(() => {
    const mq = window.matchMedia("(prefers-color-scheme: dark)")
    const handler = (e: MediaQueryListEvent) =>
      setMode(e.matches ? "dark" : "light")
    mq.addEventListener("change", handler)
    return () => mq.removeEventListener("change", handler)
  }, [])

  const c = themes[mode]

  const CodeBlock = ({ children }: { children: string }) => (
    <pre
      style={{
        fontFamily: "monospace",
        fontSize: 13,
        color: c.code,
        background: c.surface,
        border: `1px solid ${c.border}`,
        borderRadius: 8,
        padding: "16px 20px",
        overflowX: "auto",
        lineHeight: 1.7,
        margin: 0,
      }}
    >
      {children}
    </pre>
  )

  return (
    <main
      style={{
        background: c.bg,
        minHeight: "100vh",
        color: c.text,
        fontFamily: "system-ui, -apple-system, sans-serif",
      }}
    >
      <div
        style={{ maxWidth: 600, margin: "0 auto", padding: "80px 24px 120px" }}
      >
        <section style={{ marginBottom: 24 }}>
          <div style={{ marginBottom: 16 }}>
            <h1
              style={{
                fontSize: 24,
                fontWeight: 500,
                letterSpacing: "-0.02em",
                color: c.heading,
                margin: 0,
              }}
            >
              @yeunoia/smear
            </h1>
          </div>
          <p
            style={{
              fontSize: 15,
              color: c.muted,
              lineHeight: 1.7,
              marginBottom: 28,
            }}
          >
            Wrap{" "}
            <Smear
              backgroundColor={c.heroSmear}
              paddingX={8}
              paddingY={3}
              color={c.heroText}
              tip="round"
            >
              anything
            </Smear>{" "}
            with smear
          </p>
          <CodeBlock>{"npm install @yeunoia/smear"}</CodeBlock>
        </section>

        <section>
          <div
            style={{
              background: c.surface,
              border: `1px solid ${c.border}`,
              borderRadius: 12,
              padding: 32,
              display: "flex",
              gap: 24,
              fontSize: 13,
              color: c.code,
              fontFamily: "monospace",
            }}
          >
            {names.map((name, i) => (
              <Smear
                key={name}
                backgroundColor={c.blobColors[i]}
                paddingX={10}
                paddingY={5}
              >
                {name}
              </Smear>
            ))}
          </div>
        </section>
      </div>
    </main>
  )
}
