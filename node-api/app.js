let express = require('express')
let cors = require('cors')
var bodyParser = require('body-parser')
const pg = require('pg').Pool

global.pool  = new pg({
  user: 'postgres',
  host: 'localhost',
  database: 'BILLING',
  password: '12345678',
  port: 5432,
  max: 1000
})

var app = express()

//Express Settings and middleware
app.use(express.json())
app.use(cors())
app.use(bodyParser.urlencoded({ extended: false }));

//import all view routes
require("./routes/routes")(app)

//Import Api Routes And Middleware
require("./routes/apiroutes")(app)
//Run Server
var server = app.listen(8001,"0.0.0.0", function () {
   var host = server.address().address
   var port = server.address().port
   
   console.log("Example app listening at http://%s:%s", host, port)
})
