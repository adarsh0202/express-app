var express = require('express');
var router = express.Router();


var employee=[
    {id:101,name:'Adarsh Kotian',salary:4185544.43333,doj:new Date(),mobile:9658741236,pan:'DAGFIUYDG5'},
    {id:102,name:'Harsh Kothari',salary:4241544.43333,doj:new Date(),mobile:9658741237,pan:'DAGFIUYDD5'},
    {id:103,name:'Sumer Patel',salary:4866596.43333,doj:new Date(),mobile:9658741238,pan:'DAGFIUDFG5'},
    {id:104,name:'Abhijit Kushwaha',salary:4668644.43333,doj:new Date(),mobile:9658741239,pan:'DAGFIERDG5'},
    {id:105,name:'Mansi Agarwal',salary:6566544.43333,doj:new Date(),mobile:9658741230,pan:'DAGFIWYDG5'},
];


/* GET all employee */
router.get('/employee', function(req, res, next) {
  res.json(employee);
});


/* GET emp by id */
router.get('/employee/:id', function(req, res, next) {
    var id=parseInt(req.params.id);
    var emp=employee.filter((emp)=>emp.id==id)[0];
   res.json(emp);
});
  

/* delete emp by id */
router.delete('/employee/:id', function(req, res, next) {
    var id=parseInt(req.params.id);
    employee=employee.filter((emp)=>emp.id!=id);
    res.json(employee);
});

/* update emp by id */
router.put('/employee/:id', function(req, res, next) {
    var id=parseInt(req.params.id);

    var name=req.body.name;
    var salary=parseFloat(req.body.salary);
    var doj=req.body.doj;
    var mobile=req.body.mobile;      
    var pan=req.body.pan;

    employee.forEach((emp,index)=>{
      if(emp.id==id)
       {
        employee[index].name=name;
        employee[index].salary=salary;
        employee[index].doj=doj;
        employee[index].mobile=mobile;
        employee[index].pan=pan;
       }

    });
  

    res.json(employee);
});



/* update emp by id */
router.post('/employee', function(req, res, next) {
    var emp=req.body;

    console.log("Emp :",emp)

    employee.push(emp);
    
    res.json(employee);
});



module.exports = router;
