const http = require('http');

const hostname = '127.0.0.1';
const port = 3000;

//noch ein Kommentar

process.argv.forEach((val, index) => {
  console.log(`${index}: ${val}`)
})

console.log({"name":"Nils","last":"Haug"});

console.log("My Name is %s and i'm %d years old","nils",29);
console.log("%o",Number);

const server = http.createServer((req, res) => {
  res.statusCode = 200;
  res.setHeader('Content-Type', 'text/plain');
  res.end('Hello World');
});

server.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
});
