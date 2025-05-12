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
        price: {type: String}
    }
);

const Hair = mongoose.model("Hair", hairSchema, "Hairs");

app.get("/", async (req, res) => {
    const hairs = await Hair.find({});
    res.render("hair.ejs", { hairs });
});


async function startServer() {
    await mongoose.connect("mongodb+srv://SE12AbiF:CSH2025@cluster0.ebb1f.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0");

    app.listen(3000, () => {
        console.log(`Server running.`);
    });
}

startServer();