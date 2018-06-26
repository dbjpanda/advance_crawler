const express = require('express');
const bodyParser = require('body-parser');
const static = require('./routes/static.route');
const app = express();
const port = process.env.PORT || 9000;

app.use(bodyParser.json({limit: '50mb'})); // support json encoded bodies
app.use(bodyParser.urlencoded({ extended: true, limit: '50mb' })); // support encoded bodies

app.get('/', (req, res) => {
  res.send("Node Server for Affiliates Connect Module");
})

app.post('/get-static', static);

app.listen(port);
console.log("Server started at port " + port);
