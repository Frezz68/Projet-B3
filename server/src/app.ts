import 'reflect-metadata';
import express from 'express';
import API_V1_ROUTER from "./routes";
import { createConnection } from 'typeorm';

const app = express();
const port = process.env.PORT || 3000;
const prefix = '/api/v1';

createConnection()
    .then(() => {
        console.log('Connected to database');
    })
    .catch((error: any) => console.log('Error connecting to database:', error));

app.use(prefix,API_V1_ROUTER);

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port+prefix}`);
});