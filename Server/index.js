const { MongoClient, ServerApiVersion, ObjectId } = require("mongodb");
const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");
require("dotenv").config();

const app = express();
const port = process.env.PORT || 5000;

// middlewares
app.use(
  cors({
    origin: ["http://localhost:5173", "https://ph-a12.surge.sh","https://ph-12.surge.sh","https://ph-a10.firebaseapp.com", "ph-12.surge.sh"],
    credentials: true,
  })
);
app.use(express.json());
app.use(cookieParser());

const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.ixzkh9v.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`;

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
    //   await client.connect();
    // Send a ping to confirm a successful connection
    //   await client.db("admin").command({ ping: 1 });

    const classesCollection = client.db("PHA12").collection("Classes");
    const trainersCollection = client.db("PHA12").collection("Trainers");
    const usersCollection = client.db("PHA12").collection("Users");
    const paymentsCollection = client.db("PHA12").collection("Payments");
    const newsletterCollection = client.db("PHA12").collection("Newsletters");
    const bookingsCollection = client.db("PHA12").collection("Bookings");
    const forumPostCollection = client.db("PHA12").collection("ForumPosts");

    // app.get("/classes", async (req, res) => {
    //   // _id will be userId
    //   const pipeline = [
    //     {
    //       $lookup: {
    //         from: "Trainers",
    //         localField: "trainers",
    //         foreignField: "_id",
    //         as: "trainerDetails",
    //       },
    //     },
    //     {
    //       $project: {
    //         name: 1,
    //         image: 1,
    //         details: 1,
    //         trainers: "$trainerDetails",
    //         totalBookings: 1,
    //       },
    //     },
    //   ];
    //   const result = await classesCollection.aggregate(pipeline).toArray();
    //   res.send(result);
    // });

    // trainers api
    app.get("/trainer-details/:email", async (req, res) => {
      const result = await trainersCollection.findOne({
        email: req.params.email,
      });
      res.send(result);
    });
    app.patch("/add-new-slot/:email", async (req, res) => {
      const slot = req.body;
      const query = { email: req.params.email };
      const result = await trainersCollection.updateOne(query, {
        $push: { availableSlots: slot },
      });
      res.send(result);
    });

    app.patch("/delete-slot/:email", async (req, res) => {
      const query = { email: req.params.email };
      const slot = req.body;
      const result = await trainersCollection.updateOne(query, {
        $pull: {
          availableSlots: slot,
        },
      });
      res.send(result);
    });

    // add new forum
    app.post("/add-new-forum", async (req, res) => {
      const post = req.body;
      const result = await forumPostCollection.insertOne(post);
      res.send(result);
    });

    // admin api
    app.get("/applied-trainers", async (req, res) => {
      const result = await usersCollection
        .find({
          trainer_applied: true,
        })
        .toArray();
      res.send(result);
    });

    app.patch("/make-trainer", async (req, res) => {
      const email = req.body.email;
      const trainer = req.body;
      const makeTrainer = await trainersCollection.insertOne(trainer);
      const result = await usersCollection.updateOne(
        { email: email },
        {
          $set: {
            role: "trainer",
            trainer_applied: false,
            admin_feedback: false,
          },
        }
      );
      res.send([makeTrainer, result]);
    });

    app.patch("/reject-trainer/:email", async (req, res) => {
      const email = req.params.email;
      const rejection = req.body;
      const result = await usersCollection.updateOne(
        { email: email },
        {
          $set: {
            trainer_applied: false,
            admin_feedback: rejection.admin_feedback,
          },
        }
      );
      res.send(result);
    });

    app.get("/payments-summary", async (req, res) => {
      try {
        // Sum all amounts
        const totalAmountResult = await paymentsCollection
          .aggregate([
            {
              $group: {
                _id: null,
                totalAmount: { $sum: { $toDouble: "$amount" } }, // Convert string to double and sum
              },
            },
          ])
          .toArray();

        const totalAmount = totalAmountResult[0]
          ? totalAmountResult[0].totalAmount
          : 0;

        // Get the last 6 payments
        const lastPayments = await paymentsCollection
          .find()
          .sort({ createdAt: -1 })
          .limit(6)
          .toArray();

        res.send({ totalAmount, lastPayments });
      } catch (error) {
        console.error(error);
        res
          .status(500)
          .send({
            error: "An error occurred while fetching the payment summary.",
          });
      }
    });

    app.get("/paid-and-newsletter", async (req, res) => {
      const newsletterEmails = await newsletterCollection.find().toArray();
      const newsletterEmailList = newsletterEmails.map((doc) => doc.email);
      // Retrieve all emails from paymentCollection
      const paymentEmails = await paymentsCollection.find().toArray();
      const paymentEmailList = paymentEmails.map((doc) => doc.userEmail);

      // Combine the lists and remove duplicates
      const uniqueNewsletterEmails = Array.from(new Set(newsletterEmailList));
      const uniquePaymentEmails = Array.from(new Set(paymentEmailList));

      const newsletterSubscriberCount = uniqueNewsletterEmails.length;
      const paidSubscriberCount = uniquePaymentEmails.length;

      // Format the data
      const result = [
        {
          name: "Newsletter",
          subscriber: newsletterSubscriberCount,
        },
        {
          name: "Paid",
          subscriber: paidSubscriberCount,
        },
      ];

      res.send(result);
    });

    app.get("/all-newsletter-subscriber", async (req, res) => {
      const result = await newsletterCollection.find().toArray();
      res.send(result);
    });
    app.delete("/delete-trainer/:email", async (req, res) => {
      const query = { email: req.params.email };
      const result = await trainersCollection.deleteOne(query);
      const changeRole = await usersCollection.updateOne(query, {
        $set: {
          role: "member",
        },
      });
      res.send([result, changeRole]);
    });

    app.post("/add-new-class", async (req, res) => {
      const classData = req.body;
      const result = await classesCollection.insertOne(classData);
      res.send(result);
    });

    // regular api
    app.post("/insert-newsletter-email", async (req, res) => {
      const data = req.body;
      const result = await newsletterCollection.insertOne(data);
      res.send(result);
    });
    app.get("/classes", async (req, res) => {
      try {
        // Connect to the MongoDB client

        // Get all class documents
        const classes = await classesCollection.find().toArray();

        // For each class, look up trainer details
        const classDetails = await Promise.all(
          classes.map(async (classDoc) => {
            const trainerIds = classDoc.trainers.map((id) => new ObjectId(id));
            const trainerDetails = await trainersCollection
              .find({ _id: { $in: trainerIds } })
              .toArray();

            return {
              ...classDoc,
              trainers: trainerDetails,
            };
          })
        );

        res.send(classDetails);
      } catch (error) {
        console.error("Error fetching classes:", error);
        res.status(500).send("An error occurred while fetching classes.");
      }
    });

    app.get("/trainers", async (req, res) => {
      const result = await trainersCollection.find().toArray();
      res.send(result);
    });

    app.get("/trainer/:id", async (req, res) => {
      const id = req.params.id;
      const query = { _id: new ObjectId(id) };
      const result = await trainersCollection.findOne(query);
      res.send(result);
    });

    app.post("/add-new-users", async (req, res) => {
      const user = req.body;
      const email = user.email;

      const exist = await usersCollection.find({ email: email }).toArray();

      if (exist.length == 0) {
        const result = await usersCollection.insertOne(user);
        return res.send(result);
      }
      res.send({ message: "user exist already" });
    });

    // app.post("/bookSlot", async (req, res) => {
    //   const { trainerId, day, time, userEmail, trainer_email, price, className} = req.body;

    //   const result = trainersCollection.updateOne(
    //     {
    //       _id: new ObjectId(trainerId),
    //       "availableSlots.day": day,
    //       "availableSlots.time": time,
    //     },
    //     {
    //       $set: {
    //         "availableSlots.$.isBooked": true,
    //         "availableSlots.$.bookedBy": userEmail,
    //       },
    //     }
    //   );
    //   if (result.modifiedCount === 0) {
    //     return res.send(
    //       "No slots were updated. Please check the provided data."
    //     );
    //   }
    //   const paymentDetails = {
    //     userEmail, trainer_email, price,
    //   }
    //   const bookingDetails =

    //   res.status(200).send("Slot booked successfully");
    // });

    // app.post("/bookSlot", async (req, res) => {
    //   const {
    //     trainerId,
    //     day,
    //     time,
    //     userEmail,
    //     packageName,
    //     trainer_email,
    //     price,
    //     className,
    //   } = req.body;

    //   try {
    //     // Update the trainer's available slot
    //     const trainerUpdateResult = await trainersCollection.updateOne(
    //       {
    //         _id: new ObjectId(trainerId),
    //         "availableSlots.day": day,
    //         "availableSlots.time": time,
    //       },
    //       {
    //         $set: {
    //           "availableSlots.$.isBooked": true,
    //           "availableSlots.$.bookedBy": userEmail,
    //         },
    //       }
    //     );

    //     if (trainerUpdateResult.modifiedCount === 0) {
    //       return res
    //         .status(400)
    //         .send("No slots were updated. Please check the provided data.");
    //     }

    //     // Update the totalBookings in classCollection
    //     const classUpdateResult = await classesCollection.updateOne(
    //       { name: className },
    //       { $inc: { totalBookings: 1 } }
    //     );

    //     if (classUpdateResult.modifiedCount === 0) {
    //       return res
    //         .status(400)
    //         .send("Class not found. Booking count not updated.");
    //     }

    //     // Send success response
    //     res.status(200).send("Slot booked successfully");
    //   } catch (error) {
    //     console.error("Error booking slot: ", error);
    //     res.status(500).send("An error occurred while booking the slot.");
    //   }
    // });

    app.post("/bookSlot", async (req, res) => {
      const {
        trainerId,
        day,
        time,
        userEmail,
        packageName,
        trainer_email,
        price,
        className,
      } = req.body;

      try {
        // Update the trainer's available slot
        const trainerUpdateResult = await trainersCollection.updateOne(
          {
            _id: new ObjectId(trainerId),
            "availableSlots.day": day,
            "availableSlots.time": time,
          },
          {
            $set: {
              "availableSlots.$.isBooked": true,
              "availableSlots.$.bookedBy": userEmail,
            },
          }
        );

        if (trainerUpdateResult.modifiedCount === 0) {
          return res
            .status(400)
            .send("No slots were updated. Please check the provided data.");
        }

        // Update the totalBookings in classCollection
        const classUpdateResult = await classesCollection.updateOne(
          { name: className },
          { $inc: { totalBookings: 1 } }
        );

        if (classUpdateResult.modifiedCount === 0) {
          return res
            .status(400)
            .send("Class not found. Booking count not updated.");
        }

        // Retrieve the class document to get the class ID
        const classDocument = await classesCollection.findOne({
          name: className,
        });
        const classId = classDocument._id;

        // Add entry to paymentsCollection
        const paymentEntry = {
          trainerId: trainerId,
          classId: classId,
          amount: price,
          userEmail: userEmail,
        };
        const paymentInsertResult = await paymentsCollection.insertOne(
          paymentEntry
        );

        // Add entry to bookingsCollection
        const bookingEntry = {
          trainerId: trainerId,
          classId: classId,
          slotName: { day: day, time: time },
          package: packageName,
        };
        const bookingInsertResult = await bookingsCollection.insertOne(
          bookingEntry
        );

        // Send success response
        res.status(200).send("Slot booked successfully");
      } catch (error) {
        console.error("Error booking slot: ", error);
        res.status(500).send("An error occurred while booking the slot.");
      }
    });

    app.get("/check-role/:email", async (req, res) => {
      const email = req.params.email;
      const result = await usersCollection.findOne({ email: email });
      res.send(result.role);
    });
    app.patch("/be-a-trainer/:email", async (req, res) => {
      const { photourl, experience, specialization, availableSlots, bio } =
        req.body;
      const query = { email: req.params.email };
      const updateDoc = {
        $set: {
          image: photourl,
          specialization,
          availableSlots,
          experience,
          bio,
          certifications: ["certificate 1", "certificate 2"],
          trainer_applied: true,
          admin_feedback: false,
        },
      };

      const result = await usersCollection.updateOne(query, updateDoc);
      res.send(result);
    });

    app.get("/community-post", async (req, res) => {
      const result = await forumPostCollection.find().toArray();
      res.send(result);
    });

    // users dashboard api
    app.patch("/update-user", async (req, res) => {
      const { email } = req.body;
      const query = { email: email };
      const updateDoc = {
        $set: { name: req.body.name, image: req.body.url },
      };
      const result = await usersCollection.updateOne(query, updateDoc);
      res.send(result);
    });
    app.get("/get-user-info/:email", async (req, res) => {
      const email = req.params.email;
      const result = await usersCollection.findOne({ email: email });
      res.send(result);
    });
    app.get("/recommended-class", async (req, res) => {
      const result = await classesCollection
        .find()
        .sort({ totalBookings: -1 })
        .toArray();
      res.send(result);
    });
    app.get("/booked-slot/:email", async (req, res) => {
      const email = req.params.email;
      const result = await trainersCollection
        .aggregate([
          { $unwind: "$availableSlots" },
          {
            $match: {
              "availableSlots.bookedBy": email,
              "availableSlots.isBooked": true,
            },
          },
          {
            $project: {
              _id: 0,
              trainerName: "$name",
              trainerEmail: "$email",
              day: "$availableSlots.day",
              time: "$availableSlots.time",
              isBooked: "$availableSlots.isBooked",
              bookedBy: "$availableSlots.bookedBy",
            },
          },
        ])
        .toArray();
      res.send(result);
    });
    console.log(
      "Pinged your deployment. You successfully connected to MongoDB!"
    );
  } finally {
    // Ensures that the client will close when you finish/error
    //   await client.close();
  }
}
run().catch(console.dir);

app.get("/", (req, res) => {
  res.send("Last assignment");
});

app.listen(port, () => {
  console.log("Server is running on port", port);
});
