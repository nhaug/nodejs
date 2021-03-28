const http = require('http');

const hostname = '127.0.0.1';
const port = 3000;

//noch ein Kommentar
console.log(module); 

process.argv.forEach((val, index) => {
  console.log(`${index}: ${val}`)
})

const server = http.createServer((req, res) => {
  res.statusCode = 200;
  res.setHeader('Content-Type', 'text/plain');
  res.end('Hello World, really');
});

server.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
});