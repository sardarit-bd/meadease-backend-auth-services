/****** core modules import here *******/
import cors from "cors";
import express from "express";
import passport from 'passport';
import './config/passport.js';



/*******internal files import here *******/
import { errorHandler, notFound } from './middlewares/errorMiddleware.js';
import authRoutes from './routes/authroute/authUserRoutes.js';
import healthRoutes from "./routes/health/healthRoute.js";

/****** express app initilazation here *******/
const app = express();

app.use(passport.initialize());
// app.use(passport.session());


/********* Body Data Parse **********/
app.use(express.json());
app.use(express.urlencoded({ extended: true }));


/*********** Middleware Here ***********/
/*********** CORS  Middleware Here ***********/
const allowedOrigins = [
    process.env.API_GETWAY_URL,
    "http://localhost:3000",
];
app.use(
    cors({
        origin: function (origin, callback) {
            if (!origin) return callback(null, true); // allow non-browser requests
            if (allowedOrigins.includes(origin)) {
                callback(null, true);
            } else {
                callback(new Error("Not allowed by CORS"));
            }
        },
        credentials: true,
    })
);



/********** auth Routes Define Here *********/
app.use("/", authRoutes);


/********** health check Routes Define Here *********/
app.use("/", healthRoutes);


// health check
app.get("/", (req, res) => {
    res.status(200).json({
        status: "OK",
        service: "auth services",
        uptime: process.uptime(),
    });
});


app.use(errorHandler);
app.use(notFound);


/******* Export the module ******/
export default app;
