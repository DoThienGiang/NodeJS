const mongoose = require('mongoose');
const { toJSON, paginate } = require('./plugins');

const sinhvienSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    address: {
      type: String,
      required: true,
      trim: true,
    },
    age: {
      type: Number,
      required: true,
      trim: true,
    },
  
  },
  {
    timestamps: true,
  }
);

// add plugin that converts mongoose to json
sinhvienSchema.plugin(toJSON);
sinhvienSchema.plugin(paginate);

/**
 * @typedef SinhVien
 */
const SinhVien = mongoose.model('SinhVien', sinhvienSchema);

module.exports = SinhVien;
