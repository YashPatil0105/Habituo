import mongoose from 'mongoose';

const taskSchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: { type: String, default: '' },
  color: { type: String, default: '#34D399' },
  priority: { 
    type: String, 
    enum: ['low', 'medium', 'high'], 
    default: 'medium' 
  },
  completed: { type: Boolean, default: false },
  status: { 
    type: String, 
    enum: ['todo', 'inprogress', 'completed'], 
    default: 'todo' 
  },
});

const planSchema = new mongoose.Schema({
  planType: { 
    type: String, 
    enum: ['daily', 'weekly', 'monthly', 'yearly'], 
    required: true 
  },
  tasks: [taskSchema],

},{timestamps: true});

const Plan = mongoose.model('Plan', planSchema);
export default Plan;
