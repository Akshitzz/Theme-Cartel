import express from 'express';
import cors from 'cors';
import mongoose from 'mongoose';
import jwt from 'json-web-token';
import axios from 'axios';

const app = express();
app.use(cors());
app.use(express.json());    


app.listen(5000, () => {
    console.log('Server is running on port 5000');
});