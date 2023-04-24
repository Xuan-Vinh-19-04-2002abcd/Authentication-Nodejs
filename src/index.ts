import express from "express";
import dotenv from 'dotenv';
import router from "./route/api";
import bodyParser = require("body-parser");
import { sequelize, testConnection } from '../connection';
dotenv.config();
const app = express();
const port = process.env.PORT || 3000;
app.use(bodyParser.json()); 
app.use(bodyParser.urlencoded({ extended: true }));

app.use("/", router);

app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});
async function startApp() {
  try {
    await testConnection();

    // Thực hiện các hành động khác trong ứng dụng của bạn
  } catch (error) {
    console.error('Không thể kết nối đến cơ sở dữ liệu:', error);
  }
}
startApp();