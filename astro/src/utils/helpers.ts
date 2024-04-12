export enum ProjectCategoryEnum {
  'art',
  'dev',
  'design',
  'storytelling',
}
export type ProjectCategory = keyof typeof ProjectCategoryEnum
