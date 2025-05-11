import React from 'react'

const Header = (title) => {
   
  return (
    
    <header style={{backgroundColor: 'mediumblue',color: 'white'}}>
        <h1>{title.title}</h1>
        </header>
  )
}
Header.defaultProp={
  title:"to do list"
}

export default Header