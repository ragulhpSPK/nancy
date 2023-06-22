// index.js
const express = require("express");
const mongoose = require("mongoose");
const app = express();
const PORT = 4000;
const bodyParser = require("body-parser");

app.use(express.json());

app.use(bodyParser.json());
app.use(bodyParser.urlencoded());

app.get("/", (req, res) => {
  res.send("Hey this is my API running 🥳");
});

// app.get("/", async (req, res) => {
//   try {
//     const result = await productSchema.find();
//     console.log(result);
//     res.send(result);
//   } catch (e) {
//     console.log(e);
//   }
// });

// // Export the Express API

const userSchema = mongoose.model(
  "user",
  new mongoose.Schema(
    {
      name: String,
      age: Number,
      day: Array,
      moredetails: [
        {
          address: String,
          street: String,
        },
      ],
    },
    { collection: "user" }
  )
);
const productSchema = mongoose.model(
  "product",
  new mongoose.Schema(
    {
      name: String,
      userId: {
        type: mongoose.Schema.ObjectId,
        ref: "user",
      },
    },
    { collection: "product" }
  )
);
mongoose.connect("mongodb://127.0.0.1:27017/apps").then(() => {
  app.listen(PORT || 8080, (err) => {
    if (!err) {
      console.log("server started at 8080");
    }
  });
});

//  {
//       age: { $gte: 24, $lte: 70 },
//     }
// app.get("/", async (req, res) => {
//   try {
//     const result = await productSchema
//       .find()
//       .select({ name: 0 })
//       .populate("userId", { {moredetails: 0 } });

//     return res.status(200).send({ data: result });
//   } catch (err) {
//     console.log(err);
//   }
// });

// app.get("/", async (req, res) => {
//   try {
//     const result = await productSchema
//       .find({ $neq: { _id: "648d9ad19c9515755a372b20" } })
//       .populate("userId");
//     return res.status(200).send({ data: result });
//   } catch (err) {
//     console.log(err);
//   }
// });

// app.get("/:name", async (req, res) => {
//   try {
//     let where =
//       req.params.name === "dashboard" ? { moredetails: 0 } : { moredetails: 1 };

//     const result = await productSchema
//       .find()
//       .select({ name: 0 })
//       .populate("userId", where);

//     return res.status(200).send({ data: result });
//   } catch (err) {
//     console.log(err);
//   }
// });

// app.get("/sort", async (req, res) => {
//   try {
//     const result = await userSchema.find().sort("age");

//     return res.status(200).send({ data: result });
//   } catch (err) {
//     console.log(err);
//   }
// });

// app.post("/:sort", async (req, res) => {
//   try {
//     const { sort } = req.body;
//     const age = sort === "low" ? "age" : "-age";
//     const result = await userSchema.find().sort(age);
//     return res.status(200).send({ data: result });
//   } catch (err) {
//     console.log(err);
//   }
// });

// app.get("/limit", async (req, res) => {
//   try {
//     const result = await userSchema.find().limit(3);

//     return res.status(200).send({ data: result });
//   } catch (err) {
//     console.log(err);
//   }
// });

// app.post("/searchFilter", async (req, res) => {
//   try {
//     const result = await userSchema.findOne({ age: req.body.age });
//     res.send(result);
//   } catch (e) {
//     console.log(e);
//   }
// });

// app.post("/", async (req, res) => {
//   try {
//     const user = new userSchema({
//       name: "saniya",
//       age: 24,
//       day: [1, 2, 3],
//       moredetails: { address: "karur", street: "saniya" },
//     });
//     await user.save();
//     const product = new productSchema({
//       name: "parota",
//       userId: "648d9ad19c9515755a372b20",
//     });
//     await product.save();
//     return res.status(200).send({ data: user });
//   } catch (err) {
//     console.log(err);
//   }
// });

// app.post("/products", async (req, res) => {
//   try {
//     const { name } = req.body;
//     const result = await new productSchema({ name });
//     const data = result.save();
//     res.send({ message: result });
//   } catch (err) {
//     console.log(err);
//   }
// });

// app.get("/:id", async (req, res) => {
//   try {
//     const { id } = req.params;
//     const result = await productSchema.findById({ _id: id });
//     res.send(result);
//   } catch (err) {
//     console.log(err);
//   }
// });

app.put("/update", async (req, res) => {
  try {
    const result = await userSchema.findByIdAndUpdate(
      {
        _id: "648d98fc3bd30b99ca6fa8a2",
      },
      { $pull: { moredetails: {} } }
    );
    return res.status(200).send({ data: "user" });
  } catch (err) {
    console.log(err);
  }
});

module.exports = app;
