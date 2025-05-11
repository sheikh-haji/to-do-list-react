import './App.css';
import Footer from './Footer.js'
import Header from './Header.js'
import Content from './Content.js'
import { useEffect, useState } from 'react';
import AddItem from './AddItem';
import SearchItem from './SearchItem.js';
import apiRequest from './APIRequest.js';
function App() {
  const [items, setItem] = useState ([]);
  const API_URL="http://localhost:3000/items"
  const [newItem,setNewItem]=useState('')
  const [search,setSearch]=useState('')
  const [fetchError,setFetchError]=useState(null)
  const [isLoading,setIsLoading]=useState(true)

   useEffect (() => {
    const fetchItems = async () => {
          try {
          const response = await fetch(API_URL);
          if (!response.ok) throw Error("data not received");
          const listItems = await response.json();
          setItem(listItems);
          setFetchError(null);

          } catch (err){
          setFetchError(err.message)
          }
          finally{
            setIsLoading(false)
          }
          }
          // It defines and runs a function that waits for fetchItems() to finish, 
          // probably to get some data — but it doesn’t do anything with the result unless more code is added.
          setTimeout(()=>{
            (async() =>await fetchItems ( ) ) ( )
          },2000)
    
    }, [])
   const addItem = async (item) => {
    const id = items. length ? parseInt(items [items.length - 1 ].id)
    +1 : 1;
    const addNewItem = {id:id.toString(), text:item,checked:false}
    const listItems = [...items, addNewItem]
    setItem(listItems)
    // local browser storage le store panra mathiri
    // localStorage.setItem("todo_list", JSON.stringify(listItems))
     const postOptions={
      method:"POST",
      hearders:{
        'Content-Type':'application/json'
      },
      body:JSON.stringify(addNewItem)
     }
  
     const result=await apiRequest(API_URL,postOptions);
     if(result) setFetchError(result)

  
  }
  //  நீங்க items list-ல உள்ள ஒவ்வொரு item-ஐ check பண்ணி, அதோட id நம்ம குடுத்த id-கிட match ஆகுதா பாத்து, 
  // match ஆனா checked value-ஐ flip பண்ணுறீங்க. 
  // பிறகு அந்த new list-ஐ setItem மூலம் update பண்ணுறீங்க.
   const handleCheck= async(id) =>{
    const listItems=items.map((item)=>
      item.id===id?{...item,checked:!item.checked }
    :item );
    setItem(listItems); 
    // localStorage.setItem("todo_list",JSON.stringify(listItems))
     const myItem=listItems.filter((item)=>item.id==id);
     const updateOptions={
      method:"PATCH",
      header:{
        'Content-Type':'application/json'

      },
      body: JSON.stringify({checked:myItem[0].checked})
     }
     const reqUrl=`${API_URL}/${id}`;
     const result=await apiRequest(reqUrl,updateOptions);
     if (result) setFetchError(result);
   };
  //  items.filter() பயன்படுத்தி, நம்ம delete பண்ண வேண்டிய id-க்கு
  //  match ஆகாத items மட்டும் சேமிக்கிறீங்க. பிறகு அந்த new list-ஐ setItem 
  // மூலம் update பண்ணுறீங்க.
   const handleDelete= async(item1)=>{
    const listItems=items.filter((item)=>item.id!==item1.id);
    console.log(listItems);
    setItem(listItems); 
    // localStorage.setItem("todo_list",JSON.stringify(listItems))
    const deleteOptions={method:'DELETE'};
    const reqUrl=`${API_URL}/${item1.id}`;
    console.log(reqUrl)
    const result=await apiRequest(reqUrl,deleteOptions);
    if(result){
      setFetchError(result);
    }

  }

   const handleSubmit= (e) =>{
        e.preventDefault()
        console.log("submitted")
        if(!newItem) return;
        console.log(newItem)
        addItem(newItem)
        setNewItem('')
   }
  return (
    <div className="App">
      <Header title="To Do list"/>
      <AddItem
      newItem={newItem}
      setNewItem={setNewItem}
      handleSubmit={handleSubmit}/>
      <SearchItem
     
      search={search}
      setSearch={setSearch}
     />
     <main>
      {isLoading && <p>Loading items...</p>}
      {fetchError && <p>{`Error: ${fetchError}`}</p>}

          {!isLoading && !fetchError && <Content
              items = {items.filter(item => 
                item.text && item.text.toLowerCase().includes(search.toLowerCase())
              )}
              // items={items}
            handleCheck={handleCheck}
            handleDelete={handleDelete}/>}
      
     </main>

      <Footer length={items.length}/>
    </div>
    
  );
}


export default App;
