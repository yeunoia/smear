import { useEffect, useState } from "react"
import { Bloom } from "@yeunoia/bloom"

const themes = {
  dark: {
    bg: "#100f1a",
    fg: "#a8a8b8",
    highlight: "#6655bb77",
    pink: "#cc557766",
    box: "#7766cc99",
    quote: "#3d2d7799",
  },
  light: {
    bg: "#f5f3fc",
    fg: "#3a3a3a",
    highlight: "#7755cc55",
    pink: "#dd668844",
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
    <main
      style={{
        background: c.bg,
        minHeight: "100vh",
        color: c.fg,
        fontFamily: "Inter, 'Helvetica Neue', system-ui, -apple-system, sans-serif",
      }}
    >
      <div style={{ maxWidth: 560, margin: "0 auto", padding: "60px 40px 60px" }}>
        <div style={{ marginBottom: 44 }}>
          <div
            style={{
              fontSize: 26,
              color: c.fg,
              fontFamily: "Inter, 'Helvetica Neue', system-ui, -apple-system, sans-serif",
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
          <Bloom type="line" backgroundColor={c.highlight} paddingX={4} paddingY={2}>flying kites</Bloom>.
          {" "}Every year the kite-eating tree would get him. Every single year. But he always tried
          again, because{" "}
          <Bloom type="line" backgroundColor={c.highlight} paddingX={4} paddingY={2}>
            that's the kind of person Charlie Brown was
          </Bloom>
          . Snoopy didn't worry about things like that. Snoopy lay on top of his doghouse and
          thought about supper. Lucy sat in her psychiatry booth and charged five cents for advice
          nobody wanted.{" "}
          <Bloom type="line" backgroundColor={c.highlight} paddingX={4} paddingY={2}>
            Good grief, said Charlie Brown, which was the truest thing he ever said.
          </Bloom>
          {" "}Linus carried his blanket everywhere. He said security was not a crime. Charlie Brown
          thought about this for a long time. He wasn't sure he agreed, but he wasn't sure he
          disagreed either, and{" "}
          <Bloom type="line" backgroundColor={c.highlight} paddingX={4} paddingY={2}>
            that in-between feeling was very familiar to him
          </Bloom>
          . The baseball team lost again. They always lost. And yet on Saturday morning they would
          all show up, gloves in hand, ready to lose some more.{" "}
          <Bloom type="line" backgroundColor={c.highlight} paddingX={4} paddingY={2}>
            There is something to be said for that, even if Charlie Brown couldn't quite say what.
          </Bloom>
        </p>

        <p style={{ fontSize: 15, lineHeight: 1.9, marginTop: 28, marginBottom: 0 }}>
          <Bloom backgroundColor={c.quote} paddingX={14} paddingY={10}>
            Sometimes I lie awake at night, and I ask, "Where have I gone wrong?" Then a voice says to me, "This is going to take more than one night."
          </Bloom>
        </p>

        <p style={{ fontSize: 12, marginTop: 56, opacity: 0.35, letterSpacing: "0.04em", textAlign: "right" }}>
          Charles M. Schulz, <em>Peanuts</em> (1950–2000)
        </p>

        <div style={{ textAlign: "center", marginTop: 48 }}>
          <span
            style={{
              fontSize: 18,
              color: c.fg,
              fontFamily: "Inter, 'Helvetica Neue', system-ui, -apple-system, sans-serif",
              letterSpacing: "0.01em",
              fontWeight: 500,
              opacity: 0.9,
            }}
          >
            wrap{" "}
            <Bloom type="line" backgroundColor={c.highlight} paddingX={4} paddingY={2}>
              anything
            </Bloom>
            {" "}with{" "}
            <Bloom type="line" backgroundColor={c.box} paddingX={4} paddingY={2}>
              bloom
            </Bloom>
            .
          </span>
        </div>
      </div>
    </main>
  )
}
