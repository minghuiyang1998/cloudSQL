import MySQL from './MySQL';
import Postgres from './Postgres';

export const config = [
  MySQL,
  Postgres,
];

export const drivers = () => config.map((i) => i.meta);
