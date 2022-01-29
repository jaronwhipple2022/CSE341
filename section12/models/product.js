const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const productSchema = new Schema({
  title: {
    type: String,
    required: true
  },
  price: {
    type: Number,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  imageUrl: {
    type: String,
    required: true
  },
  userId: {
    type: Schema.Types.ObjectId,
    // referred to the name of the model
    ref: 'User',
    required: true
  }
});

//model connects a schema to a name
module.exports = mongoose.model('Product', productSchema);


// const mongodb = require('mongodb');
// const getDb = require('../util/database').getDb;

// class Product {
//   constructor(title, price, description, imageUrl, id, userId) {
//     this.title = title;
//     this.price = price;
//     this.description = description;
//     this.imageUrl = imageUrl;
//     this._id = id ? new mongodb.ObjectId(id) : null;
//     this.userId = userId
//   }

//   save() {
//     const db = getDb();
//     let dbOp;
//     if (this._id) {
//       //update
//       dbOp = db
//       .collection('products')
//       .updateOne({_id: this._id}, {$set: this});
//     } else {
//       // create
//       dbOp = db
//       .collection('products')
//       .insertOne(this);
//     }
//     return dbOp
//       .then(result => {
//         console.log(result);
//       })
//       .catch (err => 
//         console.log(err)
//       )};

//   static fetchAll() {
//     const db = getDb();
//     return db.collection('products').find().toArray()
//     .then(products => {
//       console.log(products);
//       return products;
//     })
//     .catch(err => 
//       console.log(err))
//     };

//   static findById(prodId) {
//     const db =getDb();
//     return db.collection('products')
//     .find({_id: new mongodb.ObjectId(prodId)})
//     .next()
//     .then(product => {
//       console.log(product);
//       return product;
//     })
//     .catch(err => {
//       console.log(err);
//     })
//   }

//   // static deletById(prodId) {
//   //   const db = getDb();
//   //   return db
//   //   .collection('products').deleteOne( {_id: new mongodb.ObjectId(prodId) })
//   //   .then(result => {
//   //     console.log('Deleted.');
//   //   })
//   //   .catch(err => {
//   //     console.log(err);
//   //   });
//   // }

//   // this method will also remove deleted items from any carts that may have them.
//   static deleteById(prodId, userId) {
//     const db = getDb();
//     return db
//       .collection('products')
//       .deleteOne({ _id: new ObjectId(prodId) })
//       .then((result) => {
//         return db.collection('users').updateOne(
//           { _id: new ObjectId(userId) },
//           {
//             $pull: {
//               'cart.items': { productId: new ObjectId(prodId) },
//             },
//           }
//         );
//       })
//       .then((result) => {
//         console.log('Cart Item Deleted');
//       })
//       .then(() => {
//         console.log('Product Deleted');
//       });
//   }
  
// }

// module.exports = Product;
