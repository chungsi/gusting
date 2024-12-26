import { glob } from 'astro/loaders'
import { defineCollection, z } from "astro:content"

const projectsCollection = defineCollection({
  loader: glob({ pattern: '**/[^_]*.mdx', base: "./src/content/projects"}),
  schema: ({ image }) => z.object({
    title: z.string(),
    subtitle: z.string(),
    description: z.string(),
    category: z.string(),
    tags: z.array(z.string()),
    // image helper for content collections:
    // https://docs.astro.build/en/guides/images/#images-in-content-collections
    heroImage: image().optional(),
    heroImagePos: z.string().optional(),
    metaImage: image().optional(),
    // to tell the page template how to render the contents
    templateType: z.enum(['project', 'gallery'])
  }),
})

export const collections = {
  projects: projectsCollection,
}