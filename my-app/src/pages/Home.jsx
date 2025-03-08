import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { ToastContainer, toast } from 'react-toastify';

import { Link, useNavigate, useSearchParams } from 'react-router-dom';

const Home = () => {
  const[cardId, setCardId] = useState(null);
  const navigate = useNavigate();
  const[todos, setTodos] = useState([]);
  const[todo, setTodo] = useState({
    title: '',
    desc: ''
  });

  //const[userRole, setUserRole] = useState();
  const[userParams,setUserParams] = useSearchParams();
  // const[userRole, setUserRole] = useState();
//localStorage.setItem("role_id",userParams.get("role-id"));

//let userRole = localStorage.getItem('role_id')

if(userParams.get("role-id"))
localStorage.setItem("role_id", userParams.get("role-id"))
let userRole = localStorage.getItem('role_id');
console.log(userRole);

  // useEffect(()=> {
  //    setUserRole(userParams.get("role-id"));
  //    console.log(userRole);
  // },[userRole]);

  

  console.log(userRole)

  const[status, setStatus] = useState(true);
  //const [cardStatuses, setCardStatuses] = useState({});

  function handleInputChange(e) {
    setTodo({...todo, [e.target.name] : e.target.value});
  }

  useEffect(()=> {
      console.log(todo);
  },[todo]);

  useEffect(()=> {
     console.log(cardId)
  },[cardId])

  // function handleSubmit(event) {

  //   event.preventDefault();
  //   console.log(todo);
  //   if(todo.title==='') {

  //     toast.error("Enter Todo Title", {
  //       theme: "colored",
  //     });

  //   } else if(todo.desc=='') {

  //     toast.error("Enter Todo Description", {
  //       theme: "colored",
  //     });

  //   } else {

  //     setTodos((prevTodos) => [...prevTodos, todo]);
  //     setTodo({
  //       title: '',
  //       desc: ''
  //     });
  //     toast.success("Todo Created Successfully", {
  //       theme: "colored",
  //     });

  //   }
 
  // }

  useEffect(()=>{
    axios.get("http://localhost:8080/api/task/get-task")
    .then((res)=> {
      console.log(res.data.tasks);
      setTodos(res.data.tasks);
    })
    .catch((err)=> { console.log(err) });
  },[]);




  const handleSubmit = (event) => {
    event.preventDefault(); 

    // setCardId(id);

    let postTodo = {
      title: todo.title,
      description: todo.desc,
      user_id: Date.now().toString() 
    }

    if(postTodo.title == '') {
      toast.error("Enter Todo Title", {
        theme: "colored",
      });
    } else if(postTodo.description == '') {
      toast.error("Enter Todo Description", {
        theme: "colored",
      });
    } else {

      //_____START OF POST METHOD________//
      axios.post("http://localhost:8080/api/task/create-task",postTodo)
      .then((res)=> {
        console.log(res);
         //________Then we need to get(show)________//
        axios.get("http://localhost:8080/api/task/get-task")
        .then((res)=> {
          console.log(res.data.tasks);
          setTodos(res.data.tasks);

          const statuses = {};
          res.data.tasks.forEach((task) => {
            statuses[task.id] = 'active';
          });
          setCardStatuses(statuses);

          toast.success("Todo Created Successfully", {
              theme: "colored",
          });
         
        })
        .catch((err)=> { console.log(err) });

        setTodo({
          title: '',
          desc: ''
        })

      })

      .catch(err => console.log(err));

      //_____END OF POST METHOD________//
    }
    
  }
 


  return (
    <div>
     <form 
      className='todo-form form-control w-75 m-auto p-4 my-5'
      onSubmit={handleSubmit}

      >

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
            <Button type='submit' variant="success w-50 m-auto p-2">CREATE TODO</Button>
        </div>
        
     </form>

      <h1 className='text-center mt-5 my-2' style={{textDecoration:'underline'}}>My Todo List</h1>

      <Container fluid>
      <Row className='todo-container gap-3 row d-flex align-items-start justify-content-center'>
        {
          todos?.map((todo, index)=> {
            const{id, title, description, createdAt} = todo;
            return (
              <Col xl={3} lg={4} key={id} className='todo gap-2 p-3'>

                <h2>{title}</h2>
                <p>{description}</p>
                <p>Created On: { createdAt.slice(0,10).split('').join('') }</p>
                <p><b>Status: {cardId == id? 'completed' : 'active' } </b></p>

                <div className='btn-wrap d-flex justify-content-center gap-1 mx-3'>
                
                  <Button variant='dark' onClick={()=> { navigate(`/view/${id}`) } }>View</Button>
                  
                    
                  <Button variant="success" onClick={()=> { 
                    // var card_idd = id;
                    // console.log(card_idd,id)

                    (userRole==3) ?
                    toast.error("You are not authorized!", {
                      theme: "colored",
                    })
                    :
                    navigate('/edit', { state: { id, title, description } })
                    
                    

                  }}>Edit</Button>
                    
                    
                  
                    {/* (cardId==id && userRole==2 || cardId==id && userRole==3) ? 

                      toast.error("You are not authorized!", {
                        theme: "colored",
                      }) */}


                  <Button variant="danger" onClick={()=> {
                   
                    let card_id = id;
                    console.log(`delete-card: `,card_id, id);

                    (card_id==id && userRole==2 || card_id==id && userRole==3) ?

                    toast.error("You are not authorized!", {
                        theme: "colored",
                    })
                    :  
                    axios.delete(`http://localhost:8080/api/task/delete-task/${id}`)
                      .then((res)=> {
                        toast.success("Todo Deleted Successfully", {
                          theme: "dark",
                        })
                        setTimeout(()=> {
                          window.location.reload();
                          navigate('/todo');
                        },2000)
                      })
                    .catch((err)=> console.log('error occured'));
                  }}>Delete</Button>

                  

                  <Button variant="warning" 
                    onClick={(id)=> {
                      setStatus(false);
                      setCardId(id);
                      // setCardStatuses((prevStatuses) => ({
                      //   ...prevStatuses,
                      //   [id]: 'completed'
                      // }));
                  }}>Complete</Button>
                    
                </div>
              </Col>
            )
          })
        }
      </Row>
     </Container> 
     <ToastContainer />
    </div>
  )
}

export default Home;