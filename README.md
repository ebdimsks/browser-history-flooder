# Browser History Flooder

A lightweight JavaScript script that periodically adds entries to the browser's session history by updating the URL fragment without reloading the page or changing its content.

## Features

- Automatically adds browser history entries at a configurable interval.
- Uses Xorshift32 for lightweight pseudo-random number generation.
- Generates a new 32-bit value for each history entry.
- Initializes the pseudo-random generator with a randomly generated seed.
- Requires no external libraries or dependencies.
- Runs without modifying the page content.

## Installation

1. Copy `history.min.js` into your project.
2. Include it in your HTML:

```html
<script src="history.min.js"></script>
```

The script starts automatically when loaded.

## Configuration

The update interval is defined in milliseconds.

```javascript
const intervalMs = 25;
```

The default interval of 25 milliseconds corresponds to a nominal update frequency of 40 entries per second.

## Project Structure

```text
.
├── history.js
├── history.min.js
└── examples/
    └── clock.html
```

- `history.js` — Readable JavaScript source
- `history.min.js` — Minified JavaScript
- `examples/` — Example implementations

## Technical Details

### Pseudo-Random Number Generation

The script uses Xorshift32, a lightweight 32-bit pseudo-random number generator.

Its initial state is generated using `Math.random()` once during initialization.

The generator updates its internal state using three bitwise operations:

```javascript
state ^= state << 13;
state ^= state >>> 17;
state ^= state << 5;
```

The resulting value is converted to an unsigned 32-bit integer and used as the URL fragment.

### History Management

Each update uses the History API:

```javascript
history.pushState(null, "", `#${state >>> 0}`);
```

This creates a new session history entry without reloading the document.

## Limitations

- The generated sequence is pseudo-random, not cryptographically secure.
- Different page loads may theoretically generate the same initial seed.
- The generator requires a non-zero initial state.
- The update interval is subject to browser scheduling and throttling.
- Frequent history entries can affect normal back-button navigation and consume browser resources.
