# Infinite Canvas — v01

## Name

Infinite Canvas

## Problem

Page scroll forces a single reading order onto material that is spatial and clustered. Notes that belong beside each other are stacked instead.

## Concept

An unbounded plane of notes and small diagrams. Clusters emerge as you pan. There is no page end.

## Interaction

Drag to pan. Click a note to read it and drift the camera toward its cluster. No zoom in v01 (see Spatial Map).

## Motion

Inertial pan after release. Focus is a gentle camera ease, not a jump cut.

## Information Logic

Proximity = relatedness. Clusters are topics. The canvas encodes a board, not a chapter.

## Reusability

Research boards, digital notebooks, exhibition backrooms, working walls.

## Technical Approach

Overflow-hidden viewport + CSS transform + pointer inertia. Notebook language tokens.

## Changelog

- v01 — unbounded pan with clustered notes and inertial travel
