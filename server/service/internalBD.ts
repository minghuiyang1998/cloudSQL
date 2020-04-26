import { query } from '../utils/connectDB';

async function selectAllData() {
  const sql = 'SELECT * FROM my_table';
  const dataList = await query(sql);
  return dataList;
}

async function getData() {
  const dataList = await selectAllData();
  console.log(dataList);
}

getData();