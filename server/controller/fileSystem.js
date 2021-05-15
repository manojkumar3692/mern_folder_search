import fs from 'fs';
import path from 'path';

export const getSystemInfo = (req, res) => {
    fs.readdir('/', (err, files) => {
       let list = files.filter(item => !(/(^|\/)\.[^\/\.]/g).test(item));
        res.status(200).send({status: 'sucess', data: list})
    });
}

export const getSystemDir = (req, res) => {
    console.log('print me ', req.body)
    // const result = []
    // const fileDetails = []
    // fs.readdir('/', (err, files) => {
    //     files.forEach(file => {
    //         fs.stat('/'+file, (err, file) => {
    //             console.log(file)
    //         })
    //         result.push({name: file})
    //     });
    //     res.json([...result])
    // });

    // const result = []
    // var path = '/';
 
    // fs.readdir(path, function(err, items) {
    //     for (var i=0; i<items.length; i++) {
    //         var file = path + '/' + items[i];
    //         console.log("Start: " + file);
    //         fs.stat(path + file, async function(err, stats) {
    //            await result.push({name: 'file'})
    //         });
    //     }
    //     res.json([...result])
    // });

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



