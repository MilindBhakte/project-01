const express = require('express');
const fs = require('fs');
const mongoose =  require('mongoose');
 
const app = express();
const PORT = 8000;

//connection
mongoose
.connect('mongodb://localhost:27017/youtube-app-1')
.then(() => console.log('Connected to Mongobd'))
.catch((err) => console.log('chud gaya mongobd'));

//schema
const userSchema = new mongoose.Schema({
  company: {
    type: String,
    required:true,
  },
  firstName: {
    type: String,
    required:true,
  },
  lastName: {
    type: String,
    required:true,
  },
  phoneNo: {
    type: Number,
    required:true,
  },
  email:{
    type: String,
    required:true,
    unique: true,
  },
  webSite: {
    type: String,
  },
  industry: {
    type: String,
  },
  segment: {
    type: String,
  },
  country: {
    type: String,
  },
  state: {
    type: String,
  }, 
  city: {
    type: String,
  },
},
{ timestamps: true });

const user = mongoose.model('user',userSchema);

// Middleware
app.use(express.urlencoded({extended : false}));
app.use(express.json());

app.use((req, res, next) => {
    console.log("chal raha hai chud k tera code");
    next();
});

//ROUTE
app.get("/users", async (req,res) =>{
  const allDbUsers = await user.find({});
    const html= `
    <ul>
     ${allDbUsers.map((user) => `<li>${user.company } - ${user.firstName }</li>`).join("")}
    </ul>
    `;
    res.send(html);
})

// Rest API
app.get("/api/users", async(req,res) =>{
  const allDbUsers= await user.find({});
  return res.json(allDbUsers);
});
 

app.post("/api/users", async(req,res) => {
    const body = req.body;
    if(!body || 
      !body.company ||
      !body.first_name ||
      !body.last_name ||
      !body.phone_no ||
      !body.email ||
      !body.web_site ||
      !body.industry ||
      !body.segment ||
      !body.country ||
      !body.state ||
      !body.city
    ){
      return res.status(400).json({ msg : "Lode pura likh na"}); 
    }

    const result = await user.create({
      company: body.company,
      firstName: body.first_name,
      lastName: body.last_name,
      phoneNo: body.phone_no,
      email: body.email,
      webSite: body.web_site,
      industry: body.industry,
      segment: body.segment,
      country: body.country,
      state: body.state,
      city: body.city
    });


    return res.status(201).json({ msg : 'jam gaya chut k'})
    
});


app.listen(PORT, () => console.log('lode server started'));
