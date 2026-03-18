import { getCollection } from "astro:content";

type EntryData<T> = T extends { data: infer U } ? U : never;

const collator = new Intl.Collator("ko");

export async function getSiteConfig() {
  const configs = await getCollection("config");
  return configs[0];
}

export async function getEvents() {
  const events = await getCollection("events");
  return events.sort((a, b) => a.data.date.localeCompare(b.data.date));
}

export async function getEventBySlug(slug: string) {
  const events = await getCollection("events");
  return events.find((event) => event.data.slug === slug);
}

export async function getModules() {
  const modules = await getCollection("modules");
  return modules.sort((a, b) => a.data.order - b.data.order);
}

export async function getModulesByEventId(eventId: string) {
  const modules = await getModules();
  return modules.filter((item) => item.data.eventId === eventId);
}

export async function getModuleBySlug(slug: string) {
  const modules = await getCollection("modules");
  return modules.find((item) => item.data.slug === slug);
}

export async function getPrompts() {
  const prompts = await getCollection("prompts");
  return prompts.sort((a, b) => collator.compare(a.data.title, b.data.title));
}

export async function getResources() {
  const resources = await getCollection("resources");
  return resources.sort((a, b) => collator.compare(a.data.title, b.data.title));
}

export async function getGalleryItems() {
  const gallery = await getCollection("gallery");
  return gallery.sort((a, b) => collator.compare(a.data.title, b.data.title));
}

export function byIds<T extends { data: { id: string } }>(items: T[], ids: string[]) {
  const map = new Map(items.map((item) => [item.data.id, item]));
  return ids.map((id) => map.get(id)).filter(Boolean) as T[];
}

export function createPath(basePath: string, href: string) {
  if (!href) return basePath;
  if (/^https?:\/\//.test(href)) return href;
  const normalizedBase = basePath.endsWith("/") ? basePath.slice(0, -1) : basePath;
  const normalizedHref = href.startsWith("/") ? href : `/${href}`;
  return `${normalizedBase}${normalizedHref}`;
}

export function formatDate(dateString: string) {
  return new Intl.DateTimeFormat("ko-KR", {
    year: "numeric",
    month: "long",
    day: "numeric",
    weekday: "short",
  }).format(new Date(dateString));
}

export function toUiToken(value: string) {
  return value.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-+|-+$/g, "");
}

export const faqItems = [
  {
    question: "학교망에서 AI 도구가 열리지 않으면 어떻게 하나요?",
    answer:
      "홈과 FAQ에 기본 링크와 대체 링크를 함께 노출하고, 막히는 경우 모바일 핫스팟 또는 연수용 대체 활동으로 전환하도록 안내합니다.",
  },
  {
    question: "프롬프트 복사가 되지 않으면 어떻게 하나요?",
    answer:
      "클립보드 권한이 막힌 환경을 대비해 본문 전체 선택 버튼과 직접 복사용 textarea fallback을 제공합니다.",
  },
  {
    question: "학생 정보는 어디까지 입력해도 되나요?",
    answer:
      "이름, 번호, 연락처 등 개인정보는 입력하지 않고, 비식별화된 사례나 익명 예시만 사용하도록 안내합니다.",
  },
  {
    question: "Padlet이 막힌 경우 결과물은 어디에 공유하나요?",
    answer:
      "대체 링크, 공유 문서, 또는 로컬 저장 후 발표 방식으로 전환할 수 있도록 모듈 페이지에 안내 문구를 둡니다.",
  },
];

export const adminSections = [
  { id: "site", label: "사이트 설정" },
  { id: "events", label: "회차" },
  { id: "modules", label: "모듈" },
  { id: "prompts", label: "프롬프트" },
  { id: "resources", label: "자료" },
  { id: "gallery", label: "갤러리" },
];

export type SiteConfigEntry = Awaited<ReturnType<typeof getSiteConfig>>;
export type EventEntry = Awaited<ReturnType<typeof getEvents>>[number];
export type ModuleEntry = Awaited<ReturnType<typeof getModules>>[number];
export type PromptEntry = Awaited<ReturnType<typeof getPrompts>>[number];
export type ResourceEntry = Awaited<ReturnType<typeof getResources>>[number];
export type GalleryEntry = Awaited<ReturnType<typeof getGalleryItems>>[number];

export type SiteConfigData = EntryData<NonNullable<SiteConfigEntry>>;
export type EventData = EntryData<EventEntry>;
export type ModuleData = EntryData<ModuleEntry>;
export type PromptData = EntryData<PromptEntry>;
export type ResourceData = EntryData<ResourceEntry>;
export type GalleryData = EntryData<GalleryEntry>;
