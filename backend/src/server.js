import express from 'express';
import path from "path";
import cors from "cors";

import authRoutes from "./routes/auth.route.js"
import messageRoutes from "./routes/message.route.js"
import { connectDB } from './lib/db.js';
import {ENV} from "./lib/env.js"; 
import cookieParser from "cookie-parser";
import {app , server} from "./lib/socket.js";

const __dirname = path.resolve();

let port = ENV.PORT;
app.use(cors({
  origin: [
    "http://localhost:5173",
    "https://chatify-frontend-vmj9.onrender.com"
  ],
  credentials: true
}));
app.use(express.json({ limit: "10mb" }));
app.use(express.urlencoded({ limit: "10mb", extended: true }));
app.use(cookieParser( ));


app.use("/api/auth",authRoutes);
app.use("/api/messages", messageRoutes);

// make ready for deployement
if(ENV.NODE_ENV === "production"){
    app.use(express.static(path.join(__dirname, "../frontend/dist")))

    app.use( (req,res)=>{
        res.sendFile(path.join(__dirname, "../frontend", "dist", "index.html"));
    })
}
server.listen(port,()=>{
    console.log(`server is listening on the port ${port}`)
     connectDB();
})