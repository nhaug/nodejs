const http = require('http');
const progress = require('progress');

const hostname = '127.0.0.1';
const port = 3000;

//noch ein Kommentar

process.argv.forEach((val, index) => {
  console.log(`${index}: ${val}`)
})



const bar = new progress(':bar', { total: 10 })
const timer = setInterval(() => {
  bar.tick()
  if (bar.complete) {
    clearInterval(timer)
  }
}, 100);

const server = http.createServer((req, res) => {
  res.statusCode = 200;
  res.setHeader('Content-Type', 'text/plain');
  res.end('Hello World'+ timer);
});

server.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
});
