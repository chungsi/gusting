// Logo.stories.ts|tsx
import * as React from 'react'
import type { Meta, StoryObj } from '@storybook/react'

import Logo from './Logo'

const meta: Meta<typeof Logo> = {
  /* 👇 The title prop is optional.
   * See https://storybook.js.org/docs/react/configure/overview#configure-story-loading
   * to learn how to generate automatic titles
   */
  title: 'Logo',
  component: Logo,
}

export default meta

type Story = StoryObj<typeof Logo>

/*
 *👇 Render functions are a framework specific feature to allow you control on how the component renders.
 * See https://storybook.js.org/docs/react/api/csf
 * to learn how to use render functions.
 */
export const Primary: Story = {
  name: 'The owl logo',
  render: () => <Logo className='w-20' />,
}
