import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom';

const View = () => {

    const{id} = useParams();
    const[singleData, setSingleData] = useState({});

    useEffect(()=> {
        const DataFetching = async()=> {
            try{
                let res = await axios.get("http://localhost:8080/api/task/get-task");
                const filteredData = (res.data.tasks.filter((data)=> data.id==id));
                console.log(filteredData[0]);
                setSingleData(filteredData[0]);
            } catch(err) {
                console.log(err,"Occured");
            }
        }
        DataFetching();
    },[]);

  return (

    <section className='m-5'>
        <h2 className='text-center text-dark' style={{textDecoration:'underline'}}>Task id: {singleData.id}</h2>
        <div className="my-4" style={{padding: '50px 20%', background: 'burlywood'}}>
            <h1>Title: {singleData.title} </h1>
            <p><b>Description: </b>{singleData.description} </p>
            <p><b>Dated on: </b> {singleData.createdAt?.slice(0,10).split('').join('')} </p>
            <Link to='/'> Back to Home </Link>
        </div>
    </section>

  )
}

export default View;