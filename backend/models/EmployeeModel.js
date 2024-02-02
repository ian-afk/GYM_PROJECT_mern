import mongoose from 'mongoose';
import validator from 'validator';

const employeeSchema = new mongoose.Schema(
  {
    firstName: {
      type: String,
      required: [true, 'Employee firstName required'],
      trim: true,
      maxlength: [50, 'A firstName must have less or equal than 50 characters'],
      validate: [validator.isAlpha, 'First name must only contains character'],
    },
    lastName: {
      type: String,
      required: [true, 'Employee lastName required'],
      trim: true,
      maxlength: [50, 'A last name must have less or equal than 50 characters'],
      validate: [validator.isAlpha, 'last name must only contains character'],
    },
    age: {
      type: Number,
      required: [true, 'Employee age is required'],
      min: [18, 'Age of employee must be above 18'],
    },
    dob: {
      type: Date,
      required: [true, 'Employee dob is required'],
      min: '1980-01-01',
      max: '3000-01-01',
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
    toJSON: { virtuals: true },
  }
);
employeeSchema.virtual('birthDate').get(function () {
  function formatDate(date) {
    const m = date.getMonth() + 1 + '';
    const d = date.getDay() + '';
    const y = date.getFullYear();
    const month = m.length > 1 ? `${m}` : `0${m}`;
    const day = d.length > 1 ? `${d}` : `0${d}`;
    return `${y}-${month}-${day}`;
  }
  const birthDate = formatDate(this.dob);
  return birthDate;
});

// QUERY MIDDLEWARE

employeeSchema.pre(/^find/, function (next) {
  this.find({ isDeleted: { $ne: true } });
  next();
});

// employeeSchema.post(/^find/, function (docs, next) {
//   console.log(`Query took ${Date.now() - this.start} milliseconds`);
//   next();
// });

const Employee = mongoose.model('Employee', employeeSchema);
export default Employee;
