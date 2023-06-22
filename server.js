const express = require('express');
const app = express();
const path = require('path');
const authRoutes = require('./routes/auth');
const userActionsRoutes = require('./routes/userActions');
const nftDropRoutes = require('./routes/nftDrop');
const config = require('./config');

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(express.static(path.join(__dirname, 'public')));

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'html');

app.use('/auth', authRoutes);
app.use('/user-actions', userActionsRoutes);
app.use('/nft-drop', nftDropRoutes);

app.get('/', (req, res) => {
  res.render('index');
});

app.listen(config.PORT, () => {
  console.log(`Server running on port ${config.PORT}`);
});