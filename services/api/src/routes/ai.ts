import { Router, Request, Response } from 'express';
import { authenticateToken, authorizeRole } from '../middleware/auth';
import { SimpleLinearRegression, SimpleKNN } from '../utils/ml';

const router = Router();

// Initialize and train models on startup
const costModel = new SimpleLinearRegression();
costModel.train([100, 200, 300, 400, 500, 1000], [150, 250, 350, 450, 550, 1050]); // Y = X + 50 roughly

const riskModel = new SimpleKNN(3);
riskModel.train([
  [100, 1, 1], // short, clear, clear -> Low
  [200, 2, 1], // medium, mild, clear -> Low
  [500, 4, 2], // long, severe, moderate -> High
  [600, 5, 3], // long, extreme, heavy -> Critical
  [50, 1, 1],  // very short -> Low
  [800, 2, 3]  // very long, mild, heavy -> Medium
], ['Low', 'Low', 'High', 'Critical', 'Low', 'Medium']);


// POST /api/ai/predict-eta - Predictive ETA model
router.post('/predict-eta', authenticateToken, authorizeRole('Super Admin', 'Dispatcher', 'Company Admin'), (req: Request, res: Response) => {
  const { origin, destination, vehicleType, trafficIndex, weatherCondition } = req.body;

  // AI heuristic simulation
  const baseMinutes = 180;
  const trafficMultiplier = trafficIndex === 'high' ? 1.4 : trafficIndex === 'moderate' ? 1.15 : 1.0;
  const weatherMultiplier = weatherCondition === 'stormy' ? 1.3 : weatherCondition === 'rain' ? 1.1 : 1.0;

  const predictedMinutes = Math.round(baseMinutes * trafficMultiplier * weatherMultiplier);
  const confidenceScore = Math.round(88 + Math.random() * 10);

  res.json({
    success: true,
    prediction: {
      origin: origin || 'Central Hub',
      destination: destination || 'North Terminal',
      vehicleType: vehicleType || 'Electric Semi',
      predictedDurationMinutes: predictedMinutes,
      predictedETA: new Date(Date.now() + predictedMinutes * 60000).toISOString(),
      confidenceScore: `${confidenceScore}%`,
      recommendedSpeedKmh: 82,
      fuelOptimizationPotential: '14.2%',
    },
  });
});

// POST /api/ai/optimize-route - Autonomous multi-stop sequencer
router.post('/optimize-route', authenticateToken, authorizeRole('Super Admin', 'Dispatcher'), (req: Request, res: Response) => {
  const { stops } = req.body;

  if (!Array.isArray(stops) || stops.length === 0) {
    return res.status(400).json({ success: false, message: 'Invalid stops array' });
  }

  // Optimize stop order by simulated heuristic
  const optimizedSequence = [...stops].sort((a, b) => (a.priority || 0) - (b.priority || 0));

  res.json({
    success: true,
    optimization: {
      originalStops: stops.length,
      optimizedSequence,
      totalDistanceKm: Math.round(stops.length * 68),
      deadheadReduction: '28.5%',
      co2SavedKg: Math.round(stops.length * 14.5),
    },
  });
});

// GET /api/ai/maintenance-alerts - Predictive maintenance diagnostics
router.get('/maintenance-alerts', authenticateToken, authorizeRole('Super Admin', 'Dispatcher', 'Warehouse Manager'), (req: Request, res: Response) => {
  const alerts = [
    { vehicleId: 'TRK-902', component: 'Brake Rotor Thickness', wearLevel: '82%', urgency: 'High', predictedFailureKm: 450 },
    { vehicleId: 'TRK-401', component: 'Inverter Coolant Temp', wearLevel: '68%', urgency: 'Medium', predictedFailureKm: 1200 },
    { vehicleId: 'VAN-105', component: 'Tire Pressure Sensor FL', wearLevel: '74%', urgency: 'Medium', predictedFailureKm: 900 },
    { vehicleId: 'SHP-002', component: 'Propulsion Bearing Vibration', wearLevel: '91%', urgency: 'Critical', predictedFailureKm: 180 },
  ];

  res.json({ success: true, alerts });
});

// POST /api/ai/chat - AI Assistant Chatbot with Regression, Classification, and Groq LLM
router.post('/chat', authenticateToken, async (req: Request, res: Response) => {
  const { message } = req.body;
  if (!message) return res.status(400).json({ success: false, message: 'Message is required' });

  const msgLower = message.toLowerCase();

  // 1. Handle explicit ML model triggers first
  if (msgLower.includes('predict') && (msgLower.includes('cost') || msgLower.includes('regression'))) {
    const match = msgLower.match(/\d+/);
    if (match) {
      const distance = parseInt(match[0]);
      const predictedCost = costModel.predict(distance);
      return res.json({ success: true, reply: `📊 **Linear Regression Result**\nThe estimated shipping cost for a distance of ${distance}km is **₹${predictedCost.toFixed(2)}**.` });
    }
  } else if (msgLower.includes('classify') && (msgLower.includes('risk') || msgLower.includes('classification'))) {
    const numbers = msgLower.match(/\d+(\.\d+)?/g);
    if (numbers && numbers.length >= 3) {
      const distance = parseFloat(numbers[0]);
      const weather = parseFloat(numbers[1]);
      const traffic = parseFloat(numbers[2]);
      const riskLabel = riskModel.predict([distance, weather, traffic]);
      return res.json({ success: true, reply: `🎯 **KNN Classification Result**\nA trip with distance ${distance}km, weather severity ${weather}/5, and traffic factor ${traffic}/3 is classified as: **${riskLabel} Risk**.` });
    }
  }

  // 2. Fallback to advanced Groq LLM for general queries
  try {
    const groqResponse = await fetch('https://api.groq.com/openai/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${process.env.GROQ_API_KEY}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        model: 'openai/gpt-oss-20b',
        messages: [
          {
            role: 'system',
            content: "You are Cortex, an advanced AI Logistics Assistant for the 'Logistis' platform. You help users manage fleets, warehouses, orders, and shipments. You have access to regression and classification models which users can trigger by asking 'predict cost' or 'classify risk'. Give brief, professional, and helpful answers formatted in markdown."
          },
          { role: 'user', content: message }
        ],
        temperature: 0.7,
        max_tokens: 1024
      })
    });

    if (!groqResponse.ok) {
      const errorData = await groqResponse.json();
      console.error('Groq API Error:', errorData);
      return res.json({ success: true, reply: "I'm sorry, my advanced language model is currently offline. However, my regression and classification models are still active." });
    }

    const data = await groqResponse.json();
    const reply = data.choices[0].message.content;
    res.json({ success: true, reply });
  } catch (error) {
    console.error('LLM Error:', error);
    res.json({ success: true, reply: "I'm sorry, I encountered an internal error connecting to the neural network." });
  }
});

export default router;
