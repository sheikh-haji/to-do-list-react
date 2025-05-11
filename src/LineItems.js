import React from 'react';
import { FaTrash, FaTrashAlt } from 'react-icons/fa';
const LineItems = ({item,handleCheck,handleDelete}) => {
  return (
    <li className="item" key={item.id}>
              <input type="checkbox" checked={item.checked}
              onChange={()=>handleCheck(item.id)} ></input>
              <label style={{ textDecoration: item.checked ? 'line-through' : 'none' }}>{item.text}</label>
              
              <FaTrashAlt
              role="button"
              tabIndex="0 " 
              onClick={()=>handleDelete(item)}></FaTrashAlt>
              </li>
  );
};

export default LineItems;
