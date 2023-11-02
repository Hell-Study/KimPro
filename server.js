const express = require('express');
const app = express();
const PORT = 8080;

app.use('/Final-Project', express.static('build'));

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}/Final-Project`);
});
