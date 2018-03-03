import React from 'react'
import { shallow } from 'enzyme'
import SimpleBlog from './SimpleBlog'

describe.only('<SimpleBlog />', () => {
  it('renders content', () => {
    const blog = {
      title: 'My simple blog',
      author: 'Hulk Hogan',
      url: 'http://www.google.com',
      likes: 100
    }

    const mockHandler = jest.fn()
    const blogComponent =
      shallow(<SimpleBlog blog={blog} onClick={mockHandler} />)
    const contentDiv = blogComponent.find('.titlecontent')

    expect(contentDiv.text()).toContain(blog.title)
    expect(contentDiv.text()).toContain(blog.author)

    const likeDiv = blogComponent.find('.likecontent')
    expect(likeDiv.text()).toContain(`${blog.likes} likes`)
  })

  it('2 button clicks cause two actions', () => {
    const blog = {
      title: 'My simple blog',
      author: 'Hulk Hogan',
      url: 'http://www.google.com',
      likes: 100
    }

    const mockHandler = jest.fn()
    const blogComponent =
      shallow(<SimpleBlog blog={blog} onClick={mockHandler} />)

      const button = blogComponent.find('button')
      button.simulate('click')
      button.simulate('click')
    
      expect(mockHandler.mock.calls.length).toBe(2)
  })
})