const { MongoClient, ObjectID } = require("mongodb");

MongoClient.connect("mongodb://localhost:27017/", (err, Client) => {
  if (err) {
    return console.log("unable to connect mongo server ...");
  }
  console.log("mongo server connected ... ");
  const db = Client.db("Sampledb");

  db.collection("users")
    .findOneAndUpdate(
      { surname: "Jyothula" },
      {
        $set: {
          surname: "Jyothula",
        },
        $inc: {
            age: 1,
        }
      },
      {
        returnOriginal: false
      }
    )
    .then(result => console.log(result, "updated"))
    .catch(err => console.log(err));

    db.close();
});
