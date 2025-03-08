import React, { useEffect, useState } from 'react'
import Button from 'react-bootstrap/Button';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import axios from 'axios';

const Edit = () => {
   const navigate = useNavigate();
   const location = useLocation();
   const { id, title, description } = location.state || {};

    const[updateTodo, setUpdateTodo] = useState({ 
        title, 
        description
    });

    const handleInputChange = (e)=> {
        const{name,value} = e.target.value
        setUpdateTodo({...updateTodo, [e.target.name] : e.target.value})
    }

    const handleUpdate =(event)=> {
      event.preventDefault();

      if(updateTodo.title=='') {
        toast.warning("Title Never Be Empty!", {
          theme: "dark",
        });
      } else if(updateTodo.description=='') {
        toast.warning("Description Never Be Empty!", {
          theme: "dark",
        });
      } else {
        axios.put(`http://localhost:8080/api/task/update-task/${id}`, updateTodo)
        .then((res)=> {
          console.log(res);
          toast.success("Todo Updated Successfully", {
            theme: "dark",
          });
          setTimeout(()=> {
            navigate('/todo');
          },2000);
        })
        .catch((err)=> console.log(err))
      }
    }
   
    useEffect(()=> {
        console.log(updateTodo);
    },[updateTodo]);

  return (
    <>
      <form 
        className='todo-form form-control w-75 m-auto p-4 my-5'
        onSubmit={handleUpdate}
      >

          <h2 className='text-center my-3'>Edit Details</h2>

          <label htmlFor='title'>
            <b>Edit Title</b>
          </label>

          <input 
            type='text' 
            name="title" 
            onChange={handleInputChange}
            value={updateTodo.title}
            className="form-control mb-4 p-3" 
            placeholder='Enter Title' 
          />
        
          <label htmlFor='desc'>
            <b>Edit Description</b>
          </label>

          <input 
            type='text' 
            name="description" 
            onChange={handleInputChange}
            value={updateTodo.description}
            className="form-control mb-4 p-3" 
            placeholder='Enter Decription' 
          />
          
          <div className='d-flex justify-content-center my-3'>
            <Button type='submit' variant="success w-50 m-auto p-2">UPDATE TODO</Button> 
          </div>
      </form>
      <Link to='/todo' className='d-block text-center mt-5'>Back to Home</Link>
      <ToastContainer />
    </>
  )
}

export default Edit