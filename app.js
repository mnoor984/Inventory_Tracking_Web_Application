//jshint esversion:6
const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");

const app = express();
app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));

mongoose.connect("mongodb+srv://admin-omar:test123@cluster0.2fsfx.mongodb.net/inventoryDB");
// mongoose.connect("mongodb://localhost:27017/inventoryDB");

const itemsSchema = {
    name: String,
    quantity: Number,
    description: String,
    isDeleted: Boolean,
    deletionComment: String
  };

const Item = mongoose.model("Item", itemsSchema);



// --------------- View all inventory items ------------------ // 
app.route("/")
.get((req,res) => {
  res.redirect("/items");
});

app.route('/items')
  .get((req, res) => {
    Item.find({isDeleted: false}, function(err ,foundItems) {
      if (!err) {
        res.render("items",{itemsList: foundItems} );
      } else {
        res.send(err);
      }
    });
  });

// --------------- Create a single inventory item ------------------ // 
  app.route("/items")
  .post((req, res) => {
    const item = new Item ({
      name: req.body.name,
      quantity: req.body.quantity,
      description: req.body.description,
      isDeleted: false
    });
  
    item.save(function(err) {
      if(!err) {
        res.redirect("/items");
      } else {
        res.send(err);
      }
    });
  });

// ----------------- Update an inventory item. -------------------------- //
app.route('/items/update')
.post((req, res) => {
  
  Object.keys(req.body).forEach(key => {
    if (req.body[key] === '') {
      delete req.body[key];
    }
  });

  Item.updateOne(
    {_id: req.body.Id},
    {$set: req.body},
    function(err) {
      if(!err) {
        res.redirect("/items");
      } else {
        console.log(err);
      }
    }
  );
});

// --------------- Delete an inventory item. ------------------ // 
  app.route('/items/delete')
  .post((req,res) => {
    Item.updateOne(
      {_id: req.body.itemId},
      {$set: {
        deletionComment: req.body.deletionComment,
        isDeleted: true
      }},
      function(err) {
        if(!err) {
          res.redirect("/items");
        } else {
          console.log(err);
        }
      }
    );
  });

  // --------------- View all deleted inventory items ------------------ // 
  app.route('/deletedItems')
  .get((req, res) => {
    Item.find({isDeleted: true}, function(err ,foundItems) {
      if (!err) {
        res.render("deletedItems",{itemsList: foundItems} );
      } else {
        res.send(err);
      }
    });
  });

  // ----------------- UnDelete an inventory item. -------------------------- //
  app.route('/items/unDelete')
  .post((req,res) => {
    Item.updateOne(
      {_id: req.body.itemId},
      {$set: {
        deletionComment: "",
        isDeleted: false
      }},
      function(err) {
        if(!err) {
          res.redirect("/deletedItems");
        } else {
          console.log(err);
        }
      }
    );
  });

  
let port = process.env.PORT;
if (port == null || port == "") {
port = 3000;
}

app.listen(port, function() {
    console.log("Server started on port " + port);
  });

