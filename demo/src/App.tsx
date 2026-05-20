import { useEffect, useState } from "react"
import { Bloom } from "@yeunoia/bloom"
import { Analytics } from "@vercel/analytics/react"

const themes = {
  dark: {
    bg: "#100f1a",
    fg: "#a8a8b8",
    highlight: "#6655bb77",
    rose: "#9955aa88",
    box: "#7766cc99",
    quote: "#3d2d7799",
  },
  light: {
    bg: "#f5f3fc",
    fg: "#3a3a3a",
    highlight: "#7755cc55",
    rose: "#bb66cc66",
    box: "#9977dd66",
    quote: "#6655bb44",
  },
}

export default function App() {
  const [mode, setMode] = useState<"dark" | "light">(() =>
    window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light"
  )

  useEffect(() => {
    const mq = window.matchMedia("(prefers-color-scheme: dark)")
    const handler = (e: MediaQueryListEvent) => setMode(e.matches ? "dark" : "light")
    mq.addEventListener("change", handler)
    return () => mq.removeEventListener("change", handler)
  }, [])

  const c = themes[mode]

  return (
    <>
      <main
        style={{
          background: c.bg,
          minHeight: "100vh",
          color: c.fg,
          fontFamily:
            "Inter, 'Helvetica Neue', system-ui, -apple-system, sans-serif",
        }}
      >
        <div
          style={{ maxWidth: 560, margin: "0 auto", padding: "60px 40px 60px" }}
        >
          <div style={{ marginBottom: 44 }}>
            <div
              style={{
                fontSize: 26,
                color: c.fg,
                fontFamily:
                  "Inter, 'Helvetica Neue', system-ui, -apple-system, sans-serif",
                letterSpacing: "-0.01em",
                fontWeight: 600,
              }}
            >
              <Bloom backgroundColor={c.box} paddingX={10} paddingY={5}>
                @yeunoia/bloom
              </Bloom>
            </div>
          </div>

          <p style={{ fontSize: 16, lineHeight: 2.2, margin: 0 }}>
            Charlie Brown was not very good at{" "}
            <Bloom
              type="line"
              backgroundColor={c.rose}
              paddingX={4}
              paddingY={2}
              scale={2}
              tip="square"
            >
              flying kites
            </Bloom>
            . Every year the kite-eating tree would get him. Every single year.
            But he always tried again, because{" "}
            <Bloom
              type="line"
              backgroundColor={c.highlight}
              paddingX={4}
              paddingY={2}
              scale={2}
            >
              that's the kind of person Charlie Brown was
            </Bloom>
            . Snoopy didn't worry about things like that. Snoopy lay on top of
            his doghouse and thought about supper. Lucy sat in her psychiatry
            booth and charged five cents for advice nobody wanted.{" "}
            <Bloom
              type="line"
              backgroundColor={c.rose}
              paddingX={4}
              paddingY={2}
              scale={3}
              tip="square"
            >
              Good grief, said Charlie Brown, which was the truest thing he ever
              said.
            </Bloom>{" "}
            Linus carried his blanket everywhere. He said security was not a
            crime. Charlie Brown thought about this for a long time. He wasn't
            sure he agreed, but he wasn't sure he disagreed either, and{" "}
            <Bloom
              type="line"
              backgroundColor={c.highlight}
              paddingX={4}
              paddingY={2}
              scale={10}
            >
              that in-between feeling was very familiar to him.
            </Bloom>
          </p>

          <p
            style={{
              fontSize: 15,
              lineHeight: 1.9,
              marginTop: 24,
              marginBottom: 0,
            }}
          >
            <Bloom
              paddingX={14}
              paddingY={10}
              scale={4}
              backgroundColor={c.highlight}
            >
              Sometimes I lie awake at night, and I ask, "Where have I gone
              wrong?" Then a voice says to me, "This is going to take more than
              one night."
            </Bloom>
          </p>

          <p
            style={{
              fontSize: 12,
              marginTop: 40,
              opacity: 0.35,
              letterSpacing: "0.04em",
              textAlign: "right",
            }}
          >
            Charles M. Schulz, <em>Peanuts</em> (1950–2000)
          </p>

          <div style={{ textAlign: "center", marginTop: 56 }}>
            <span
              style={{
                fontSize: 16,
                color: c.fg,
                fontFamily:
                  "Inter, 'Helvetica Neue', system-ui, -apple-system, sans-serif",
                letterSpacing: "0.01em",
                fontWeight: 500,
                opacity: 0.9,
              }}
            >
              wrap{" "}
              <Bloom
                type="line"
                color={c.bg}
                backgroundColor={c.rose}
                tip="square"
              >
                anything
              </Bloom>{" "}
              with{" "}
              <Bloom type="line" backgroundColor={c.box} tip="square">
                bloom
              </Bloom>
              .
            </span>
          </div>

          <div
            style={{
              display: "flex",
              justifyContent: "center",
              gap: 12,
              marginTop: 16,
            }}
          >
            <a
              href="https://github.com/yeunoia/bloom"
              target="_blank"
              rel="noreferrer"
              style={{ color: c.fg, opacity: 0.35, display: "flex" }}
              onMouseEnter={(e) => (e.currentTarget.style.opacity = "0.7")}
              onMouseLeave={(e) => (e.currentTarget.style.opacity = "0.35")}
              aria-label="GitHub"
            >
              <svg
                width="18"
                height="18"
                viewBox="0 0 24 24"
                fill="currentColor"
              >
                <path d="M12 2C6.477 2 2 6.477 2 12c0 4.418 2.865 8.166 6.839 9.489.5.092.682-.217.682-.482 0-.237-.009-.868-.013-1.703-2.782.604-3.369-1.342-3.369-1.342-.454-1.155-1.11-1.463-1.11-1.463-.908-.62.069-.608.069-.608 1.003.07 1.531 1.03 1.531 1.03.892 1.529 2.341 1.087 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.11-4.555-4.943 0-1.091.39-1.984 1.029-2.683-.103-.253-.446-1.27.098-2.647 0 0 .84-.269 2.75 1.025A9.578 9.578 0 0 1 12 6.836a9.59 9.59 0 0 1 2.504.337c1.909-1.294 2.747-1.025 2.747-1.025.546 1.377.202 2.394.1 2.647.64.699 1.028 1.592 1.028 2.683 0 3.842-2.339 4.687-4.566 4.935.359.309.678.919.678 1.852 0 1.336-.012 2.415-.012 2.741 0 .267.18.579.688.481C19.138 20.163 22 16.418 22 12c0-5.523-4.477-10-10-10z" />
              </svg>
            </a>
            <a
              href="https://www.npmjs.com/package/@yeunoia/bloom"
              target="_blank"
              rel="noreferrer"
              style={{ color: c.fg, opacity: 0.35, display: "flex" }}
              onMouseEnter={(e) => (e.currentTarget.style.opacity = "0.7")}
              onMouseLeave={(e) => (e.currentTarget.style.opacity = "0.35")}
              aria-label="npm"
            >
              <svg
                width="18"
                height="18"
                viewBox="0 0 24 24"
                fill="currentColor"
              >
                <path d="M1.763 0C.786 0 0 .786 0 1.763v20.474C0 23.214.786 24 1.763 24h20.474c.977 0 1.763-.786 1.763-1.763V1.763C24 .786 23.214 0 22.237 0zM5.13 5.323l13.837.019-.009 13.836h-3.464l.01-10.382h-3.456L12.04 19.17H5.113z" />
              </svg>
            </a>
          </div>
        </div>
      </main>
      <Analytics/>
    </>
  )
}
