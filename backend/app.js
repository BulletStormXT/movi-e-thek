const express = require("express");
const dotenv = require("dotenv");
dotenv.config();
const bodyParser = require("body-parser");
const signupRoute = require("./routes/signup");
const loginRoute = require("./routes/login");
const userRoute = require("./routes/user");
const productRoute = require("./routes/productRoutes");
const cors = require("cors");
const movieRoute = require("./routes/movieRoutes");
const createAdminAccount = require("./scripts/admin");
const cartRoutes = require("./routes/cart");

const app = express();

app.use(bodyParser.json());
app.use(cors());

createAdminAccount();

//userRoutes
app.use("/user", signupRoute);
app.use("/auth", loginRoute);
app.use("/api", userRoute);
//movieRoutes
app.use("/api/products", productRoute);
app.use("/api/movies", movieRoute);
//cartRoutes
app.use("/api/cart", cartRoutes);

const PORT = process.env.PORT || 6000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
