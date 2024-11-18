import Plan from '../models/Plan.js';

// Create a new plan
export const createPlan = async (req, res) => {
  try {
    const { planType, tasks } = req.body;
    const plan = new Plan({ planType, tasks });
    await plan.save();
    res.status(201).json({ message: 'Plan created successfully', plan });
  } catch (error) {
    res.status(500).json({ error: 'Failed to create plan', details: error.message });
  }
};

// Get all plans
export const getAllPlans = async (req, res) => {
  try {
    const plans = await Plan.find();
    res.status(200).json(plans);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch plans', details: error.message });
  }
};

// Get a specific plan
export const getPlanById = async (req, res) => {
  try {
    const { id } = req.params;
    const plan = await Plan.findById(id);
    if (!plan) return res.status(404).json({ error: 'Plan not found' });
    res.status(200).json(plan);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch plan', details: error.message });
  }
};

// Update a plan
export const updatePlan = async (req, res) => {
  try {
    const { id } = req.params;
    const updates = req.body;
    const plan = await Plan.findByIdAndUpdate(id, updates, { new: true });
    if (!plan) return res.status(404).json({ error: 'Plan not found' });
    res.status(200).json({ message: 'Plan updated successfully', plan });
  } catch (error) {
    res.status(500).json({ error: 'Failed to update plan', details: error.message });
  }
};

// Delete a plan
export const deletePlan = async (req, res) => {
  try {
    const { id } = req.params;
    const plan = await Plan.findByIdAndDelete(id);
    if (!plan) return res.status(404).json({ error: 'Plan not found' });
    res.status(200).json({ message: 'Plan deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Failed to delete plan', details: error.message });
  }
};
