import type { Meta, StoryObj } from '@storybook/react'

import CategoryIcon from './CategoryIcon'

const meta: Meta<typeof CategoryIcon> = {
  title: 'Category Icon',
  component: CategoryIcon
}

export default meta

type Story = StoryObj<typeof CategoryIcon>

// render: () => <ProjectExcerpt frontmatter={{ title: 'a projec title', subtitle: 'nice subtitle here', tags: ['illustration', 'prose']}} />
export const Base:Story = {
  render: () => <CategoryIcon category='design' />
}