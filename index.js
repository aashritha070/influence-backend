let express = require('express');
let app = express();
const multer = require("multer");
const path = require("path");
const cors = require('cors')
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const authorization = require('./routes/authorization');
const existingUser = require('./routes/ExistingUser');
const Blog = require('./routes/Blog');
const tag = require('./routes/Tags.js');

dotenv.config();

app.use(express.json());
app.use("/coverPic", express.static(path.join(__dirname, "/coverPic")));

mongoose
  .connect(process.env.MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    
  })
  .then(console.log('connnected to Mongo'))
  .catch((err) => console.log(err));

const storage = multer.diskStorage({
  destination: (req, file, cb)=> {
    cb(null, "coverPic");
  },
  filename:  (req, file, cb) =>{
    cb(null, req.body.name)
  },
})
var upload = multer({ storage: storage })
app.post("/insert", upload.single("file"), (req, res) => {
  res.status(200).json("File has been uploaded successfuly");
});


app.use(cors());


app.get('/', (req, res) => {
  try {
    res.status(200).json({ message: 'Home Server' });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

app.use('/authorization', authorization);
app.use('/ExistingUser', existingUser);
app.use('/posts', Blog);
app.use('/Tag', tag);

app.listen(5000, () => {
  console.log('server listening on PORT', 5000);
});
