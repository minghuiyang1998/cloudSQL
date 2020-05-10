import MySQL from './MySQL';
import Postgres from './Postgres';

export const driversConfig = {
  MySQL,
  Postgres,
};

const list = [
  MySQL,
  Postgres,
];

export const drivers = () => list.map((i) => i.meta);
