# @yeunoia/bloom

Wrap anything with a bloom.

A React component that wraps text with a hand-drawn SVG highlight.  


## Install

```
npm install @yeunoia/bloom
```

## Usage

```tsx
import { Bloom } from "@yeunoia/bloom";

<Bloom backgroundColor="#a4e7d5b3">
  This is a bloom-box.
</Bloom>

<p>
  Hello,
  <Bloom type="line" backgroundColor="#6655bb77">bloom</Bloom>.
</p>
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
