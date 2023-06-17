const express = require("express");
const mongoose = require("mongoose");
const app = express();
app.get("/", (req, res) => {
  res.send("ehlrjgi");
});
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
  app.listen(8080, (err) => {
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

app.get("/:name", async (req, res) => {
  try {
    let where =
      req.params.name === "dashboard" ? { moredetails: 0 } : { moredetails: 1 };

    const result = await productSchema
      .find()
      .select({ name: 0 })
      .populate("userId", where);

    return res.status(200).send({ data: result });
  } catch (err) {
    console.log(err);
  }
});

app.post("/", async (req, res) => {
  try {
    const user = new userSchema({
      name: "saniya",
      age: 24,
      day: [1, 2, 3],
      oredetails: { address: "karur", street: "saniya" },
    });
    await user.save();
    const product = new productSchema({
      name: "parota",
      userId: "648d9ad19c9515755a372b20",
    });
    await product.save();
    return res.status(200).send({ data: user });
  } catch (err) {
    console.log(err);
  }
});

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
