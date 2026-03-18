import type { ModuleEntry, PromptEntry } from "./site";

export type PromptTone = "blue" | "violet" | "teal" | "amber";

export interface PromptCuration {
  category: string;
  status?: "HOT" | "NEW" | "UPDATED";
  rating?: string;
  tone: PromptTone;
  kicker?: string;
}

export const promptCurations: Record<string, PromptCuration> = {
  "prompt-feedback-science": {
    category: "학생 피드백",
    status: "HOT",
    rating: "4.9",
    tone: "teal",
    kicker: "피드백 문장을 빠르게 정리할 때",
  },
  "prompt-lesson-starter": {
    category: "수업 설계",
    status: "NEW",
    rating: "4.8",
    tone: "blue",
    kicker: "도입 활동 아이디어가 막힐 때",
  },
  "prompt-rubric-builder": {
    category: "평가 설계",
    rating: "4.9",
    tone: "amber",
    kicker: "루브릭 초안을 빠르게 만들 때",
  },
  "prompt-vibe-coding-landing": {
    category: "카피라이팅",
    status: "UPDATED",
    rating: "4.7",
    tone: "violet",
    kicker: "안내 문구를 더 명확하게 다듬을 때",
  },
};

export const trendingPromptIds = [
  "prompt-feedback-science",
  "prompt-lesson-starter",
  "prompt-vibe-coding-landing",
];

export const featuredPromptId = "prompt-rubric-builder";

export function getPromptCuration(promptId: string): PromptCuration {
  return promptCurations[promptId] ?? {
    category: "프롬프트",
    tone: "blue",
  };
}

export function getPromptTone(prompt: PromptEntry) {
  return getPromptCuration(prompt.data.id).tone;
}

export function getPromptCategory(prompt: PromptEntry) {
  return getPromptCuration(prompt.data.id).category;
}

export function getWorkspaceStepLabel(index: number) {
  return `Step ${String(index + 1).padStart(2, "0")}`;
}

export function getWorkspaceProgress(modules: ModuleEntry[], currentSlug?: string) {
  if (modules.length === 0) {
    return { currentIndex: -1, percent: 0 };
  }

  if (!currentSlug) {
    return { currentIndex: 0, percent: 0 };
  }

  const currentIndex = modules.findIndex((item) => item.data.slug === currentSlug);
  const safeIndex = currentIndex === -1 ? 0 : currentIndex;
  const percent = Math.round(((safeIndex + 1) / modules.length) * 100);

  return { currentIndex: safeIndex, percent };
}

export function getAdjacentModules(modules: ModuleEntry[], currentSlug: string) {
  const currentIndex = modules.findIndex((item) => item.data.slug === currentSlug);
  return {
    previous: currentIndex > 0 ? modules[currentIndex - 1] : undefined,
    next: currentIndex >= 0 && currentIndex < modules.length - 1 ? modules[currentIndex + 1] : undefined,
  };
}
