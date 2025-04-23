const express = require("express");

const router = express.Router();

const { getAllMealPlans, getMealPlanById, getMealPlansByEmail, createMealPlan, updateMealPlan, deleteMealPlan } = require("../Controllers/MealPlanControlller");

// Routes
// Get all plans
router.get("/", getAllMealPlans);

// Get a specific plan by ID
router.get("/:id", getMealPlanById);

// Get plans by email
router.get("/email/:email", getMealPlansByEmail);

// Create a new plan
router.post("/", createMealPlan);

// Update an existing plan
router.patch("/:id", updateMealPlan);

// Delete a plan
router.delete("/:id", deleteMealPlan);

module.exports = router;
