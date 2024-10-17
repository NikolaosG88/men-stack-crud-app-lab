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
    res.render("home.ejs");
//   res.send("Solar System Check");
});

const Planet = require("./models/planet.js");

app.get("/planets", async (req, res) => {
    const allPlanets = await Planet.find();
    res.render("planets/index.ejs", { planets: allPlanets });
    // res.send("<h1>Welcome to Planets index page</h1><hr>");
}) 

app.post("/planets", async (req, res) => {
    if (req.body.spin ==="on") {
        req.body.spin = true;
    } else {
        req.body.spin = false;
    }

    await Planet.create(req.body);
    res.redirect("/planets");
});

app.get("/planets/new", (req,res) => {
    res.render("planets/new.ejs");
});

app.get("/planets/:planetId", async (req, res) => {
    const foundPlanet = await Planet.findById(req.params.planetId);
    res.render("planets/show.ejs", { planet: foundPlanet });
});

app.delete("/planets/:planetId", async (req, res) => {
    await Planet.findByIdAndDelete(req.params.planetId);
    res.redirect("/planets");
});

app.get("/planets/:planetId/edit", async (req, res) => {
    const foundPlanet = await Planet.findById(req.params.planetId);
    res.render("planets/edit.ejs", {
        planet: foundPlanet,
      });
  });

  app.put("/planets/:planetId", async (req, res) => {
    // Handle the "spin" checkbox data
    if (req.body.spin === "on") {
      req.body.spin = true;
    } else {
      req.body.spin = false;
    }
    
    // Update the planet in the database
    await Planet.findByIdAndUpdate(req.params.planetId, req.body);
  
    // Redirect to the planets show page to see the updates
    res.redirect(`/planets/${req.params.planetId}`);
  });


//____________________________________________//

app.listen(3000, () => {
    console.log("Express is listening on port 3000...")
})