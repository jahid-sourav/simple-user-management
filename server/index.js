const express = require("express");
const cors = require("cors");
const { MongoClient, ServerApiVersion, ObjectId } = require("mongodb");
require("dotenv").config();
const app = express();
const port = process.env.PORT || 5000;

// Middleware
// app.use(cors());
const corsConfig = {
  origin: ["https://simple-user-management-3dce7.web.app"],
  credentials: true,
};
app.use(cors(corsConfig));
app.use(express.json());
app.use(express.json());

// MongoDB Starts Here
const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.5rezh0z.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`;

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
});
client
  .connect()
  .then(() => {
    console.log("MongoDB Connected");
  })
  .catch((err) => {
    console.log(err);
  });
async function run() {
  try {
    // Connect the client to the server	(optional starting in v4.7)
    // await client.connect();

    // Create UserCollection
    const usersCollection = client.db("simpleUsersDB").collection("users");

    // Create User
    app.post("/users", async (request, response) => {
      const newUser = request.body;
      const result = await usersCollection.insertOne(newUser);
      response.send(result);
    });

    // Read
    app.get("/users", async (request, response) => {
      const cursor = usersCollection.find();
      const result = await cursor.toArray();
      response.send(result);
    });

    // Edit
    app.get("/users/:id", async (request, response) => {
      const id = request.params.id;
      const query = { _id: new ObjectId(id) };
      const result = await usersCollection.findOne(query);
      response.send(result);
    });

    // Update
    app.put("/users/:id", async (request, response) => {
      const id = request.params.id;
      const filter = { _id: new ObjectId(id) };
      const options = { upsert: true };
      const updatedUser = request.body;
      const user = {
        $set: {
          name: updatedUser.name,
          email: updatedUser.email,
          password: updatedUser.password,
          photoUrl: updatedUser.photoUrl,
          gender: updatedUser.gender,
          status: updatedUser.status,
        },
      };
      const result = await usersCollection.updateOne(filter, user, options);
      response.send(result);
    });

    // Delete
    app.delete("/users/:id", async (request, response) => {
      const id = request.params.id;
      const query = { _id: new ObjectId(id) };
      const result = await usersCollection.deleteOne(query);
      response.send(result);
    });

    // Send a ping to confirm a successful connection
    // await client.db("admin").command({ ping: 1 });
    // console.log(
    //   "Pinged your deployment. You successfully connected to MongoDB!"
    // );
  } finally {
    // Ensures that the client will close when you finish/error
    // await client.close();
  }
}
run().catch(console.dir);
// MongoDB Ends Here

app.get("/", (request, response) => {
  response.send("Server is Running");
});

app.listen(port, () => {
  console.log(`Port : ${port}`);
});
