// eslint-disable-next-line @typescript-eslint/no-var-requires
const express = require('express');
const app = express();
const PORT = 3001;

app.use('/Final-Project', express.static('build'));

app.listen(PORT, () => {
  console.log(`http://localhost:${PORT}/Final-Project`);
});
