const express = require('express');
const cryptoRoutes = require('./routes/cryptoRoutes');
const bodyParser = require('body-parser');

const app = express();
app.use(bodyParser.json({ limit: '50mb' })); // Parse incoming JSON requests
app.use(
   bodyParser.urlencoded({
      limit: '50mb',
      extended: true,
      parameterLimit: 50000,
   }),
);

app.use('/crypto', cryptoRoutes);

const PORT = process.env.PORT || 3002;
app.listen(PORT, () => {
   console.log(`Server is running on port ${PORT}`);
});
