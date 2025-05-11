import React,{useState} from 'react'

import ItemList from './ItemList';
const Content = ({items,handleCheck,handleDelete}) => {
  

  return (
    // yedu kaga epadi panromnu video le pattuko
    <>
      {items.length === 0 ? (
    <p style={{ textAlign: 'center', fontStyle: 'italic' }}>The list is empty</p>
    
  ) : (
     <div>
      <ItemList
       items={items}
       handleCheck={handleCheck}
       handleDelete={handleDelete}
       ></ItemList>
       <p>{items.text}</p>
     </div>
        
     )}
    </>
  )
}

export default Content