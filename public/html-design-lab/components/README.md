# Components

Primitives are extracted here only when they actually repeat.

Do not invent a component system in advance. Experiments should copy what they need until a pattern has proven itself in more than one place.

When extracting:

```
components/
  navigation/
  typography/
  image/
  graph/
  timeline/
  diagram/
  tooltip/
  modal/
  annotation/
  progress/
  cursor/
  canvas/
```

Each primitive should be a small, documented HTML/CSS/JS fragment — not a framework. Experiments remain independently understandable even if they stop importing a component.

Until then, this folder exists only as a convention.
