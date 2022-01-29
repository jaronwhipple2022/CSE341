// const { MongoClient } = require('mongodb');
// const uri = "mongodb+srv://JaronWhipple:fDf@R9aGyv5UrrS@cluster0.acauo.mongodb.net/nodejs?retryWrites=true&w=majority";
// const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });
// client.connect(err => {
//   const collection = client.db("test").collection("devices");
//   // perform actions on the collection object
//   client.close();
// });

//pw = fDf@R9aGyv5UrrS

const mongodb = require('mongodb');
const MongoClient = mongodb.MongoClient;

//variable to replace client in callback
let _db;
//method to connect
const mongoConnect = callback => {
  MongoClient.connect(
    'mongodb+srv://JaronWhipple:fDf%40R9aGyv5UrrS@Cluster0.acauo.mongodb.net/nodejs?retryWrites=true&w=majority',
     {useUnifiedTopology: true}
  )
    .then(client => {
      console.log('Connected');
      _db = client.db();
      callback();
    })
    .catch(err => {
      console.log(err);
      throw err;
    });
};

const getDb = () => {
  if (_db) {
    return _db;
  }
  throw 'no database found';
};

exports.mongoConnect = mongoConnect;
exports.getDb = getDb;

//methos to connect
// const mongoConnect = callback => {
//   const { MongoClient } = require('mongodb');
//   const uri = "mongodb+srv://JaronWhipple:fDf%40R9aGyv5UrrS@cluster0.acauo.mongodb.net/Cluster0?retryWrites=true&w=majority";
//   const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });
//   client.connect(err => {
//     const collection = client.db("nodejs").collection("Cluster0");
//     // perform actions on the collection object
//     console.log(err);
//     client.close();
//   });
// };






