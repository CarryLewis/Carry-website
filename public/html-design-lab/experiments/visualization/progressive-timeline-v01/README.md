# Progressive Timeline — v01

## Name

Progressive Timeline

## Problem

Chronologies shown all at once flatten sequence and overwhelm detail. Overview and event cannot occupy the same visual weight.

## Concept

A single axis. Events emerge as the reader scrubs. Selecting an event opens its detail without stacking a second timeline.

## Interaction

Scrub the range control or use arrow keys on events. Click an event for detail. Overview remains visible.

## Motion

Events fade onto the axis in time order. The playhead is the only moving marker. Detail replaces, it does not accumulate.

## Information Logic

Position encodes time. Opacity encodes “has been reached.” The detail panel encodes the currently selected scale (event, not epoch).

## Reusability

Project histories, disease progression, research chronologies, exhibition sequences.

## Technical Approach

HTML axis + range input + JavaScript. Data language tokens.

## Changelog

- v01 — scrub-revealed events with overview → event → detail
