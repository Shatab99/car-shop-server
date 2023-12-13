const express = require('express');
const cors = require('cors');
const port = process.env.PORT || 5000;
const app = express()
const fs = require('fs')

// middleware

app.use(cors());
app.use(express.json())



// shatabag4749
// jT7HfkwVvC0C7QWY

// connet with mongoDB


const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');
const uri = "mongodb+srv://shatabag4749:jT7HfkwVvC0C7QWY@cluster0.mn2jgcb.mongodb.net/?retryWrites=true&w=majority";

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
    // Connect the client to the server	(optional starting in v4.7)
    // await client.connect();

    const carCollections = client.db("CarShopDB").collection('AddedCars')
    const carcards = client.db("CarShopDB").collection("CarCards")
    const carts = client.db("CarShopDB").collection('MyCarts')
    const feedback = client.db("CarShopDB").collection('Feedbacks')



    app.get('/', (req, res) => {
      res.send("Cars Server !!")
    })

    app.get('/addedcars', async (req, res) => {
      const cursor = carCollections.find()
      const result = await cursor.toArray()
      res.send(result)
    })

    app.get('/addedcars/:id', async (req, res) => {
      const id = req.params.id;
      const query = { _id: new ObjectId(id) }
      const result = await carCollections.findOne(query)
      res.send(result)
    })

    app.post('/addedcars', async (req, res) => {
      const cars = req.body;
      const result = await carCollections.insertOne(cars)
      res.send(result)

    })

    app.get('/carcards', async (req, res) => {
      const cursor = carcards.find();
      const result = await cursor.toArray();
      res.send(result);

    })

    app.get('/carcards/:name', async (req, res) => {
      const name = req.params.name;
      const query = { brand_name: name }
      const result = await carcards.findOne(query)
      res.send(result)
    })

    app.get('/mycarts', async (req, res) => {
      const cursor = carts.find()
      const result = await cursor.toArray()
      res.send(result)
    })
    app.get('/mycarts/:id', async (req, res) => {
      const id = req.params.id;
      const query = { _id: new ObjectId(id) }
      const result = await carts.findOne(query)
      res.send(result)

    })

    app.delete('/mycarts/:id', async (req, res) => {
      const id = req.params.id;
      const query = { _id: new ObjectId(id) }
      const result = await carts.deleteOne(query)
      res.send(result)
    })


    app.post('/mycarts', async (req, res) => {
      const newcart = req.body;
      const result = await carts.insertOne(newcart)
      res.send(result)
    })

    // update section

    app.get('/update', async (req, res) => {
      const cars = carCollections.find()
      const result = await cars.toArray();
      res.send(result)
    })

    app.get('/update/:id', async (req, res) => {
      const id = req.params.id;
      const query = { _id: new ObjectId(id) }
      const result = await carCollections.findOne(query)
      res.send(result)
    })
    app.put('/update/:id', async (req, res) => {
      const id = req.params.id;
      const query = { _id: new ObjectId(id) }
      const options = { upsert: true }
      const cars = req.body
      const updatedCars = {
        $set: {
          photoUrl: cars.photoUrl,
          name: cars.name,
          type: cars.type,
          price: cars.price,
          rating: cars.rating,
          description: cars.description,
          brand: cars.brand
        }
      }

      const result = await carCollections.updateOne(query, updatedCars, options)
      res.send(result)
    })


    // Feedback Section

    app.get('/feedback', async(req, res)=>{
      const userfeedback = feedback.find()
      const result = await userfeedback.toArray()
      res.send(result)
    })

    app.post('/feedback', async(req, res)=>{
      const userfeedback=req.body;
      const result = await feedback.insertOne(userfeedback)
      res.send(result)
    })




    // Send a ping to confirm a successful connection
    // await client.db("admin").command({ ping: 1 });
    console.log("Pinged your deployment. You successfully connected to MongoDB!");
  } finally {
    // Ensures that the client will close when you finish/error
    // await client.close();
  }
}
run().catch(console.dir);





app.listen(port, () => {
  console.log("Server running on", port)
})