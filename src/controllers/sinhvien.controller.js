const httpStatus = require('http-status');
const pick = require('../utils/pick');
const ApiError = require('../utils/ApiError');
const catchAsync = require('../utils/catchAsync');
const { sinhvienService } = require('../services');

const createSinhVien = catchAsync(async (req, res) => {
  const sinhvien = await sinhvienService.createSinhVien(req.body);
  res.status(httpStatus.CREATED).send(sinhvien);
});

const getSinhViens = catchAsync(async (req, res) => {
  const filter = pick(req.query, ['name', 'role']);
  const options = pick(req.query, ['sortBy', 'limit', 'page']);
  const result = await sinhvienService.querySinhViens(filter, options);
  res.send(result);
});

const getSinhVien = catchAsync(async (req, res) => {
  const sinhvien = await sinhvienService.getSinhVienById(req.params.sinhvienId);
  if (!sinhvien) {
    throw new ApiError(httpStatus.NOT_FOUND, 'SinhVien not found');
  }
  res.send(sinhvien);
});

const updateSinhVien = catchAsync(async (req, res) => {
  const sinhvien = await sinhvienService.updateSinhVienById(req.params.sinhvienId, req.body);
  res.send(sinhvien);
});

const deleteSinhVien = catchAsync(async (req, res) => {
  await sinhvienService.deleteSinhVienById(req.params.sinhvienId);
  res.status(httpStatus.NO_CONTENT).send();
});

module.exports = {
  createSinhVien,
  getSinhViens,
  getSinhVien,
  updateSinhVien,
  deleteSinhVien,
};
