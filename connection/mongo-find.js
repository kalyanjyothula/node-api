const { MongoClient } = require("mongodb");

MongoClient.connect("mongodb://localhost:27017/", (err, client) => {
  if (err) {
    return console.log("unable to connect the db");
  }
  console.log("db connected !");
  const db = client.db("Sampledb");
  db.collection("users")
    .find()
    .toArray()
    .then(list => {
      console.log("Data Base !");
      console.log(JSON.stringify(list, undefined, 2));
    })
    .catch(err => {
      console.log("error occured !", err);
    });
  db.close();
});
