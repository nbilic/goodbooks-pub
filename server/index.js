const express = require("express");
const morgan = require("morgan");
const helmet = require("helmet");
const dotenv = require("dotenv");
const cors = require("cors");
const path = require("path");
const mongoose = require("mongoose");
dotenv.config();

//routes
const userRoute = require("./routes/userRoute");
const authRoute = require("./routes/authRoute");
const bookRoute = require("./routes/bookRoute");
const app = express();

//DB connect
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("Connected to DB"))
  .catch((err) => console.log(err));
//Middleware
app.use(express.json());
app.use(helmet());
app.use(morgan("common"));
app.use(
  cors({
    origin: "http://localhost:3001",
    credentials: true,
  })
);

app.use("/api/users", userRoute);
app.use("/auth", authRoute);
app.use("/api/books", bookRoute);

/* app.use(express.static(path.join(__dirname, "build")));
app.get("/*", (req, res) => {
  res.sendFile(path.join(__dirname, "build", "index.html"));
}); */

const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`Listening on PORT ${PORT}`);
});
