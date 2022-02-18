const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const { PORT, MONGODB_URI } = require("./util/config");
const usersRouter = require("./routes/users");

const app = express();

/* Connect to Database */
mongoose
  .connect(MONGODB_URI)
  .then(() => {
    console.log("Connected to MongoDB");
  })
  .catch((err) => {
    console.error(err);
  });

app.use(express.json());
app.use(cors());

/* Register Routes */
app.use("/api/users", usersRouter);

app.listen(PORT, () => {
  console.log(`Server running on PORT: ${PORT}`);
});
