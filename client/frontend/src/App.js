import {useEffect, useState} from 'react'
import axios from 'axios'
import {MdDelete} from 'react-icons/md'
import {BiSolidEdit} from 'react-icons/bi'
import './App.css';

function App() {
  const [itemText, setItemText] = useState('');
  const [listItems,setListItems]= useState([]);
  const [isUpdating, setIsUpdating] = useState('')
  const [updateItemText, setUpdateItemText] = useState('');
  //adding new todo item to database
  const addItem = async(e)=>{
    e.preventDefault()
    try{
      const res = await axios.post('http://localhost:5000/api/item', {item:itemText});
      console.log(res);
      setListItems(prev => [...prev,res.data]);
      setItemText('');
    }catch(err){
      console.log(err);
    }
  }
  //to fetch all todos from database -- using useEffect hook
   useEffect(()=>{
    const getItemsList = async()=> {
      try{
        const res = await axios.get('http://localhost:5000/api/items')
        setListItems(res.data);
        console.log('render')
      }catch(err){
        console.log(err)
      }
    }
    getItemsList()
   }, []);

   //Delete item 
   const deleteItem = async(id)=>{
    try{
      const res = await axios.delete(`http://localhost:5000/api/item/${id}`)
      console.log(res.data);
      const newListItems = listItems.filter(item=>item._id !== id);
      setListItems(newListItems)
    }catch(err){
      console.log(err)
    }
   }
   //Update item
const updateItem = async(e)=>{
  try{
    const res = await axios.put(`http://localhost:5000/api/item/${isUpdating}`, {item: updateItemText})
    
    const updatedItemIndex = listItems.findIndex(item => item._id === isUpdating);
    const updatedItem = listItems[updatedItemIndex].item = updateItemText;
    setUpdateItemText('');
    setIsUpdating('');
    console.log(res.data)
  }catch(err){
    console.log(err)
  }
}

   //before updating we need to show a new input field with update button
   const renderUpdateForm = ()=> (
    <form className='update-form' onSubmit={(e)=>{updateItem(e)}}>
      <input className='update-new-input' 
      type="text" 
      placeholder="New Item" 
      onChange={e=>{setUpdateItemText(e.target.value)}} 
      value={updateItemText} />
      <button className='update-new-btn' 
      type="submit">Update</button>
    </form>
   )

  return (
    <div className="App">
      <h1>Todo App</h1>
      <form className="form" onSubmit={e=>addItem(e)}>
        <input type="text" 
        placeholder="Enter your Task" 
        onChange={e => {setItemText(e.target.value)}}
        value={itemText}/>
        <button type="submit">Add</button>
      </form>
      <div className="todo-listItems">
        {
          listItems.map(item=> (
            <div className="todo-item">
              {
                isUpdating === item._id ? renderUpdateForm()
                : <>
                  <p className="item-content">{item.item}</p>
                  <button className="update-item" onClick={()=>{setIsUpdating(item._id)}}><BiSolidEdit/></button>
                  <button className="delete-item" onClick={()=>{deleteItem(item._id)}}><MdDelete/></button>
                </>
              }
          
        </div>
          ))
        }

        
      </div>
    </div>
  );
}

export default App;
