const express = require('express');
const cryptoRoutes = require('./routes/cryptoRoutes');
const bodyParser = require('body-parser');

const app = express();
app.use(bodyParser.json()); // Parse incoming JSON requests

app.use('/crypto', cryptoRoutes);

const PORT = process.env.PORT || 3002;
app.listen(PORT, () => {
   console.log(`Server is running on port ${PORT}`);
});
