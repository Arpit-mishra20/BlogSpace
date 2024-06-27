import multer from 'multer';
import mongoose from 'mongoose';
import Connection from '../../database/db.js';
import { GridFsStorage } from 'multer-gridfs-storage';
// import db from '../../database/db.js';
// import db from '../database/db.js';
// const db = require('./database/db.js'); 

const storage = new GridFsStorage({
    url: `mongodb://${Process.env.username}:${Process.env.password}@ac-np7yr7j-shard-00-00.g01fyj6.mongodb.net:27017,ac-np7yr7j-shard-00-01.g01fyj6.mongodb.net:27017,ac-np7yr7j-shard-00-02.g01fyj6.mongodb.net:27017/?ssl=true&replicaSet=atlas-xnpc0j-shard-0&authSource=admin&retryWrites=true&w=majority&appName=blog-app`,
    options: { useNewUrlParser: true },
    file: (request, file) => {
        const match = ["image/png", "image/jpg"];

        if(match.indexOf(file.memeType) === -1) 
            return`${Date.now()}-blog-${file.originalname}`;

        return {
            bucketName: "photos",
            filename: `${Date.now()}-blog-${file.originalname}`
        }
    }
});

export default multer({storage}); 