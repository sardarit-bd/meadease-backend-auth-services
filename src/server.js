import environment from "./config/env.js";
import connectDB from './config/db.js';
import { connectRedis } from "./config/redis.config.js";
import app from "./app.js";

/******** PORT Define *******/
const PORT = process.env.AUTH_SERVICE_PORT || 5001;


/********** Connect to Database Here **********/
connectDB();
connectRedis();



/*********** Start The Server ***********/
app.listen(PORT, () => {
  console.log(`🚀 Server running on port: ${PORT} in ${environment} mode`);
});
