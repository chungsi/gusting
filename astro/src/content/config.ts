import { defineCollection, z } from "astro:content"

const projectsCollection = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    subtitle: z.string(),
    description: z.string(),
    category: z.string(),
    tags: z.array(z.string())
  }),
})

export const collections = {
  projects: projectsCollection,
}