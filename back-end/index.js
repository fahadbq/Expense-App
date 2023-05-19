const express = require("express");
const cors = require("cors");
const routes = require("./config/routes");
const passport = require("passport");
require("dotenv").config();
const session = require("express-session");
const { v4: uuidv4 } = require("uuid");
const secret = uuidv4();

const configureDB = require("./config/database");

const app = express();

const PORT = 3040;

//Initializing our google authentication file
require("./googleAuthentication");

app.use(express.json());
//Session storage
app.use(
  session({
    secret: secret,
    resave: false,
    saveUninitialized: true,
    cookie: { secure: true },
  })
);
// Method will apply for only selected url
// app.use(
//   cors({
//     origin: "http://localhost:3000",
//     methods: "GET,POST,PUT,DELETE",
//     credentials: true,
//   })
// );
app.use(cors());
app.use(express.urlencoded({ extended: false }));
app.use(express.static("uploads"));
app.use("/", routes);
app.use(passport.initialize());
app.use(passport.session());

//Databse setup
configureDB();

app.listen(PORT, () => {
  console.log("App is running on PORT", PORT);
});
