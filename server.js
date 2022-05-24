const express = require('express');
const mongoose = require('mongoose');

const app = express();
const PORT = process.env.PORT || 3001;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));

app.use(require('./routes'));

mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost/yilin-socialnetworkapi', {
  useFindAndModify: false,
  useNewUrlParser: true,
  useUnifiedTopology: true
});

// Log Mongo queries that are being executed
mongoose.set('debug', true);

app.listen(PORT, () => console.log(`✅ Connected on localhost:${PORT} 🌐`));