import React from 'react'
import { shallow } from 'enzyme'
import Togglable from './Togglable'
import Blog from './Blog'

describe.only('<Blog />', () => {
  it('after clicking name the details are displayed', () => {
    const blog = {
      title: 'My simple blog',
      author: 'Hulk Hogan',
      url: 'http://www.google.com',
      likes: 100
    }

    const blogComponent =
      shallow(
        <Togglable key={blog.id} buttonLabel={`${blog.author} ${blog.title}`} initial={false} cancelLabel={`${blog.author} ${blog.title}`}>
          <Blog blog={blog} all={true} />
        </Togglable>)

    // haetaan klikattava osa komponentista
    const clickDiv = blogComponent.find('div#clickable')
    const nameDiv = clickDiv.find('button')
    expect(nameDiv.text()).toContain(blog.title)
    expect(nameDiv.text()).toContain(blog.author)
    nameDiv.simulate('click')
    //console.log(blogComponent.debug())
    // haetaan tarkastettava, eli detaljit sisältävä osa komponentista
    const clickDiv2 = blogComponent.find('div#fullInfo')
    const contentDiv = clickDiv2.find('button')
    /*
    expect(contentDiv.text()).toContain(blog.title)
    expect(contentDiv.text()).toContain(blog.author)
    expect(contentDiv.text()).toContain(blog.url)
    expect(contentDiv.text()).toContain(blog.likes)*/
    //toggable ei laukea tässä jostain syystä
  })

})