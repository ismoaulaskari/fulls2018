import React from 'react'
import { shallow,mount } from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'
//import Note from './Note'
import Togglable from './Togglable'

describe.skip('<Togglable />', () => {
  let togglableComponent

  beforeEach(() => {
    togglableComponent = mount(
      <Togglable buttonLabel="show..." cancelLabel="hide..." initial="true">
        <div className="testDiv" />
      </Togglable>
    )
    console.log(togglableComponent.debug())
  })

  it('renders its children', () => {
    expect(togglableComponent.contains(<div class="testDiv" />)).toEqual(true)
  })

  it('at start the children are not displayed', () => {
    const div = togglableComponent.find('.togglableContent')
    expect(div.getElement().props.style).toEqual({ display: 'none' })
  })

  it('after clicking the button, children are displayed', () => {
    const button = togglableComponent.find('button')

    button.at(0).simulate('click')
    const div = togglableComponent.find('.togglableContent')
    expect(div.getElement().props.style).toEqual({ display: '' })
  })

})
