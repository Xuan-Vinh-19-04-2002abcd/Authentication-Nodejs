import { Sequelize } from 'sequelize';

const sequelize = new Sequelize({
  dialect: 'mysql',
  host: 'localhost',
  port: 3306,
  database: 'nodebasic',
  username: 'root',
  password: '',

});

async function testConnection() {
  try {
    await sequelize.authenticate();
    console.log('Kết nối thành công đến cơ sở dữ liệu');
  } catch (error) {
    console.error('Không thể kết nối đến cơ sở dữ liệu:', error);
  }
}

export { sequelize, testConnection };
