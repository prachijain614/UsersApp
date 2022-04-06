var express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const mongoose = require("mongoose");

const CONNECTION_URL =
  "mongodb+srv://prachi:prachi@123@todo.hebyl.mongodb.net/test";

var app = express();
app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

mongoose
  .connect(CONNECTION_URL, { useNewUrlParser: true, useUnifiedTopology: true })
  .then((error, data) => {
    /** establishing the conncetion between the API and DB */
    console.log("Connected to MongoDB");

    /** setting the server on defined port as 3001 */
    server = app.listen(3001, () => {
      console.log(`Listening to port 3001`);
    });

    require("./model/index");
    app.use(require("./api/index"));
  });

//
