import "./src/config/config";

import express from "express";
// import next from "next";
import cors from "cors";
import bodyParser from "body-parser";
import cookieParser from "cookie-parser";
import path from "path";
import { error } from "./src/middlewares/error";
import db from "./src/models";
import SizesRouter from "./src/routers/sizes";
import ColorsRouter from "./src/routers/colors";
import ProductsRouter from "./src/routers/products";
import CategoriesRouter from "./src/routers/categories";
import BrandsRouter from "./src/routers/brands";
import UsersRouter from "./src/routers/users";
import ProductVariantsRouter from "./src/routers/productVariants";
import ChatRoomsRouter from "./src/routers/chatRooms";
import MessagesRouter from "./src/routers/messages";

const port = process.env.PORT || 5000;

// const dev = process.env.NODE_ENV !== "production";

// const nextApp = next({
//   dev,
//   dir: path.resolve(__dirname, "./client"),
// });

// const handle = nextApp.getRequestHandler();

// nextApp.prepare().then(async () => {
const app = express();

app.use(
  cors({
    origin: [process.env.FRONTEND_URL!],
    methods: ["GET", "POST", "PUT", "DELETE", "PATCH"],
    credentials: true,
  })
);

app.use(cookieParser());

app.use(express.json());

app.use(bodyParser.urlencoded({ extended: true }));

app.use((req, _res, next) => {
  if (req.path === "/index.php") {
    req.url = req.url.replace(/^\/index\.php/, "/");
  }

  next();
});

app.use(
  "/uploads",
  express.static(path.join(process.cwd(), "uploads"))
);

app.use("/api/v0/auth", UsersRouter);
app.use("/api/v0/sizes", SizesRouter);
app.use("/api/v0/colors", ColorsRouter);
app.use("/api/v0/products", ProductsRouter);
app.use("/api/v0/brands", BrandsRouter);
app.use("/api/v0/categories", CategoriesRouter);
app.use("/api/v0/variants", ProductVariantsRouter);
app.use("/api/v0/rooms", ChatRoomsRouter);
app.use("/api/v0/messages", MessagesRouter);

// Next.js handler
// app.all(/.*/, (req, res) => {
//   return handle(req, res);
// });

app.use(error);

try {
  db.sequelize?.authenticate().then(() => {
    app.listen(Number(port), () => {
      console.log(`Server is running on port ${port}`);
    });
  })
} catch (err) {
  console.error("Failed to start server:", err);
  process.exit(1);
}
// });