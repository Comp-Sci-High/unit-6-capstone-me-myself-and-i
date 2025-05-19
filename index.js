const mongoose = require("mongoose");
const express = require("express");

const app = express();

app.use(express.static(__dirname + "/public"));

app.use(express.json());

app.set("view engine", "ejs");

app.use((req, res, next) => {
    console.log(`${req.method}: ${req.path}`);
    next();
});


//Schema stuff goes here!!!

const hairSchema = new mongoose.Schema(
    {
        name: {type: String},
        image: {type: String},
        price: {type: Number},
        duration: {type: Number},
        description: {type: String},
        rating: {type: String}
    }
);

const Hair = mongoose.model("Hair", hairSchema, "Hairs");

app.get("/", async (req, res) => {
    const hairs = await Hair.find({});
    res.render("hair.ejs", { hairs });
});

app.post("/add/hairstyle", async (req, res) => {
    const newHairstyle = await new Hair({
      name: req.body.name,
      image: req.body.image,
      price: req.body.price,
      duration: req.body.duration,
      description: req.body.description,
      rating: req.body.rating
    }).save();
    res.json(newHairstyle);
  });

app.delete('/delete/hairstyle/:_id', async (req, res) => {
    const response = await Hair.findOneAndDelete({_id: req.params._id})
    res.json(response)
})

app.patch("/update/hairstyle/:_id", async (req, res) => {
const update = await Hair.findOneAndUpdate({ _id: req.params._id }, 
        req.body, {new: true})
        res.json(update);
})


async function startServer() {
    await mongoose.connect("mongodb+srv://SE12AbiF:CSH2025@cluster0.ebb1f.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0");

    app.listen(3000, () => {
        console.log(`Server running.`);
    });
}

startServer();