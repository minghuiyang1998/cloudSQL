import { createConnection } from 'typeorm';

export const mysql = () => {
    return new Promise<any> ((resolve, reject)=> {
        createConnection() .then(async connection => {
            resolve(connection)
        }) .catch(error => reject(error));
    })
}