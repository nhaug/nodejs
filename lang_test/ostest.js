const os = require('os');

let totalMemory = os.totalmem();
let freeMemory = os.freemem();

console.log(`Total Mem: ${totalMemory}`);
console.log(`Total Mem: ${freeMemory}`);
