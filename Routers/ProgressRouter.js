const express = require("express");
const progressController = require("../Controllers/progressController");

const router = express.Router();

const {
    getAllProgressPlans,
    getProgressPlanById,
    getProgressPlansByEmail,
    createProgressPlan,
    updateProgressPlan ,
    deleteProgressPlan,
} = require("../Controllers/progressController");

// Routes
// Get all plans
router.get("/", getAllProgressPlans);

// Get a specific plan by ID
router.get("/details/:id",  getProgressPlanById);

// Get plans by email
router.get("/email/:email",getProgressPlansByEmail);

// Create a new plan
router.post("/create", createProgressPlan);
//router.post("/create", MealPlanControlller.createMealPlan);

// Update an existing plan
router.put("/edit/:id", updateProgressPlan);

// Delete a plan
router.delete("/delete/:id",  deleteProgressPlan);

module.exports = router;
