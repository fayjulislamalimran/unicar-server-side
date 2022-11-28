const express = require("express");
const cors = require("cors");
const { MongoClient, ServerApiVersion, ObjectId } = require("mongodb");
require("dotenv").config();
const app = express();
const port = process.env.PORT || 5000;

// middleware
app.use(cors());
app.use(express.json());

const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@cluster0.ylc1dr9.mongodb.net/?retryWrites=true&w=majority`;
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });

async function run() {
  try {
    const catagorysCollection = client.db("resaleMubail").collection("catagorys");
    const catagoryOneCollection = client.db("resaleMubail").collection("catagoryOne");

    app.get("/", (req, res) => {
      res.send("Ghorebazar Server Is Running");
    });

    app.get("/catagorys", async (req, res) => {
      const query = {};
      const cursor = catagorysCollection.find(query);
      const catagorys = await cursor.toArray();
      res.send(catagorys);
    });

    app.get("/catagorys/:id", async (req, res) => {
      const id = req.params.id;
      const query = { category_id: id };
      const catagory = await catagoryOneCollection.find(query).toArray();
      res.send(catagory);
    });
  } finally {
  }
}
run().catch((error) => console.error(error));

app.listen(port, () => {
  console.log("Ghorebazar server is Running Port", port);
});
