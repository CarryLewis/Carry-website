# Spatial Information Map — v01

## Name

Spatial Information Map

## Problem

Hierarchical menus hide neighborhood. Overview becomes a table of contents instead of a field you can stand in.

## Concept

A pan-and-zoom plane of concepts. Distance implies relatedness. Zoom is reading: labels resolve as the camera approaches.

## Interaction

Drag to pan. Wheel or buttons to zoom. Click a region to read its note. Double-click a region to frame it.

## Motion

Camera translation and scale. Labels fade in past a zoom threshold. No ornamental drift.

## Information Logic

Position = neighborhood. Scale = level of detail. Clusters are categories; nodes inside a cluster are members.

## Reusability

Knowledge observatories, system maps, exhibition plans, research landscapes.

## Technical Approach

CSS transform on a large plane + pointer events. Spatial language tokens.

## Changelog

- v01 — pan, zoom, and click-to-read on a conceptual field
