import mongoose from 'mongoose';
import Employee from './EmployeeModel.js';

const gymbranchSchema = new mongoose.Schema(
  {
    // mangerId
    name: {
      type: String,
      default: 'El Amagros EL',
    },
    gymLevel: {
      type: String,
      enum: {
        values: ['junior', 'pro', 'delux'],
        message: 'gymLevel is either: junior,pro,delux',
      },
    },

    email: {
      type: String,
      required: [true, 'gym email is required'],
      unique: true,
      lowercase: true,
    },
    gymLocation: {
      type: {
        type: String,
        default: 'Point',
        enum: ['Point'],
      },
      coordinates: [Number],
      address: String,
      description: String,
    },
    employees: Array,
    isDeleted: {
      type: Boolean,
      default: 0,
    },
    createdBy: {
      type: String,
    },
    updatedBy: {
      type: String,
    },
  },
  { timestamps: true }
);

// EMBEDDING APPROACH -- only works for saving and not updating.
// gymbranchSchema.pre('save', async function (next) {
//   const employeePromises = this.employees.map(
//     async (id) => await Employee.findById(id)
//   );
//   this.employees = await Promise.all(employeePromises);

//   next();
// });

const GymBranch = mongoose.model('gymbranches', gymbranchSchema);

export default GymBranch;

/**
 * Create Gym branch
 * {
    "gymLevel":"junior",
    "address":"Bulacan",
    "email":"bulacanamagrosss@email.com",
    "gymLocation":{
        "description":"Manila, Philippines",
        "type":"Point",
        "coordinates":[14.78629462113481, 121.07543091931124],
        "address":"Quirino Hwy, San Jose del Monte City, 3023 Bulacan"
    }

}
 */
