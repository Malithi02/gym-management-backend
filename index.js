const express = require("express");
const cors = require("cors");
const RequestRouter = require("./Routers/RequestRouters");
const { MongoClient, ObjectId, ServerApiVersion } = require("mongodb");
require("dotenv").config();

const app = express();
const port = process.env.PORT || 3000;

// ✅ Middleware
app.use(express.json());
app.use(cors({ origin: "http://localhost:5173" })); // ✅ Ensure CORS is correct
app.use("/requests", RequestRouter);

// ✅ MongoDB Connection
const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@gym-fitness-plans.d2bvb.mongodb.net/?retryWrites=true&w=majority&appName=Gym-Fitness-Plans`;
const client = new MongoClient(uri, {
    serverApi: {
        version: ServerApiVersion.v1,
        strict: true,
        deprecationErrors: true,
    },
});

// ✅ Connect to MongoDB once
async function connectDB() {
    try {
        await client.connect();
        console.log("✅ Successfully connected to MongoDB!");
    } catch (error) {
        console.error("❌ MongoDB connection error:", error);
    }
}
connectDB();

// ✅ Define collections
const db = client.db("Gym-Fitness-Plans");
const planCollections = db.collection("demoPlans");

// ✅ POST: Add a new plan
app.post("/post-plans", async (req, res) => {
    try {
        const body = req.body;
        body.createdAt = new Date();
        const result = await planCollections.insertOne(body);

        if (result.insertedId) {
            return res.status(200).send({ success: true, result });
        } else {
            return res.status(500).send({ success: false, message: "Cannot insert! Try again later" });
        }
    } catch (error) {
        return res.status(500).send({ success: false, message: "Server error", error });
    }
});

// ✅ GET: Retrieve all plans
app.get("/all-plans", async (req, res) => {
    try {
        const plans = await planCollections.find({}).toArray();
        res.send(plans);
    } catch (error) {
        res.status(500).send({ success: false, message: "Failed to fetch plans", error });
    }
});
app.get("/all-plans/:id", async (req, res) => {
    const { id } = req.params;
    try {
        const plan = await planCollections.findOne({ _id: new ObjectId(id) });
        if (plan) {
            res.send(plan); // Send the plan if found
        } else {
            res.status(404).send({ message: "Plan not found" });
        }
    } catch (error) {
        res.status(500).send({ error: "Failed to fetch plan" });
    }
});

// ✅ GET: Retrieve plans by email
app.get("/my-workout-plans/:email", async (req, res) => {
    try {
        const plans = await planCollections.find({ postedBy: req.params.email }).toArray();
        res.send(plans);
    } catch (error) {
        res.status(500).send({ success: false, message: "Failed to fetch workout plans", error });
    }
});

// ✅ DELETE: Remove a workout plan
app.delete("/my-workout-plans/:id", async (req, res) => {
    try {
        const id = req.params.id;
        const result = await planCollections.deleteOne({ _id: new ObjectId(id) });

        if (result.deletedCount > 0) {
            res.send({ success: true, message: "Workout Plan Deleted Successfully!" });
        } else {
            res.status(404).send({ success: false, message: "Plan not found" });
        }
    } catch (error) {
        res.status(500).send({ success: false, message: "Failed to delete plan", error });
    }
});
// ✅ PATCH: Update an existing plan
app.patch("/edit-plans/:id", async (req, res) => {
    const { id } = req.params;
    const updateData = req.body;

    try {
        const result = await planCollections.updateOne({ _id: new ObjectId(id) }, { $set: updateData });

        if (result.modifiedCount > 0) {
            res.send({ success: true, message: "Plan updated successfully" });
        } else {
            res.status(404).send({ success: false, message: "Plan not found or no changes made" });
        }
    } catch (error) {
        res.status(500).send({ success: false, message: "Failed to update plan", error });
    }
});

// ✅ Root route
app.get("/", (req, res) => {
    res.send("Hello World!");
});

// ✅ Start the server
app.listen(port, () => {
    console.log(`🚀 Server running on port ${port}`);
});
