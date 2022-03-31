const express = require("express");
const log = require("debug")("fruits:controller:fruits");
const fruit = require("../models/fruit");
const router = express.Router();

router.get("/seed", async (req, res) => {
    try {
      await fruit.deleteMany({})
      await fruit.create([
        {
          name: "grapefruit",
          colour: "pink",
          readyToEat: true,
        },
        {
          name: "grape",
          colour: "purple",
          readyToEat: false,
        },
        {
          name: "avocado",
          colour: "green",
          readyToEat: true,
        },
      ]);
      res.redirect("/fruits");
    } catch (error) {
      log(error);
    }
  });
  
  //* New Route
  router.get("/new", (req, res) => {
    res.render("new.ejs");
  });
  
  //* Index Route
  router.get("/", (req, res) => {
    fruit.find({}, (err, fruits) => {
      log("fruits: %o", fruits);
      res.render("fruits/index.ejs", { fruits });
    });
  });
  
  //* Create Route
  router.post("/", (req, res) => {
    if (req.body.readyToEat === "on") {
      req.body.readyToEat = true;
    } else {
      req.body.readyToEat = false;
    }
  
    const fruit = new fruit(req.body);
    fruit.save();
    res.redirect("/fruits");
  });
  
  //* Show Route
  router.get("/:id", (req, res) => {
    fruit.findById(req.params.id, (err, fruit) => {
      res.render("fruits/show.ejs", { fruit });
    });
  });
  
  router.delete("/:id", async (req, res) => {
      try {
          await fruit.findByIdAndDelete(req.params.id)
          res.redirect("/fruits")
      } catch (error) {
          res.send(404)
      }
  })
  
  router.get("/:id/edit", async (req, res) => {
      const fruit = await fruit.findById(req.params.id)
      res.render("fruits/edit.ejs", { fruit })
  })
  
  router.put("/:id", async (req, res) => {
      if (req.body.readyToEat === "on") {
          req.body.readyToEat = true;
        } else {
          req.body.readyToEat = false;
        }
      try {
          const fruit = await fruit.findByIdAndUpdate(req.params.id, req.body, {new : true})
          res.redirect("/fruits")
      } catch (error) {
          res.send(404)
      }
  })
  

module.exports = router;
