// server.js
// where your node app starts

// init project
var express = require('express');
var app = express();

// enable CORS (https://en.wikipedia.org/wiki/Cross-origin_resource_sharing)
// so that your API is remotely testable by FCC 
var cors = require('cors');
app.use(cors({optionsSuccessStatus: 200}));  // some legacy browsers choke on 204

// http://expressjs.com/en/starter/static-files.html
app.use(express.static('public'));

// http://expressjs.com/en/starter/basic-routing.html
app.get("/", function (req, res) {
  res.sendFile(__dirname + '/views/index.html');
});


// your first API endpoint... 
app.get("/api", function (req, res) {
  let today=new Date()
       let todayUnix=today.getTime()
      let todayUtc=today.toUTCString()
      res.send({unix:todayUnix,
             utc:todayUtc
            })
});

app.get('/api/:date',(req,res)=>{
  //  error handling 
  if(!Date.parse(req.params.date) && !Number(req.params.date))
  {
    return res.send({error: "Invalid Date"});
  }
  // returnig when the time is uix based
  else if(!(/[-]/.test(req.params.date)) && Number(req.params.date)){
      let date=req.params.date
     var utc = new Date(Number(req.params.date));
  return  res.send({unix:Number(date),
             utc:utc.toUTCString()
            })
  }
      // returnig when the time is not  uix based
    let getDate=new  Date(req.params.date)
        res.status(200).send({
      unix:Number(getDate.getTime()),
      utc:getDate.toUTCString()} )
})


// listen for requests :)
var listener = app.listen(process.env.PORT, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});
