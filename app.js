const path = require("path");
const express = require("express");
const dotenv = require("dotenv");
const morgan = require("morgan");
const { engine } = require("express-handlebars");
const connectDB = require("./config/db");
const passport = require("passport");
const session = require("express-session");
const { route } = require("./route");

dotenv.config({ path: "./config/config.env" });

//Passport Config
require("./config/passport")(passport);

connectDB();

const app = express();
// Logging
if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"));
}
// Handlebars
app.engine(".hbs", engine({ defaultlayout: "main", extname: ".hbs" }));
app.set("view engine", ".hbs");
app.set("views", "./views");

//Sessions
app.use(
  session({
    secret: "keyboard cat",
    resave: false,
    saveUninitialized: false,
  })
);

//Passport Midleware
app.use(passport.initialize());
app.use(passport.session());

//Static Folders
app.use(express.static(path.join(__dirname, "public")));

// Routes
app.use("/", require("./route/index"));
app.use("/auth", require("./route/auth"));

const PORT = process.env.PORT || 3000;

app.listen(
  PORT,
  console.log(`Server running in ${process.env.NODE_ENV} Mode On Port ${PORT}`)
);
