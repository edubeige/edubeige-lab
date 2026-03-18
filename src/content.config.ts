import { defineCollection, z } from "astro:content";

const siteConfig = defineCollection({
  type: "data",
  schema: z.object({
    siteTitle: z.string(),
    siteSubtitle: z.string(),
    siteBasePath: z.string(),
    featuredEventSlug: z.string(),
    contactEmail: z.string(),
    footerLinks: z.array(
      z.object({
        label: z.string(),
        href: z.string(),
      }),
    ),
    theme: z.object({
      accent: z.string(),
      rounded: z.string(),
    }),
  }),
});

const events = defineCollection({
  type: "data",
  schema: z.object({
    id: z.string(),
    slug: z.string(),
    title: z.string(),
    date: z.string(),
    venue: z.string(),
    speaker: z.string(),
    heroSummary: z.string(),
    quickLinks: z.array(
      z.object({
        label: z.string(),
        url: z.string(),
      }),
    ),
    notices: z.array(z.string()),
    toolLinks: z.array(
      z.object({
        label: z.string(),
        url: z.string(),
      }),
    ),
    scheduleItems: z.array(z.string()),
    resourceIds: z.array(z.string()),
    galleryIds: z.array(z.string()),
  }),
});

const modules = defineCollection({
  type: "data",
  schema: z.object({
    id: z.string(),
    slug: z.string(),
    eventId: z.string(),
    order: z.number(),
    title: z.string(),
    summary: z.string(),
    learningGoals: z.array(z.string()),
    startTime: z.string(),
    endTime: z.string(),
    tags: z.array(z.string()),
    checklist: z.array(z.string()),
    steps: z.array(
      z.object({
        title: z.string(),
        body: z.string(),
      }),
    ),
    promptIds: z.array(z.string()),
    resourceIds: z.array(z.string()),
    shareLinks: z.array(
      z.object({
        label: z.string(),
        url: z.string(),
      }),
    ),
  }),
});

const prompts = defineCollection({
  type: "content",
  schema: z.object({
    id: z.string(),
    title: z.string(),
    tool: z.string(),
    subjects: z.array(z.string()),
    purposes: z.array(z.string()),
    trainingTypes: z.array(z.string()),
    difficulty: z.enum(["basic", "intermediate", "advanced"]),
    summary: z.string(),
    template: z.string(),
    variables: z.array(z.string()),
    notes: z.string(),
    relatedIds: z.array(z.string()),
  }),
});

const resources = defineCollection({
  type: "data",
  schema: z.object({
    id: z.string(),
    title: z.string(),
    type: z.string(),
    scope: z.enum(["event", "evergreen"]),
    eventId: z.string().optional(),
    moduleId: z.string().optional(),
    description: z.string(),
    url: z.string(),
    downloadLabel: z.string(),
  }),
});

const gallery = defineCollection({
  type: "data",
  schema: z.object({
    id: z.string(),
    title: z.string(),
    tool: z.string(),
    subjects: z.array(z.string()),
    purposes: z.array(z.string()),
    thumbnail: z.string(),
    summary: z.string(),
    detail: z.string(),
  }),
});

export const collections = {
  config: siteConfig,
  events,
  modules,
  prompts,
  resources,
  gallery,
};
