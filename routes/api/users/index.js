const express = require('express');
const router = express.Router();

const guard = require('../../../helpers/guard');
const upload = require('../../../helpers/upload');

const {
  validateReg,
  validateLogin,
  validateUploadAvatar,
} = require('./validation');
const { createAccountLimiter } = require('../../../helpers/rate-limit-reg');

const userController = require('../../../controllers/users');

router.post(
  '/auth/register',
  createAccountLimiter,
  validateReg,
  userController.reg,
);
router.post('/auth/login', validateLogin, userController.login);
router.post('/auth/logout', guard, userController.logout);
router.get('/current', guard, userController.current);

router.patch(
  '/avatars',
  [guard, upload.single('avatarURL'), validateUploadAvatar],
  userController.avatars,
);

module.exports = router;
