const express = require("express");
const cors = require("cors");
const { MongoClient, ServerApiVersion } = require("mongodb");
const app = express();
const port = process.env.port || 3000;

app.use(cors());
app.use(express.json());

// simpleDBUser
// o7YFYx6w60RCmdqq

const uri =
  "mongodb+srv://simpleDBUser:o7YFYx6w60RCmdqq@cluster0.3o3pwj7.mongodb.net/?retryWrites=true&w=majority";

const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
});

app.get("/", (req, res) => {
  res.send(`Simple Crud Server is Runnings`);
});

async function run() {
  try {
    await client.connect();


    const usersDB = client.db('usersDB');
    const usersCollection = usersDB.collection("pizzaMenu");




    app.post("/users", async(req, res) => {
      const newUser = req.body;
      console.log("user info", newUser);
      const result = await usersCollection.insertOne(newUser);
      res.send(result);
    });

    await client.db("admin").command({ ping: 1 });
    console.log("Pinged your deployment. You successfully connected to MongoDB!");
  } finally {

  }
}
run().catch(console.dir);

app.listen(port, (req, res) => {
  console.log(`Simple Crud Server is Running on Port ${port}`);
});
