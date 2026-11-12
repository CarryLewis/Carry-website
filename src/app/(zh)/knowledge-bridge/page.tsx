import BridgePage from "@/components/bridge/BridgePage";
import { bridgeCopy, bridgePath } from "@/data/knowledge-bridge";
import { pageMetadata } from "@/i18n";
export const metadata = pageMetadata("zh", bridgePath, "个人知识桥 · 工作流与工作哲学", bridgeCopy.zh.summary);
export default function Page() { return <BridgePage locale="zh" />; }
