# Interactive Knowledge Graph — v01

## Name

Interactive Knowledge Graph

## Problem

Relationship networks are unreadable when every node is equally present. Static graphs become visual noise; the reader cannot ask “what is near this idea?”

## Concept

An SVG graph that stays quiet. Hover focuses a neighborhood. Click opens a dossier. The rest of the field recedes.

## Interaction

Hover → highlight neighborhood. Click → dossier. Click the field or close to return.

## Motion

Neighborhood emphasis (opacity and stroke). Dossier slides from the side. No force-layout jitter.

## Information Logic

Nodes are concepts. Edges are typed relations (informs, tests, revises). Focus encodes local structure without deleting the global map.

## Reusability

Knowledge systems, research mapping, Thinking Database, conceptual frameworks.

## Technical Approach

SVG + JavaScript. Predetermined layout (not a physics simulation). Scientific language tokens.

## Changelog

- v01 — static graph with hover neighborhood and click dossier
