const mongoose = require('mongoose');
const { toJSON, paginate } = require('./plugins');

const lopSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    numberStudent: {
      type: String,
      required: true,
      trim: true,
    },
  },
  {
    timestamps: true,
  }
);

// add plugin that converts mongoose to json
lopSchema.plugin(toJSON);
lopSchema.plugin(paginate);

/**
 * @typedef Lop
 */
const Lop = mongoose.model('Lop', lopSchema);

module.exports = Lop;
