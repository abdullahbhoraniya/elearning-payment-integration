import express from 'express';
import cors from 'cors'


// Routes
import route from './routes/payments.route.js';

const app=express();

app.use(express.json());
app.use(cors());
app.use('/api/v1/payments', route);

app.get("/", (req, res) => {
  res.send("API Running...");
});

app.use((err, req, res, next) => {

  console.log(err);

  res.status(500).json({
    success: false,
    message: "Internal Server Error"
  });
});


export default app;