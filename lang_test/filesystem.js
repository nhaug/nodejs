const fs = require('fs');

fs.readdir('./', (err, files) => {
    if (err) console.log(err)
    else console.log(files);
})