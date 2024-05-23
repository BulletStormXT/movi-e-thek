const express = require('express');
const dotenv = require('dotenv');
dotenv.config();
const bodyParser = require('body-parser');
const signupRoute = require('./routes/signup');
const loginRoute = require("./routes/login");
const userRoute = require("./routes/user")
const cors = require('cors');
const createAdminAccount = require("./scripts/admin"); // Import the createAdminAccount function

const app = express();
app.use(bodyParser.json());
app.use(cors());

createAdminAccount(); // Call the createAdminAccount function

app.use('/user', signupRoute);
app.use('/auth', loginRoute);
app.use('/api', userRoute);


const PORT = process.env.PORT || 6000;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
