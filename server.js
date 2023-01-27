 /* const express = require("express");
const mongoose = require("mongoose");
const app = express();

const uri =
  "mongodb+srv://LEE:qudtlssus12@cluster0.uixd0hn.mongodb.net/?retryWrites=true&w=majority";

async function connect() {
  try {
    mongoose.set("strictQuery", true);
    await mongoose.connect(uri);
    console.log("conneted to MongGoDB");
  } catch (error) {
    console.error(error);
  }
}

connect();

app.listen(8000, () => {
  console.log("server started on port 8000");
}); */
