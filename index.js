const express = require('express')
const app = express()
const port = process.env.PORT || 5000;
const cors = require("cors");
require("dotenv").config();
const { MongoClient, ServerApiVersion, ObjectId } = require("mongodb");

// Middleware
app.use(cors());
app.use(express.json());

const uri =
  "mongodb+srv://nextfolio:nextfolio@cluster0.zhsy6ko.mongodb.net/?retryWrites=true&w=majority";

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
});

async function run() {
  try {
    // Connect the client to the server	(optional starting in v4.7)
    await client.connect();

    const db = client.db("nextfolio");
    const project = db.collection("projects");

    app.get("/api/v1/projects", async (req, res) => {
      try {
        const projects = await project.find().toArray();
        res.status(200).json({
          success: true,
          message: "Projects retrieved successfully",
          data: projects,
        });
      } catch (error) {
        console.error("Error fetching users:", error);
        res.status(500).json({
          success: false,
          message: "Internal server error",
        });
      }
    });

    app.get("/api/v1/project/:id", async (req, res) => {
      try {
        const id = req.params.id;
        console.log(id);
        const query = { _id: new ObjectId(id) };
        const singleProject = await project.findOne(query);
        // console.log(singleProject);
        if (!singleProject) {
          return res.send(404).json({
            success: false,
            message: "Project not found",
          });
        }
        res.status(200).json({ 
          success: true,
          message: 'Project retrieved successfully',
          data: singleProject
      });
      } catch (error) {
        console.error("Error fetching good:", error);
        res.status(500).json({
          success: false,
          message: "Internal server error",
        });
      }
    });
    app.post("/api/v1/project", async (req, res) => {
      try {
        const { name, img1, img2, img3, img4, techs, live, github } = req.body;
        // console.log(name, img1, img2, img3, img4, techs, live, github);
        const newProject = {
          name,
          img1,
          img2,
          img3,
          img4,
          techs,
          live,
          github,
        };
        // console.log(newProject)
        const result = await project.insertOne(newProject);
        res.status(200).json({
          success: true,
          message: "New Project found successfully",
          data: newProject,
        });
      } catch (error) {
        console.error("Error fetching users:", error);
        res.status(500).json({
          success: false,
          message: "Internal server error",
        });
      }
    });

    app.put("/api/v1/projects/:id", async (req, res) => {
      try {
        const id = req.params.id;
        console.log(id);
        const { name, img1, img2, img3, img4, techs, live, github } = req.body;
        const filter = { _id: new ObjectId(id) };
        const updateProject = {
          $set: {
            name,
            img1,
            img2,
            img3,
            img4,
            techs,
            live,
            github,
          },
        };
        const result = await project.updateOne(filter, updateProject);
        res.status(200).json({
          success: true,
          message: "Projec Updated successfully",
          data: result,
        });
      } catch (error) {
        res.status(500).json({
          success: false,
          message: "Internal server error",
        });
      }
    });

    // Send a ping to confirm a successful connection
    await client.db("admin").command({ ping: 1 });
    console.log(
      "Pinged your deployment. You successfully connected to MongoDB!"
    );
  } finally {
    // Ensures that the client will close when you finish/error
    //     await client.close();
  }
}
run().catch(console.dir);

app.get("/", (req, res) => {
  try {
    res.send("Hello from Nextfolio server!1");
  } catch (error) {
    console.error("Error occurred:", error);
    res.status(500).send("Internal Server Error");
  }
});

app.listen(port, () => {
  console.log(`nextfolio server listening on porttttt ${port}`)
})