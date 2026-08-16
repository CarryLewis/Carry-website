# Animated Process Diagram — v01

## Name

Animated Process Diagram

## Problem

Processes described as A → B → C hide activation, change, and emergence. The arrows are labels, not events.

## Concept

The animation is the explanation. A signal leaves a source, a processor activates and changes state, an output emerges that did not exist at t0.

## Interaction

Play, step, reset. Stepping is for inspection; playing is for the causal arc.

## Motion

A token travels the edge (propagation). The processor fill changes (activation). The output node fades in (emergence). No bounce.

## Information Logic

Position of the token = where the signal is. Fill = whether a stage has activated. Presence of the output = the process has completed once.

## Reusability

System demonstrations, scientific mechanisms, onboarding, protocol explainers.

## Technical Approach

SVG + JavaScript class timeline. Scientific language tokens.

## Changelog

- v01 — play / step / reset of a three-stage causal process
