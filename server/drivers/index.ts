import MySQL from './MySQL';
import Postgres from './Postgres';
import MongoDB from './MongoDB';

export const driversConfig = {
  MySQL,
  Postgres,
  MongoDB,
};

const list = [
  MySQL,
  Postgres,
  MongoDB,
];

export const drivers = () => list.map((i) => i.meta);
