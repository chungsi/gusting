import React from 'react'
import renderer from 'react-test-renderer'
import { render } from '@testing-library/react'

import ProjectHeader from '../ProjectHeader'

// Using react's testing thing
describe('ProjectHeader', () => {
  it('renders correctly', () => {
    const tree = renderer
      .create(<ProjectHeader frontmatter={{
        title: 'Project Header',
        subtitle: 'test project header',
        category: 'art',
        tags: ['one', 'two', 'three'],
      }} />)
      .toJSON()
    expect(tree).toMatchSnapshot()
  })
})

// Using the other library for testing components
// const TestProjectHeader = () => <ProjectHeader
//   frontmatter={{
//     title: 'Project Header',
//     subtitle: 'test project header',
//     category: 'art',
//     tags: ['one', 'two', 'three'],
//   }}
//   data-testid="project-header"
// />

// test("Display correct project header", () => {
//   const { getByTestId } = render(<TestProjectHeader />)
//   // Assertion
//   expect(getByTestId('project-header')).toHaveTextContent('Project Header')
// })