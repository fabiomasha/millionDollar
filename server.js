// if(process.env.NODE_ENV !== 'production'){
//     require('dotenv').config({ path: '.env' });
// }

const express = require('express')
const app = express()
const expressLayouts = require('express-ejs-layouts')

const indexRouter = require('./routes/index')

app.set('view engine' , 'ejs')
app.set('views' , __dirname + '/views')
app.set('layout', 'layouts/layout')
app.use(expressLayouts)
app.use(express.static('public'))

// const mongoose = require('mongoose')
// mongoose.connect(process.env.DATABASE_URL, {useNewUrlParser: true,
//     useUnifiedTopology: true})
// const db = mongoose.connection
// db.on('error', error => console.error(error))
// db.once('open', () => console.log('Connected to mongosse'))

const { MongoClient } = require("mongodb");
// Connection URI
const uri =
  "mongodb+srv://mashafabio7:Al3d7QXim7ux7S4n@cluster0.dpqa9rg.mongodb.net/?retryWrites=true&w=majority";
// Create a new MongoClient
const client = new MongoClient(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
async function run() {
  try {
    // Connect the client to the server
    await client.connect();
    // Establish and verify connection
    await client.db("admin").command({ ping: 1 });
    console.log("Connected successfully to server");
  } finally {
    // Ensures that the client will close when you finish/error
    await client.close();
  }
}
run().catch(console.dir);

app.use('/', indexRouter)

app.listen(process.env.PORT || 3001)