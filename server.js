const dotenv = require("dotenv");
dotenv.config();
const express = require("express");
const mongoose = require("mongoose");
const app = express();

const methodOverride = require("method-override");
const morgan = require("morgan");

// DB connection code

// Mount it along with our other middleware, ABOVE the routes
app.use(express.urlencoded({ extended: false }));
app.use(methodOverride("_method")); // new
app.use(morgan("dev")); //new
app.use(express.urlencoded({ extended: false }));

// routes below

// Lets connct to MongoDB
mongoose.connect(process.env.MONGODB_URI);

//LETS  UPDATE THE TERMINAL WITH CORRECT STATUS

mongoose.connection.on("connected", () => {
    console.log(`Connected to MongoDB ${mongoose.connection.name}.`);
  });

  app.get("/", async  (req, res) => {
    // res.render("index.ejs");
  res.send("Solar System Check");
});

const Planiti = require("./models/planiti.js");

app.get("/planites", async (req, res) => {
    // const allPlanites = await Planiti.find();
    // res.render("planites/index.ejs", { fruits: allFruits });
    res.send("<h1>Welcome to Planites index page</h1><hr>");
    // console.log(allFruits);
}) 

app.post("/planites", async (req, res) => {
});

//____________________________________________//

app.listen(3000, () => {
    console.log("Express is listening on port 3000...")
})