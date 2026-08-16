# Layered Image Annotation — v01

## Name

Layered Image Annotation

## Problem

A caption under an image cannot point at structure inside the image. The figure remains a picture; the explanation remains a paragraph.

## Concept

One plate. Numbered hotspots. Selecting a hotspot dims the rest of the field and opens a layered callout on the structure itself.

## Interaction

Hover previews a number. Click locks focus and shows the callout. Click again or click the plate to release.

## Motion

Focus dimming. Callout fade. No zoom gimmick.

## Information Logic

Index numbers are stable identifiers. Callout text is local to a region. Dimming encodes “this is the figure, that is the rest.”

## Reusability

Anatomy, scientific figures, screenshot evidence, museum labels.

## Technical Approach

SVG plate + absolutely positioned hotspots. Exhibition language tokens.

## Changelog

- v01 — numbered hotspots with focus dimming and layered callouts
