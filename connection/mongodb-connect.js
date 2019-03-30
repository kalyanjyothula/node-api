const { MongoClient } = require("mongodb");

MongoClient.connect("mongodb://localhost:27017/", (err, client) => {
  if (err) {
    return console.log("unable to connect data base");
  }
  console.log("data base connected successfully");
  const db = client.db("Sampledb");
  db.collection("users").insertOne(
    {
      name: "Sai",
      surname: "E",
      id: "R141081"
    },
    (err, result) => {
      if (err) {
        return console.log("unable to insert data to the database");
      }
      console.log(JSON.stringify(result.ops, undefined, 2));
    }
  );
  client.close();
});
