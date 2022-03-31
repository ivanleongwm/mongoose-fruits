const express = require("express");
const User = require("../models/User");
const router = express.Router();
const bcrypt = require("bcrypt");


const saltRounds = 10;
router.get("/seed", async (req, res) => {
    try {
        await User.deleteMany({})
        await User.create([
          {
            username: "simon",
            password: bcrypt.hashSync("12345", saltRounds),
          },
          {
            username: "admin",
            password: bcrypt.hashSync("88888", saltRounds),
          },
        ]);
        res.send("Seed")
      } catch (error) {
          console.log(error);
      }
})

//* see login form
router.get("/form", (req, res) => {
    res.render("login.ejs");
});

router.get("/secret", (req, res) => {
    const user = req.session.user;

    if (user) {
    
      res.send(user)
    } else {
      res.send("no entry")
    }
})

router.get("/secret2", (req, res) => {
  const count = req.session.count;
  req.session.count = req.session.count + 1;
  res.send("count" + count)
})

//* login route
router.post("/login", async (req, res) => {
    const { username, password} = req.body;
    // const hashPassword = bcrypt.hashSync(password, saltRounds);
    const user = await User.findOne({ username });

    if (!user) {
        res.send("User not found");
    } else if (bcrypt.compareSync(password, user.password)) {
      req.session.user = user;
      req.session.count = 1;
      res.send("Ok");
    } else {
      res.send("No")
    }

  // res.send(user);
  //* success or failure
});

router.get("/logout", (req, res) => {
  req.session.destroy();
  res.send("logout")
})

module.exports = router;



// const express = require("express");
// const User = require("../models/User");
// const router = express.Router();

// router.get("/seed", (req, res) => {

// })

// //* see login form
// router.get("/form", (req, res) => {
//     res.render("login.ejs");
// });

// //* login route
// router.post("/login", (req, res) => {
//     const { username, password} = req.body;
//   res.send({ username, password});
//   //* success or failure
// });

// module.exports = router;

// const express = require("express");
// const User = require("../models/User");
// const router = express.Router();
// const bcrypt = require("bcrypt");


// const saltRounds = 10;
// router.get("/seed", async (req, res) => {
//     try {
//         await User.deleteMany({})
//         await User.create([
//           {
//             username: "simon",
//             password: bcrypt.hashSync("12345", saltRounds),
//           },
//           {
//             username: "admin",
//             password: bcrypt.hashSync("88888", saltRounds),
//           },
//         ]);
//         res.send("Seed")
//       } catch (error) {
//           console.log(error);
//       }
// })

// //* see login form
// router.get("/form", (req, res) => {
//     res.render("login.ejs");
// });

// router.get("/secret", (req, res) => {
//     const user = req.session.user;

//     if (user) {
    
//       res.send(user)
//     } else {
//       res.send("no entry")
//     }
// })

// router.get("/secret2", (req, res) => {
//   res.send("This is secret")
// })

// //* login route
// router.post("/login", async (req, res) => {
//     const { username, password} = req.body;
//     // const hashPassword = bcrypt.hashSync(password, saltRounds);
//     const user = await User.findOne({ username });

//     if (!user) {
//         res.send("User not found");
//     } else if (bcrypt.compareSync(password, user.password)) {
//       req.session.user = user;
//       res.send("Ok");
//     } else {
//       res.send("No")
//     }

//   // res.send(user);
//   //* success or failure
// });

// module.exports = router;
