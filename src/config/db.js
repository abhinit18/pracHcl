const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/testdb', {
    
useNewUrlParser: true
}).then(() => {
    console.log("Successfully connected to the database");
}).catch((err) =>{
    console.log("Could not connect with database", err);
});

mongoose.set('useCreateIndex',true);
  