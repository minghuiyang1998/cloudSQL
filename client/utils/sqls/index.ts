/* eslint-disable consistent-return */
import MySQL from './MySQL';
import Postgres from './Postgres';
import MongoDB from './MongoDB';
import { getStore } from '../../store';

const getSQLMaker = (type) => {
  let maker = null;
  switch (type) {
  case 'MySQL':
    maker = MySQL;
    break;
  case 'Postgres':
    maker = Postgres;
    break;
  case 'MongoDB':
    maker = MongoDB;
    break;
  default:
    break;
  }
  return maker;
};

export const selectAll = (tableName = '') => {
  const store = getStore();
  const { connection = {} } = store.app || {};
  const { type = '' } = connection || {};
  const maker = getSQLMaker(type);
  if (!maker) return;
  return maker.selectAll(tableName);
};

export function selectColumn(tableName = '', columnName = '') {
  const store = getStore();
  const { connection = {} } = store.app || {};
  const { type = '' } = connection || {};
  const maker = getSQLMaker(type);
  if (!maker) return;
  return maker.selectColumn(tableName, columnName);
}
