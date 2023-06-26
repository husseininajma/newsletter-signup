const bodyParser = require("body-parser");
const express = require("express");
const request = require("request");
const https = require ("https");

const app = express();

app.use(express.static("public"));
app.use(bodyParser.urlencoded({extended:true}));

app.get("/", function(req, res){
  res.sendFile(__dirname + "/signup.html");
});



app.post("/", function(req, res){

  const firstName=req.body.firstName;
  const lastName=req.body.lastName;
  const email=req.body.email;

  //console.log(firstName +", "+lastName+", "+email);

  const data={
    members: [
      {
        mail_address: email,
        status: "subscribed",
        merge_fields:{
          FNAME: firstName,
          LNAME: lastName
        }

      }
    ]
  };

  const jsonData = JSON.stringify(data);
  const url = "https://us9.api.mailchimp.com/3.0/lists/a499a50fe5";

  const options = {
    method: "POST",
    auth: "najma_1:f01192d85e19cff52fa3320023b2701-us9"
  }

  const request = https.request(url, options, function(response){

    if(response.statusCode === 200){
      res.sendFile(__dirname+"/success.html");
    }else{
      res.sendFile(__dirname+"/failure.html");
    }

    response.on("data", function(data){
      console.log(JSON.parse(data));
    })
  })

  request.write(jsonData);
  request.end();

});

app.get("/failure", function(req, res){
  res.redirect("/");
})

//A...ys
//8f01192d85e19cff52fa3320023b2701-us9

//l..t web: 
// a499a50fe5

app.listen(process.env.PORT || 3000, function(req, res){
  console.log("Server is listening on port 3000");
});
