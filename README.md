<h1> Simple Inventory Tracking Web Application </h1>

<h2> Concept </h2>
<h3> Schema of Inventory Item </h3>

- name: String
- quantity: Number
- description: String
- isDeleted: Boolean
- deletionComment: String
  
<h3> Implemented feature: When deleting, allow deletion comments and undeletion </h3>
  
- I have added the isDeleted variable to the schema of the Inventory Item, this variable accepts a Boolean as a value. When an Inventory Item is deleted, the isDeleted variable is assigned the Boolean true, this makes the Inventory Item disappear from the Inventory Table. In reality, the Inventory Item is not deleted from the database, it is just not shown to the user. 
- During UnDeletion, the isDeleted variable is set to false, hence, the Inventory Item reappears on the Inventory Items Table.
  
<h3> Basic CRUD Functionality </h3>

- Create an Inventory Item.
- View all Inventory Items.
- Update an Inventory Item.
- Delete an Inventory Item (As explained above, does not actually delete the Inventory Item from the database, only sets the isDeleted variable to true).
- UnDelete an Inventory Item.


<h2> How to run the application </h2>

1. Clone the repostory
2. Run the following commands in a command-line shell from the root directory of the repository:
   1. npm install
   2. node app.js

<h2> Tech Stack: </h2>

- JavaScript
- CSS
- HTML
- MongoDB (MongoDB Atlas)
- Mongoose
- Embedded JavaScript templates (EJS)
