const express = require('express');
const cors = require('cors');

const app = express();

const port = 3200;

app.use(cors());

app.use('/api', require('./routes/ml'));

app.listen(port, () => {
	console.log(`Example app listening at http://localhost:${port}`);
});
