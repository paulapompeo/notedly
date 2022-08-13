const express = require('express');

const app = express();
const port = process.env.PORT || 4000;

app.get('/', (req, res) => res.send('hello baby!!!!!'));

app.listen(port, () => console.log(`Listening on port ${port}!`));
