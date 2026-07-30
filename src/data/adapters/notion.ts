/**
 * Runtime Notion adapter stub.
 *
 * Production path today: build-time `npm run sync:notion` writes /content JSON,
 * then LocalJsonRepository serves it. A live NotionAdapter can implement
 * ContentRepository later if the site leaves static export.
 */
import type { ContentRepository } from "@/data/repository";

export class NotionRepository implements ContentRepository {
  constructor(_token?: string) {
    void _token;
  }

  private unavailable(method: string): never {
    throw new Error(
      `NotionRepository.${method} is not implemented for static export. Run \`npm run sync:notion\` and use LocalJsonRepository.`,
    );
  }

  async getProfile() {
    return this.unavailable("getProfile");
  }
  async getSiteChrome() {
    return this.unavailable("getSiteChrome");
  }
  async getObservatoryCopy() {
    return this.unavailable("getObservatoryCopy");
  }
  async listSystemLinks() {
    return this.unavailable("listSystemLinks");
  }
  async listIntellectualFocus() {
    return this.unavailable("listIntellectualFocus");
  }
  async listActiveQuestions() {
    return this.unavailable("listActiveQuestions");
  }
  async listConcepts() {
    return this.unavailable("listConcepts");
  }
  async getConcept(_idOrSlug: string) {
    return this.unavailable("getConcept");
  }
  async listSignals(_options?: { limit?: number }) {
    return this.unavailable("listSignals");
  }
  async listProjects(_options?: { status?: import("@/domain/entities").Project["status"] }) {
    return this.unavailable("listProjects");
  }
  async getProject(_slug: string) {
    return this.unavailable("getProject");
  }
  async getRelations(_entityId?: string) {
    return this.unavailable("getRelations");
  }
  async getNeighborhood(_centerId: string) {
    return this.unavailable("getNeighborhood");
  }
}
