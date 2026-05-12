import { Smear } from "@yeunoia/smear"

const c = {
  bg: "#0d0d0d",
  surface: "#141414",
  border: "#1e1e1e",
  text: "#d0d0d0",
  muted: "#555",
  subtle: "#333",
  code: "#4ade80",
}

const Label = ({ children }: { children: string }) => (
  <p
    style={{
      fontSize: 11,
      color: c.muted,
      letterSpacing: "0.12em",
      textTransform: "uppercase",
      marginBottom: 20,
    }}
  >
    {children}
  </p>
)

const Code = ({ children }: { children: string }) => (
  <code
    style={{
      fontFamily: "monospace",
      fontSize: 13,
      color: c.code,
      background: "#0a1a0a",
      padding: "2px 6px",
      borderRadius: 4,
    }}
  >
    {children}
  </code>
)

const CodeBlock = ({ children }: { children: string }) => (
  <pre
    style={{
      fontFamily: "monospace",
      fontSize: 13,
      color: "#aaa",
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

const names = ["maxwell s. fritz", "midwest emo fan", "ye_chu", "dan", "robin"]
const blobColors = ["#1a3a2a", "#1a2a3a", "#2a1a3a", "#1a3a3a", "#2a2a1a"]

export default function App() {
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
        {/* hero */}
        <section style={{ marginBottom: 72 }}>
          <div
            style={{
              display: "flex",
              alignItems: "baseline",
              gap: 12,
              marginBottom: 16,
            }}
          >
            <h1
              style={{
                fontSize: 24,
                fontWeight: 500,
                letterSpacing: "-0.02em",
                color: "#eee",
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
            <Smear backgroundColor="#1a3a2a" paddingX={8} paddingY={3}>
              <span style={{ color: "#ccc" }}>anything</span>
            </Smear>{" "}
            with smear
          </p>
          <CodeBlock>{"npm install @yeunoia/smear"}</CodeBlock>
        </section>

        {/* usage */}
        <section style={{ marginBottom: 72 }}>
          <Label>usage</Label>
          <CodeBlock>{`import { Smear } from 'smear'

<Smear backgroundColor="#1a3a2a">
  <span>hello world</span>
</Smear>`}</CodeBlock>
        </section>

        {/* live demo */}
        <section style={{ marginBottom: 72 }}>
          <Label>live</Label>
          <div
            style={{
              background: c.surface,
              border: `1px solid ${c.border}`,
              borderRadius: 12,
              padding: 32,
              display: "flex",
              flexWrap: "wrap",
              gap: 12,
            }}
          >
            {names.map((name, i) => (
              <Smear
                key={name}
                backgroundColor={blobColors[i]}
                paddingX={10}
                paddingY={5}
              >
                <span
                  style={{
                    fontSize: 13,
                    color: "#aaa",
                    fontFamily: "monospace",
                  }}
                >
                  {name}
                </span>
              </Smear>
            ))}
          </div>
        </section>

        {/* props */}
        <section style={{ marginBottom: 72 }}>
          <Label>props</Label>
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              gap: 0,
              border: `1px solid ${c.border}`,
              borderRadius: 8,
              overflow: "hidden",
            }}
          >
            {[
              {
                name: "backgroundColor",
                type: "string",
                default: '"#1a3a36"',
                desc: "blob fill color",
              },
              {
                name: "paddingX",
                type: "number",
                default: "4",
                desc: "horizontal space around content",
              },
              {
                name: "paddingY",
                type: "number",
                default: "2",
                desc: "vertical space around content",
              },
              {
                name: "random",
                type: "boolean",
                default: "true",
                desc: "randomize shape each render",
              },
            ].map((prop, i) => (
              <div
                key={prop.name}
                style={{
                  display: "grid",
                  gridTemplateColumns: "160px 80px 1fr",
                  padding: "12px 16px",
                  gap: 12,
                  alignItems: "center",
                  background: i % 2 === 0 ? c.surface : "transparent",
                  borderTop: i > 0 ? `1px solid ${c.border}` : "none",
                  fontSize: 13,
                }}
              >
                <Code>{prop.name}</Code>
                <span style={{ color: "#7aa" }}>{prop.type}</span>
                <span style={{ color: c.muted }}>
                  {prop.desc}{" "}
                  <span style={{ color: c.subtle }}>· {prop.default}</span>
                </span>
              </div>
            ))}
          </div>
        </section>

        {/* inline example */}
        <section>
          <Label>inline</Label>
          <p style={{ fontSize: 16, lineHeight: 2.2, color: "#777" }}>
            scrobbled by{" "}
            <Smear backgroundColor="#1a3a2a" paddingX={10} paddingY={4}>
              <span
                style={{ color: "#aaa", fontFamily: "monospace", fontSize: 13 }}
              >
                maxwell s. fritz
              </span>
            </Smear>
            {" · "}
            <Smear backgroundColor="#1a2a3a" paddingX={10} paddingY={4}>
              <span
                style={{ color: "#aaa", fontFamily: "monospace", fontSize: 13 }}
              >
                6h ago
              </span>
            </Smear>
          </p>
        </section>
      </div>
    </main>
  )
}
