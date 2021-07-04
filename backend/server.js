const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const restaurantRouter = require("./routes/restaurant.js");
const app = express();
const port = process.env.PORT || 3005;

app.use(cors());
app.use(express.json());

mongoose.connect(
  // "mongodb+srv://dbUser:<password>@cluster0-m5vu5.gcp.mongodb.net/<dbname>?retryWrites=true&w=majority",  //Replace connection string
  { useNewUrlParser: true, useCreateIndex: true, useUnifiedTopology: true }
);
     
const connection = mongoose.connection;
connection.once("open", () => {
  console.log("MongoDb database connection established successfully");
});

app.use("/restaurant", restaurantRouter);

app.listen(port, () => {
  console.log(`Server is running on port: ${port}`);
});
