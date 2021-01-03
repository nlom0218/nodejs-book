const fs = require("fs");

const readStream = fs.createReadStream("./txt/readme4.txt");
const writeStream = fs.createWriteStream("./txt/write3.txt");
readStream.pipe(writeStream);
