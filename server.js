require('dotenv').config()
const log = require("debug")("fruits:server")
const express = require("express");
const morgan = require("morgan");
const session = require("express-session");
const mongoose = require('mongoose');
const fruit = require("./models/fruit");
const methodOverride = require("method-override")
const fruitsController = require("./controllers/fruits.js");
const usersController = require("./controllers/UsersController.js");

const app = express();
const PORT = process.env.PORT ?? 3000;
const mongoURI = process.env.MONGO_URI;
// const db = mongoose.connection;
mongoose.connect(mongoURI, {}, () => {
    console.log("Connected~")
})


app.use(morgan("tiny"))
app.use(morgan("tiny"));
app.use(
  session({
    secret: "iamsimon",
    //secret: process.env.SECRET, //a random string do not copy this value or your stuff will get hacked
    resave: false, // default more info: https://www.npmjs.com/package/express-session#resave
    saveUninitialized: false, // default  more info: https://www.npmjs.com/package/express-session#resave
  })
);
app.use(express.urlencoded({extended:false}));
app.use(methodOverride("_method"));
app.use("/fruits", fruitsController);
app.use("/users", usersController);

app.get("/", (req,res) => {
    res.send("hello world");
})

// app.get("/fruits/seed", async (req, res) => {
//     try {
//       await fruit.deleteMany({})
//       await fruit.create([
//         {
//           name: "grapefruit",
//           colour: "pink",
//           readyToEat: true,
//         },
//         {
//           name: "grape",
//           colour: "purple",
//           readyToEat: false,
//         },
//         {
//           name: "avocado",
//           colour: "green",
//           readyToEat: true,
//         },
//       ]);
//       res.redirect("/fruits");
//     } catch (error) {
//       console.log(error);
//     }
//   });
  

// //? New Route
// app.get("/fruits/new", (req,res) => {
//     res.render("new.ejs");
// })

// //? Create Route
// app.post("/fruits", (req,res) => {
//     if (req.body.readyToEat === "on") {
//         req.body.readyToEat = true;
//     } else {
//         req.body.readyToEat = false;
//     }

//     const save = async () => {
//         await fruit.create(req.body)
//     }
//     save();

//     // const fruit = new fruit(req.body)
//     // fruit.save();
//     // res.redirect("/fruits")

//     res.send(req.body);
// })

// //* Index Route
// app.get("/fruits", (req, res) => {
//     fruit.find({}, (err, fruit) => {
//         log("fruits: %o", fruit)
//         res.render("fruits/index.ejs", { fruit })
//     });
// });

// //* Show Route
// app.get("/fruits/:id", (req, res) => {
//     fruit.findById(req.params.id, (err,fruit) => {
//     res.render("fruits/show.ejs", {fruit});
//     })
//     });

// //* Delete Route
// app.delete("/fruits/:id", async (req, res) => {
//     try {
//         await fruit.findByIdAndDelete(req.params.id)
//         res.redirect("/fruits")
//     } catch (error) {
//         res.send(501)
//     }
// })

// //* Edit Route
//     // app.get("/fruits/:id/edit", async (req, res) => {
//     //     try {
//     //         const fruit = await fruit.findById(req.params.id)
//     //         res.redirect("/fruits/edit.ejs", {fruit})
//     //     } catch (error) {
//     //         res.send(501)
//     //     }
//     // })
//     app.get("/fruits/:id/edit", async (req, res) => {
//         const editFruit = await fruit.findById(req.params.id)
//         res.render("fruits/edit.ejs", { editFruit })
//     })

//     app.put("/fruits/:id", async (req, res) => {
//         try {
//             const fruit = await fruit.findByIdAndUpdate(req.params.id, req.body)
//             res.redirect("/fruits")
//         } catch (error) {
//             res.send(404)
//         }
//     })
    


app.listen(PORT, ()=> {
    console.log("I am listening")
})