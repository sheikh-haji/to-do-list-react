import React from 'react';
import { FaTrash, FaTrashAlt } from 'react-icons/fa';
import LineItems from './LineItems';
const ItemList = ( {items,handleCheck,handleDelete} ) => {
  return (
     
    <ul>
        {
        Array.isArray(items)?items.map((item) =>
        (  
             <LineItems
             key={item.id}
              item={item}
             handleCheck={handleCheck}
             handleDelete={handleDelete}
             ></LineItems>
            

        )):console.log("nothing")
        }
        </ul>
       
    
  );
};

export default ItemList;
