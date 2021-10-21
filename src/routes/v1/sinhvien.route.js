const express = require('express');
const sinhvienController = require('../../controllers/sinhvien.controller');

const router = express.Router();

router
  .route('/')
  .post(sinhvienController.createSinhVien)
  .get(sinhvienController.getSinhViens);

router
  .route('/:sinhvienId')
  .get(sinhvienController.getSinhVien)
  .patch(sinhvienController.updateSinhVien)
  .delete(sinhvienController.deleteSinhVien);

module.exports = router;

