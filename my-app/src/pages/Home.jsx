import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Button from 'react-bootstrap/Button';

const Home = () => {

  const[todo, setTodo] = useState({
    title: '',
    desc: ''

  })

  function handleInputChange(e){
      
  }

  return (
    <div>
     <h1 className='text-center mb-5'>Todo List</h1>
     <form className='todo-form form-control w-75 m-auto p-4'>

        <h2 className='text-center my-3'>Enter Todo Details</h2>

        <label htmlFor='title'>
          <b>Title</b>
        </label>
        <input 
          type='text' 
          name="title" 
          onChange={handleInputChange}
          value={todo.title}
          className="form-control mb-4 p-3" 
          placeholder='Enter Title' 
        />
        
        <label htmlFor='desc'>
          <b>Description</b>
        </label>
        <input 
          type='text' 
          name="desc" 
          onChange={handleInputChange}
          value={todo.desc}
          className="form-control mb-4 p-3" 
          placeholder='Enter Decription' 
        />
        
        <div className='d-flex justify-content-center my-3'>
          <Button variant="success w-50 m-auto p-2">CREATE TODO</Button> 
        </div>
     </form>
    </div>
  )
}

export default Home