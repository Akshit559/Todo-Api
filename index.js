const express = require("express");
const connectDB = require("./config/db");

const app = express();
app.use(require("cors")());

connectDB();

app.use(express.json({ extended: true }));

app.use("/api/user", require("./routes/user"));
app.use("/api/task", require("./routes/task"));

app.get("*", (req, res) => {
  res.json({ statusCode: 404, message: "Route not found" });
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log("Server Connected on PORT:", PORT);
});
