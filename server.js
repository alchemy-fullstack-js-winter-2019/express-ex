const app = require('./lib/app');

app.get('/', (req, res)=> {
  res.end('hi');
});
app.get('/another', (req, res)=> {
  res.send('antoher');
});

app.listen(7890, () => {
  console.log('running');
  
});
