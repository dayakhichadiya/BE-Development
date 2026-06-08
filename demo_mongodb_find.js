let MongoClient = require('mongodb').MongoClient;
let url = "mongodb://127.0.0.1:27017/ecommerce";

MongoClient.connect(url, function(err, db) {
  if (err) throw err;
  let dbo = db.db("ecommerce");
  dbo.collection("Users").find({}).toArray(function(err, result) {
    if (err) throw err;
    console.log(result);
    db.close();
  });
});