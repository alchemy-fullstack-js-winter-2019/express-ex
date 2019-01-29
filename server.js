//NOTE: sets the server
const app = require('./lib/app');

app.get('/', (req, res)=> {
  res.end('hi');
});

app.get('/another', (req, res)=> {
  res.send('another one');
});

app.listen(7890, () => {  
});
