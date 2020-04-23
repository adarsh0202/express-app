var express = require('express');
var mysql = require('mysql');


var router = express.Router();



//establish the connection with mysql database

var connection=mysql.createConnection({
    host:"localhost",
    port:3306,
    database:"Company",
    user:"root",
    password:"admin"
},function(err){
    if(err)
      console.log("Problem in establishing the connection with mysql");
     else
     console.log("Connectionn established with mysql");
 });



/* GET all employee */
router.get('/employee', function(req, res, next) {
    
    connection.query("SELECT * FROM EMPLOYEE",function(err,data){
     if(err)
     return res.send(""+err);
  
     res.json(data);
    });
  
});


/* GET account by id */
router.get('/employee/:id', function(req, res, next) {
    var id=parseInt(req.params.id);

    connection.query("SELECT * FROM EMPLOYEE WHERE ID=?",[id],function(err,data){
        if(err)
        return res.send(""+err);
     
        res.json(data[0]);
       });
     

});
  

/* delete account by id */
router.delete('/employee/:id', function(req, res, next) {
    var id=parseInt(req.params.id);

    connection.query("DELETE FROM EMPLOYEE WHERE ID=?",[id],function(err,data){
        if(err)
        return res.send(""+err);
     
        connection.query("SELECT * FROM EMPLOYEE",function(err,data){
            if(err)
            return res.send(""+err);
         
            res.json(data);
           });
         


       });
     
    


});

/* update account by id */
router.put('/employee/:id', function(req, res, next) {
    var id=parseInt(req.params.id);

    var name=req.body.name;
    var salary=parseFloat(req.body.salary);
    var doj=req.body.doj;
    
    
    connection.query("UPDATE EMPLOYEE SET NAME=?, SALARY=?, DOJ=?, MOBILE=?, PAN=? WHERE ID=?",[name,salary,doj,id],function(err,data){
        if(err)
        return res.send(""+err);
     
        connection.query("SELECT * FROM EMPLOYEE",function(err,data){
            if(err)
            return res.send(""+err);
         
            res.json(data);
           });
       });
    
});



/* update account by id */
router.post('/employee', function(req, res, next) {
    var account=req.body;

    connection.query("INSERT INTO EMPLOYEE SET ?",[account],function(err,data){
        if(err)
        return res.send(""+err);
     
        connection.query("SELECT * FROM EMPLOYEE",function(err,data){
            if(err)
            return res.send(""+err);
         
            res.json(data);
           });
       });
    
    
});



module.exports = router;
