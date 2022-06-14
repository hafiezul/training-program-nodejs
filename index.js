const express = require("express");
var cors = require("cors");
const app = express();
const port = 5500;

const usersRouter = require("./routes/users");
const vehiclesRouter = require("./routes/vehicles");

app.use(express.json());

app.use(
  express.urlencoded({
    extended: true,
  })
);
app.use(cors());

app.get("/", (req, res) => {
  res.json({ message: "ok" });
});

app.use("/api/users", usersRouter);
app.use("/api/vehicles", vehiclesRouter);

/* Error handler middleware */
app.use((err, req, res, next) => {
  const statusCode = err.statusCode || 500;
  console.error(err.message, err.stack);
  res.status(statusCode).json({ message: err.message });
  return next(err);
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
