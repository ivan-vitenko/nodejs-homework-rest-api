const app = require('../app');
const db = require('../model/db');
const fs = require('fs').promises;
const path = require('path');
require('dotenv').config();

const createFolderIsExist = require('../helpers/create-dir');

const PORT = process.env.PORT || 3000;

db.then(() => {
  app.listen(PORT, async () => {
    const UPLOAD_DIR = process.env.UPLOAD_DIR;
    const AVATARS_OF_USERS = process.env.AVATARS_OF_USERS;
    await createFolderIsExist('public');
    await createFolderIsExist(UPLOAD_DIR);

    const imageFolder = path.join(`${__dirname}/../public`, AVATARS_OF_USERS);
    await createFolderIsExist(imageFolder);

    console.log(`Server running. Use our API on port: ${PORT}`);
  });
}).catch(err => {
  console.log(`Server not running. Error message: ${err.message}`);
  process.exit(1);
});
