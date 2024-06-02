import express from "express";
import path from "path";
import cosmeticRoutes from "./routes/cosmeticRoutes";

const app = express();

app.use(express.json());
app.use(express.urlencoded({extended:false}));
app.use(express.static(path.join(__dirname, "static")));

app.use("/api/cosmetics", cosmeticRoutes);

const port = process.env.PORT || 3000;
const host = process.env.HOST || '127.0.0.1';




app.listen(port, () => console.log(`Server listening at http://${host}:${port}`))