const mongoose = require("mongoose");

            // We will define a schema(database) as shown below
            const employeeSchema = new mongoose.Schema({
                firstname: {
                    type:String,
                    required:true
                },
                lastname: {
                    type:String,
                    required:true
                },
                email: {
                    type:String,
                    required:true,
                    unique:true,
                },
                gender: {
                    type:String,
                    required:true,
                },
                phone: {
                    type:Number,
                    required:true,
                    unique:true
                },
                age: {
                    type:Number,
                    required:true,
                },
                password: {
                    type:String,
                    required:true,
                },
                confirmpassword: {
                    type:String,
                    required:true,
                }
            })
            // Let us now create a collection
            // first create a model
            const Register = new mongoose.model("Register", employeeSchema);

            // Now let us export this model
            module.exports = Register;

