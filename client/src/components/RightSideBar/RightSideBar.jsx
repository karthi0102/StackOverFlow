import React from 'react'
import './RightSideBar.css'
import WidgetTags from './WidgetTags'
import Widget from './Widget'
const RightSideBar = () => {
  return (
    <aside className='right-sidebar'>
      <Widget />
      <WidgetTags />
    </aside>
  )
}

export default RightSideBar