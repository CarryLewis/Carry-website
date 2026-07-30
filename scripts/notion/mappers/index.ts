import type { ContentModule } from "../mapping.config";
import type { MapContext, SyncPage } from "./common";
import { mapConcept } from "./concepts";
import { mapFocus } from "./focus";
import { mapInbox } from "./inbox";
import { mapProject } from "./projects";
import { mapQuestion } from "./questions";
import { mapRelation } from "./relations";
import { mapSignal } from "./signals";
import { mapTimeline } from "./timeline";

export type MappedRecord = {
  slug: string;
  record: Record<string, unknown>;
  warnings: string[];
};

export function mapPage(
  module: ContentModule,
  page: SyncPage,
  ctx: MapContext,
  meta: { databaseId: string; databaseTitle: string },
): MappedRecord {
  switch (module) {
    case "focus":
      return mapFocus(page, ctx);
    case "questions":
      return mapQuestion(page, ctx);
    case "projects":
      return mapProject(page, ctx);
    case "concepts":
      return mapConcept(page, ctx);
    case "signals":
      return mapSignal(page, ctx);
    case "timeline":
      return mapTimeline(page, ctx);
    case "relations":
      return mapRelation(page, ctx);
    case "notion-inbox":
    default:
      return mapInbox(page, ctx, meta);
  }
}

export type { MapContext, SyncPage };
