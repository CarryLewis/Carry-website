# Negative-Feedback Loop — v01

## Name

Negative-Feedback Loop

## Problem

Feedback is often drawn as a pretty circle that does not encode sensor, integrator, effector, or variable. Decoration replaces mechanism.

## Concept

A labeled control loop for core temperature regulation (simplified). A disturbance raises the variable; thermoreceptors report; the hypothalamus computes error against setpoint; effectors oppose the change.

## Interaction

Disturb (raise the variable). Play the loop. Watch error grow and then shrink as the effector works. Reset.

## Motion

The variable trace drifts, then returns. Error magnitude is line weight / label. Effector opacity tracks output. Motion is the physiology, simplified — not a bounce.

## Information Logic

- Variable: core temperature
- Setpoint: hypothalamic set point
- Sensor: thermoreceptors
- Integrator: hypothalamus (error = setpoint − variable)
- Effector: heat-loss mechanisms (here: a generic opposing effector)

This is a teaching diagram, not a complete thermoregulation simulator. Signs follow negative feedback: effector output rises when the variable is above setpoint.

## Reusability

Physiology explainers, control systems, medical education patterns (not a product simulator).

## Technical Approach

SVG loop + JavaScript discrete-time update. Simulator language tokens.

## Changelog

- v01 — disturbible negative-feedback loop with labeled control elements
