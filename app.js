const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const PORT = process.env.PORT || 8080;
const customerRoutes = require("./Routes/Customers");
const connection = require("./Helpers/DB.js");
app.use(bodyParser.json());
app.use("/api", customerRoutes);

app.get("/", (req, res) => {
  res.send("API is working properly");
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
