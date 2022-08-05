require('dotenv/config');
require('./db');

const express = require('express');

const app = express();

require('./config')(app);

app.use('/api', require('./routes/index.routes'));
app.use('/api', require('./routes/auth.routes'));
app.use('/api', require('./routes/plan.routes'));
app.use('/api', require('./routes/post.routes'));


require('./error-handling')(app);

module.exports = app;
