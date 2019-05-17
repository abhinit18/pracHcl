const mongoose = require('mongoose');

const UserSchema = mongoose.Schema({
   user_id : mongoose.Schema.Types.ObjectId,
   name:{
       type: String,
       required: [true, "Name field is required"]
   },

   email: {
       required: [true, "Email field is required"],
       type: String,
       unique: true,
       match: /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/
   },

   phone: {
       required: [true, "Phone Number is required"],
       type: Number 
   },

   password: {
       type: String,
       required: [true, "Password field is required"],
   },

   role: {
       type: String,
       required: [true, "Role field is required"],
   }

},
{
   timestamps: true
});

module.exports = mongoose.model('User', UserSchema);

