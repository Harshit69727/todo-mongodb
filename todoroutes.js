const express = require("express");
const router = express.Router();
const Todo = require("../models/Todo");

// --- CREATE TODO ---
router.post("/add", async (req, res) => {
    try {
        const todo = new Todo({
            task: req.body.task
        });
        await todo.save();
        res.json({ message: "Task Added", todo });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// --- READ ALL ---
router.get("/all", async (req, res) => {
    try {
        const todos = await Todo.find();
        res.json(todos);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// --- UPDATE TODO ---
router.put("/update/:id", async (req, res) => {
    try {
        const updated = await Todo.findByIdAndUpdate(
            req.params.id,
            {
                task: req.body.task,
                completed: req.body.completed
            },
            { new: true }
        );
        res.json({ message: "Updated", updated });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// --- DELETE TODO ---
router.delete("/delete/:id", async (req, res) => {
    try {
        await Todo.findByIdAndDelete(req.params.id);
        res.json({ message: "Deleted" });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

module.exports = router;