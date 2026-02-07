import express from 'express';
import dotenv from 'dotenv';
import path from "path";

import authRoutes from "./routes/auth.route.js"
import messageRoutes from "./routes/message.route.js"

dotenv.config();

const app = express();
const __dirname = path.resolve();

let port = process.env.PORT;

app.use("/api/auth",authRoutes);
app.use("/api/messagess", messageRoutes);

// make ready for deployement
if(process.env.NODE_ENV === "production"){
    app.use(express.static(path.join(__dirname, "../frontend/dist")))

    app.use( (req,res)=>{
        res.sendFile(path.join(__dirname, "../frontend", "dist", "index.html"));
    })
}
app.listen(port,()=>
    console.log(`server is listening on the port ${port}`)
)