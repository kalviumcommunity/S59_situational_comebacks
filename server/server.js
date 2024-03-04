const express = require('express');
const routes = require('./routes');
const cors = require('cors')
const app = express();


app.use(cors())
app.use(express.json());
// mounting our routs
app.use('/api', routes);

const port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});