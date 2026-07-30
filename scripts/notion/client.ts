import { Client } from "@notionhq/client";
import { requireNotionEnv } from "./env";

export function createNotionClient(token?: string): Client {
  const auth = token ?? requireNotionEnv().token;
  return new Client({ auth });
}
