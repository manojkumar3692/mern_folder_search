import fs from 'fs';
import path from 'path';

export const getSystemInfo = (req, res) => {
    fs.readdir('/', (err, files) => {
       let list = files.filter(item => !(/(^|\/)\.[^\/\.]/g).test(item));
        res.status(200).send({status: 'sucess', data: list})
    });
}

export const getSystemDir = (req, res) => {
    var route = req.body.mainDir
    const files = fs.readdirSync(route, 'utf8');
    const response = [];
    for (let file of files) {
    const extension = path.join(route, file)
    const fileSizeInBytes = fs.statSync(path.join(route, file)).size;
    const fileDetails = fs.statSync(path.join(route, file));
    response.push({ name: file, extension, fileSizeInBytes, fileDetails});
    }
    res.status(200).send({status: 'success', data: [...response]}) 
}



