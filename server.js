const express = require('express')
const app = express()
const cors = require('cors')
const mongoose=require("mongoose")
const bodyParser=require("body-parser")
require('dotenv').config()

const User=require("./model/user");


app.use(cors())
app.use(express.static(__dirname + '/public'))
app.use(bodyParser.urlencoded({ extended: false }))

const url=process.env["MONGO_URL"];
mongoose.connect(url);

const connection=mongoose.connection;

connection.on("error",()=>console.log("connection error"));
connection.once("open",()=>console.log("connection success"));

app.get('/', (req, res) => {
  res.sendFile(__dirname + '/views/index.html')
});

app.post("/api/users", async (req,res)=>{
  const username=req.body.username;
  // console.log(username);
  //first we have to look in to database that this username exist or not if exist than it should send the response that username is already taken else create new user

  if(!username){
    res.json({error:"empty username"});
  }
  else{
    let findUser = await User.findOne({username});
    if(findUser){
      res.end("username is already taken");    
    }
    else{
      findUser=new User({
        username:username
      });
      await findUser.save();
      
      res.json({
        _id:findUser._id,
        username:findUser.username
      })
    }
  }
});

//now we have to give all user's data on /api/users request
app.get('/api/users', async (req, res) => {
  try {
    let users = await User.find({});
    res.json(users);
  }
  catch (error) {
    res.json({ error });
    console.log(error);
  }
})

//now we have to get the data of exercise post request and store it to the model 
app.post("/api/users/:_id/exercises", async(req,res)=>{
  // console.log(req.body);
// let's first store the data in the some variable
const userid=req.params._id; //we are using param because we are geting it from the user
const description=req.body.description;
const duration=parseInt(req.body.duration); //coming input wil be in the string
let date = req.body.date;

//let's first check that id exist or not in our database
let findUser = await User.findById(userid);
// console.log(findUser);

//if user does not exist
if(!findUser){
  // console.log(findUser);
  res.end("unknown _id");
}
else{
  //if description & duration is not enterd by user 
  if(!description && !duration){
    res.end(`${!description ? `description` : `duration`} is required.`)
  }
  //and number also should be in the number
  else if(!Number(duration)){
    res.end("plz enter the duration in Number formate.");
  }
  //if date is not in correct formate 
  else if(date && (new Date(date).toUTCString() === "Invalid Date") ){
    res.end('invalid date');
  }
  //if all inputs are good then
  else{
    //if date is not enter then take today's date
    if(!date){
      date=new Date();
    }
    else{
      date= new Date(date);
    }
    date=date.toDateString();
    //lets make en object of the data that we can push to our model
    let exercise={description,duration,date};

    //let's update the values in our database
    await User.findByIdAndUpdate(userid,{
      $push:{log:exercise},
      $inc:{count:1},
    });
    res.json({
      _id:userid,
      username:findUser.username,
      description:description,
      duration:duration,
      date:date,
    })
  }
}

});

//giving the log of exercise with help of id given by him and with from to and limit 
app.get("/api/users/:_id/logs", async(req,res)=>{
  // console.log(req);  
  const userid=req.params._id;
  //let's find the user
  let findUser= await User.findOne({ _id: userid }, { __v: 0 });
  //if user does'nt exist 
  if(!findUser){
    res.end("unknown _id");
  }
  else{
    const {_id,count,username,log}=findUser;
    // console.log({_id,count,username,log});
    //storing log in  temp by slicing
    var templog=log.slice();
    
    // console.log(templog);

    if(req.query.from && req.query.to){
      let from = new Date(req.query.from);
      let to = new Date(req.query.to);
     
      //if invalid date then it will automaticaliy take the dates from log
      if(!(from == "Invalid Data" || to == "Invalid Data")){
        templog=log.filter((e)=>{
          var date= new Date(e.date);
          console.log(date>=from && date<=to);
          return(date <= to && date >= from);
        });
        console.log(templog);
        
        
      }
      else{
        res.end("invalid data parameters");
      }
    }
    

    
    if(req.query.limit){
      let limit= req.query.limit;
      if(Number(limit)){
        if(limit<count){
          templog.length=limit;
        }
      }else{
        res.end("invalid limit")
      }
    }
    templog=templog.map((e)=>{
      var data={
      description:e.description,
      duration:e.duration,
      date:new Date(e.date).toDateString(),
      }
      return data;
    })
    
    res.json({
      _id,
      username,
      count,
      log:templog
    })
    
  }
})


const listener = app.listen(process.env.PORT || 3000, () => {
  console.log('Your app is listening on port ' + listener.address().port)
})
