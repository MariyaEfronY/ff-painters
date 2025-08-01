// server.js
import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';

// Import routes
import painterRoutes from './routes/painterRoutes.js'; 
import painterImageRoutes from './routes/painterImageRoutes.js';

import bookingRoutes from './routes/bookingRoutes.js';

dotenv.config();
const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Fix __dirname in ES Modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Serve static image files from 'uploads' folder
app.use('/uploads', express.static(path.join('uploads')));

// API Routes (✅ Ensure unique base paths to avoid overlap)
app.use('/api/painter', painterRoutes);         // Handles login, signup, profile, etc.
app.use('/api/painter', painterImageRoutes);     // Handles profile image and gallery
app.use('/api/bookings', bookingRoutes);         // Handles customer bookings

// MongoDB Connection
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
}).then(() => {
  console.log('✅ MongoDB Connected');
}).catch((err) => {
  console.error('❌ MongoDB Connection Error:', err.message);
});

// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🚀 Server running at http://localhost:${PORT}`);
});
