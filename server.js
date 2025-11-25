const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const bodyParser = require("body-parser");

const todoRoutes = require("./routes/todoRoutes");

const app = express();

app.use(cors());
app.use(bodyParser.json());

// --- MongoDB Connection ---
mongoose.connect("mongodb://localhost:27017/todoapp", {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
.then(() => console.log("MongoDB Connected"))
.catch(err => console.log(err));

// --- API Routes ---
app.use("/api/todo", todoRoutes);

// --- Start Server ---
app.listen(3000, () => {
    console.log("Server running on port 3000");
});