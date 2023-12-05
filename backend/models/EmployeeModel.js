import mongoose from 'mongoose';

const employeeSchema = new mongoose.Schema(
  {
    firstName: {
      type: String,
      required: [true, 'Employee firstName required'],
    },
    lastName: {
      type: String,
      required: [true, 'Employee lastName required'],
    },
    age: {
      type: Number,
      required: [true, 'Employee age is required'],
    },
    dob: {
      type: Date,
      required: [true, 'Employee dob is required'],
    },
    gender: {
      type: String,
      required: [true, 'Employee gender is required'],
      enum: {
        values: ['male', 'female'],
        message: 'Gender is either: male or female',
      },
    },
    address: {
      type: String,
      required: [true, 'Employee address is required'],
    },
    email: {
      type: String,
      required: [true, 'Employee email is required'],
      unique: true,
      lowercase: true,
    },
    isActive: {
      type: Boolean,
      default: 1,
      // select:false, //uncomment after the development
    },
    isDeleted: {
      type: Boolean,
      default: 0,
      // select:false
    },
    created_by: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);

// QUERY MIDDLEWARE

employeeSchema.pre('find', function (next) {
  this.find({ isDeleted: { $ne: true } });
  next();
});

const Employee = mongoose.model('Employee', employeeSchema);
export default Employee;
