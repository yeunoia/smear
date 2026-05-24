# @yeunoia/bloom

Wrap anything with a bloom.

A React component that wraps text witha hand-drawn SVG highlight — like a marker drawn over words on a page.


## Install

```
npm install @yeunoia/bloom
```

## Usage

```tsx
import { Bloom } from "@yeunoia/bloom";

//wraps the entire element
<Bloom backgroundColor="#a4e7d5b3">
  Bloom.
</Bloom>

//follows each line of text
<p>
  Charlie Brown was not very good at
  <Bloom type="line" backgroundColor="#6655bb77">flying kites</Bloom>.
</p>
```

Use `scale` to control how organic the edges feel:

```tsx
<Bloom scale={1}>barely there</Bloom>
<Bloom scale={4}>default</Bloom>
<Bloom scale={10}>loose and wobbly</Bloom>
```

Use `gradient` for a multi-color fill:

```tsx
<Bloom gradient={["#ffdd7766", "#ffaacc77", "#cc88ff77"]}>
  spring colors
</Bloom>
```

Use `animated` to draw the highlight on mount:

```tsx
<Bloom animated>draws itself in</Bloom>
<Bloom animated delay={0.5} duration={1.2}>slower, with a delay</Bloom>
```
## Props

| Prop              | Type | Default | Description |
|-------------------|------|---------|-------------|
| `type`            | `"box" \| "line"` | `"box"` | `box` wraps the entire element, `line` highlights each line individually |
| `tip`             | `"round" \| "square"` | `"round"` | Shape of the highlight corners |
| `messiness`       | `number` | `4` | Wobble intensity. Recommended range: 1–10 |
| `backgroundColor` | `string` | `"#A4E7D5B3"` | Fill color of the highlight |
| `gradient`        | `string[]` | — | Array of colors for a left-to-right gradient fill. Overrides `backgroundColor` |
| `color`           | `string` | `"inherit"` | Text color |
| `paddingX`        | `number` | `4` | Horizontal padding (px) |
| `paddingY`        | `number` | `2` | Vertical padding (px) |
| `animated`        | `boolean` | `false` | Draw the highlight with an animation on mount |
| `delay`           | `number` | `0.2` | Delay before the animation starts (seconds) |
| `duration`        | `number` | `0.6` | How long the draw animation takes (seconds) |

## Requirements

React ≥ 17
