const { MongoClient } = require("mongodb");

MongoClient.connect("mongodb://localhost:27017/", (err, client) => {
  if (err) {
    return console.log("unable to connect server ... ");
  }
  console.log(" db server connected ... ");
  const db = client.db("Sampledb");
  //deleteMany
  /* db.collection("todos")
    .deleteMany({ name: "kalyan 123" })
    .then(result => {
      console.log(result, "success");
    })
    .catch(err => {
      console.log(err, "error msg");
    }); */
  // deleteOne;
  // db.collection("todos")
  //   .deleteOne({ surname: "J" })
  //   .then(result => {
  //     console.log(result);
  //   })
  //   .catch(err => {
  //     console.log(err, "Error");
  //   });
  // findeOnedelete;
  db.collection("users")
    .findOneAndDelete({ surname: "J" })
    .then(result => console.log(result))
    .catch(err => console.log(err));
  db.close();
});
