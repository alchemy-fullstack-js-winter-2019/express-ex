const app = require('./lib/app');

app.listen(7890, () => {
  console.log('server running');
});

app.get('/', (req, res) => {
  res.send('hi');
});

app.get('/another', (req, res) => {
  res.send('another hi');
});
