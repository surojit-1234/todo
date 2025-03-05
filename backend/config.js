const sql = require("mysql");

const con = sql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: "test"
})

con.connect((err)=>{
   err ? console.log("err exists.. Failed to Connect") : console.log("Connected Sucessfully");
});

module.exports=con;