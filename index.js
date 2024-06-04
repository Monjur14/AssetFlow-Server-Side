const express = require("express")
const cors = require("cors")
const jwt = require("jsonwebtoken")
require("dotenv").config()
const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');

const PORT = process.env.PORT || 5000
const app = express()

const corsOption = {
    origin: ["http://localhost:5173", "https://assignment-11-3a7d3.web.app"],
    credentials: true,
    optionSuccessStatus: 200,
}
app.use(cors(corsOption))
app.use(cors())
app.use(express.json())

const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.zp5qruk.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`;

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
    serverApi: {
      version: ServerApiVersion.v1,
      strict: true,
      deprecationErrors: true,
    }
  });
  async function run() {
    try {
        const UsersCollection = client.db("AssetFlow").collection("users")
    
        app.get("/users", async (req, res) => {
            const result = await UsersCollection.find().toArray()
            res.send(result)
        })

        app.post("/users", async (req, res) => {
            const newUser = req.body
            const result = await UsersCollection.insertOne(newUser)
            res.send(result)
          })
        

        

        



      // Send a ping to confirm a successful connection
      await client.db("admin").command({ ping: 1 });
      console.log("Pinged your deployment. You successfully connected to MongoDB!");
    } finally {
    }
  }
  run().catch(console.dir);

app.get("/", (req, res) => {
    res.send('Hello from AssetFlow Server.......')
})


app.listen(PORT, () => {
    console.log(`Server is Running on PORT ${PORT}`)
})