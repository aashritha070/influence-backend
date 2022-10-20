let express = require('express');
let app = express();
const cors = require('cors')
const mongoose = require('mongoose');
const dotenv = require('dotenv');

//routes import
const authRoutes = require('./routes/authRoutes');
const authorRoutes = require('./routes/authorRoutes');
const blogRoutes = require('./routes/blogRoutes');
const tagRoutes = require('./routes/tagRoutes');

//middleware import
const authMiddleware = require("./middleware/authMiddleware")

dotenv.config();

app.use(express.json());

mongoose
  .connect(process.env.MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(console.log('connnected to Mongo'))
  .catch((err) => console.log(err));

app.use(cors());

app.use('/', authRoutes);
app.use('/author', authMiddleware, authorRoutes);
app.use('/post', authMiddleware, blogRoutes);
app.use('/tag', authMiddleware, tagRoutes);

app.listen(5000, () => {
  console.log('server listening on PORT', 5000);
});
