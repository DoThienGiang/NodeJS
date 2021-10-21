const httpStatus = require('http-status');
const { SinhVien } = require('../models');
const ApiError = require('../utils/ApiError');

/**
 * Create a sinhvien
 * @param {Object} sinhvienBody
 * @returns {Promise<SinhVien>}
 */
const createSinhVien = async (sinhvienBody) => {
  return SinhVien.create(sinhvienBody);
};

/**
 * Query for sinhviens
 * @param {Object} filter - Mongo filter
 * @param {Object} options - Query options
 * @param {string} [options.sortBy] - Sort option in the format: sortField:(desc|asc)
 * @param {number} [options.limit] - Maximum number of results per page (default = 10)
 * @param {number} [options.page] - Current page (default = 1)
 * @returns {Promise<QueryResult>}
 */
const querySinhViens = async (filter, options) => {
  const sinhviens = await SinhVien.paginate(filter, options);
  return sinhviens;
};

/**
 * Get sinhvien by id
 * @param {ObjectId} id
 * @returns {Promise<SinhVien>}
 */
const getSinhVienById = async (id) => {
  return SinhVien.findById(id);
};

/**
 * Get sinhvien by email
 * @param {string} email
 * @returns {Promise<SinhVien>}
 */
const getSinhVienByEmail = async (email) => {
  return SinhVien.findOne({ email });
};

/**
 * Update sinhvien by id
 * @param {ObjectId} sinhvienId
 * @param {Object} updateBody
 * @returns {Promise<SinhVien>}
 */
const updateSinhVienById = async (sinhvienId, updateBody) => {
  const sinhvien = await getSinhVienById(sinhvienId);
  if (!sinhvien) {
    throw new ApiError(httpStatus.NOT_FOUND, 'SinhVien not found');
  }
  if (updateBody.email && (await SinhVien.isEmailTaken(updateBody.email, sinhvienId))) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'Email already taken');
  }
  Object.assign(sinhvien, updateBody);
  await sinhvien.save();
  return sinhvien;
};

/**
 * Delete sinhvien by id
 * @param {ObjectId} sinhvienId
 * @returns {Promise<SinhVien>}
 */
const deleteSinhVienById = async (sinhvienId) => {
  const sinhvien = await getSinhVienById(sinhvienId);
  if (!sinhvien) {
    throw new ApiError(httpStatus.NOT_FOUND, 'SinhVien not found');
  }
  await sinhvien.remove();
  return sinhvien;
};

module.exports = {
  createSinhVien,
  querySinhViens,
  getSinhVienById,
  getSinhVienByEmail,
  updateSinhVienById,
  deleteSinhVienById,
};
