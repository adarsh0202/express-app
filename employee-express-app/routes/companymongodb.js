var express = require('express');

var mongoose = require('mongoose');

var router = express.Router();
var dbURL="mongodb://localhost:27017/company";


//establsihe the connection

mongoose.connect(dbURL);


mongoose.connection.on('connected', function(){
    console.log("Mongoose default connection is open to ", dbURL);
});

mongoose.connection.on('error', function(err){
    console.log("Mongoose default connection has occured "+err+" error");
});

mongoose.connection.on('disconnected', function(){
    console.log("Mongoose default connection is disconnected");
});


var Schema = mongoose.Schema;

var companySchema = new Schema({
    id :{
        type: Number,
        unique : true,
        required : true
        },
        name :{
            type: String,
            unique : false,
            required : true
            },

            salary :{
                type: Number,
                unique : false,
                required : true
                },
                doj:{
                    type: Date,
                    unique : false,
                    required : false
                    },
                    mobile:{
                        type:Number,
                        unique:false,
                        required:true
                        },
                        pan:{
                            type:String,
                            unique:false,
                            required:true
                        }


});
                

var companyModel=mongoose.model('account', companySchema);


/* GET all employee */
router.get('/employee', function(req, res, next) {

    companyModel.find({},function(err,data){
        res.json(data);
     });
   
  
});


/* GET account by id */
router.get('/employee/:id', function(req, res, next) {
    var eid=parseInt(req.params.id);

    companyModel.findOne({id:eid},function(err,data){
        res.json(data);
     });
   
});
  

/* delete account by id */
router.delete('/employee/:id', function(req, res, next) {
    var eid=parseInt(req.params.id);


    companyModel.remove({id:eid},function(err,data){
        
        if(err)
        res.send(""+err);

        companyModel.find({},function(err,data){
            res.json(data);
         }); 

     });
   
});

/* update account by id */
router.put('/employee/:id', function(req, res, next) {
    var eid=parseInt(req.params.id);

    companyModel.findOne({id:eid},function(err,data){

    
        for(prop in req.body){
          data[prop]=req.body[prop];
          }
  
    
    
         data.save(function(error){
            if(error)
            res.send(""+error);
    
            companyModel.find({},function(err,data){
                res.json(data);
             });
    
          });
    
       });
    
});



/* update account by id */
router.post('/employee', function(req, res, next) {
    var account=new companyModel(req.body);


    account.save(function(error){
      if(error)
      res.send(""+error);

      companyModel.find({},function(err,data){
          res.json(data);
       });

    });
});



module.exports = router;
