import express from 'express';

const app = express();

app.get('/version', (_req, res) => {
  res.send('1');
});

export default app;