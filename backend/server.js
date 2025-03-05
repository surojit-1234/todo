const express = require('express');
require('dotenv').config();
const app = express();
const port = process.env.PORT || 5000; 
var bodyParser = require('body-parser');
const cors = require('cors');
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

const con = require('./config');

app.use(cors());

app.get("/todo",(req,res)=> {
    con.query('select * from todo',(err,result)=> {
       res.send(!err ? result : err);
    });
});

app.get("/",(req,res)=> {
    res.status(200).json({
        "id": "1",
        "name": "surojit",
        "address": "Kolkata"
    });
});

app.post("/about",(req,res)=> {
    res.status(201).json({
        student: [
            {
                "id": "2",
                "name": "Susmita",
                "address": "Delhi"
            },
            {
                "id":"3",
                "name":"Dilip",
                "address":"Kolkata"
            }
        ],
        teacher: [
            {
                "id": "1",
                "name": "Amitav Roy",
                "address": "Mumbai"
            },
            {
                "id":"2",
                "name":"Aneek Dhar",
                "address":"Bengalore"
            }
        ]
   })
})

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});