import React from 'react'
import { concat, generatePath, getProjectPath, getQueryParams, slugify } from './helpers'

describe('the concat helper function', () => {
  const classVar1 = 'variable-class-1'
  const classVar2 = 'variable-class-2'
  const classArr = `${classVar1} ${classVar2}`

  it('should be one string', () => {
    expect(concat("variable-class-1", classVar2))
      .toBe(classArr);
  })

  it('should handle ternary operations', () => {
    expect(concat(classVar1, false ? classVar2 : ''))
      .toBe(classVar1)
  })
})

describe('the slugify helper function', () => {
  it('should replace invalid characters', () => {
    expect(slugify('/*nv^1i&&d string#?param=value//'))
      .toBe('/-nv-1i&&d-string#?param=value/')
  })
})

describe('the getQueryParams helper function', () => {
  it('should concat the object into a string', () => {
    const queryParams = [
      {
        name: 'paramname',
        value: 'paramvalue'
      },
      {
        name: 'test',
        value: 'testvalue'
      }
    ]
    expect(getQueryParams(queryParams))
      .toBe('paramname=paramvalue&test=testvalue')
  })
})

// describe('the generatePath helper function', () => {
//   it('should remove invalid characters and keep valid ones', () => {
//     expect(generatePath('project', 'test-slug', {paramname: 'paramvalue'}))
//       .toBe('/project/test-slug?paramname=paramvalue')
//   })
// })

describe('the project path helper function', () => {
  it('should return a project path', () => {
    const queryParams = [
      {
        name: "paramname",
        value: "paramvalue",
      },
      {
        name: "test",
        value: "testvalue",
      },
    ]
    expect(getProjectPath("test-project", queryParams))
      .toBe("/project/test-project?paramname=paramvalue&test=testvalue")
  })
})