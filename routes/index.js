let express = require('express');
let router = express.Router();
const nodemailer = require('nodemailer')

//Load DB Models
const db = require('../models/db')

/* GET home page. */
router.get('/',(req, res,error)=>{
  res.render('home', {banner: 'Home'})
});

// Initial Search Results
router.post('/searchSelection', function(req,res) {
  var searchWord = req.body.searchWord;
   if(!searchWord){
      res.render('home',{banner: 'Home'});
   }else{
    sql = `SELECT * FROM models WHERE model_number like "%${searchWord}%" LIMIT 10`
    db.all(sql,[],(err,docs) => {
       if (err) return console.error(err.message);
        res.render('searchSelection',{banner:"Select Model", searchWord,docs})
      })
   }
  })

// Search Results Page
router.post('/results',(req,res,error)=>{
  var idSearch = req.body.id
  sql = `SELECT * FROM models WHERE id = "${idSearch}"`
  db.all(sql,[],(err,docs) => {
    if (err) return console.error(err.message);
    res.render('results', {banner: 'Results', docs, error: false})
   })
  
})

// Result to contact
router.post('/addQuote',(req,res,error)=>{
  let item = req.body
  res.render('contact',{banner: 'Submit Quote',error: false, item})
})

// Contact Page 
router.get('/contact',(req,res,error)=>{
  let item =''
  res.render('contact',{banner:'Contact Us', error:false,item})
})

// Contact Submit
router.post('/addContact', (req, res, error) => {
  const output = `
    <p>You have a new service request</p>
    <h3>Contact Details</h3>
    <ul>  
      <li>Name: ${req.body.name}</li>
      <li>Company: ${req.body.company}</li>
      <li>Email: ${req.body.email}</li>
      <li>Phone: ${req.body.phone}</li>
    </ul>
    <h3>Message</h3>
    <p>${req.body.message}</p>
  `
  // create reusable transporter object using the default SMTP transport
  let transporter = nodemailer.createTransport({
    host: 'smtp-mail.outlook.com',
    port: 587,
    secure: false, // true for 465, false for other ports
    auth: {
        user: 'louisville-website@outlook.com', // generated ethereal user
        pass: 'ABBlouisville240'  // generated ethereal password
    }
    // tls:{
    //   rejectUnauthorized:false
    // }
  })

  // setup email data with unicode symbols
  let mailOptions = {
      from: '"Nodemailer Contact" <louisville-website@outlook.com>', // sender address
      to: ['thetvdoctor66@gmail.com'], // list of receivers
      cc: 'thetvdoctor66@hotmail.com', // list of receivers
      subject: 'Service Request', // Subject line
      text: 'I need information about ABB in Louisville.', // plain text body
      html: output // html body
  }

  // send mail with defined transport object
  transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
          return console.log(error)
      }
      // console.log('Message sent: %s', info.messageId) 
      // console.log('Preview URL: %s', nodemailer.getTestMessageUrl(info))

      res.render('addContact',{banner:'Email has been sent', error: false})
  })
  })

// Parts/Spares Page 
router.get('/partsSpares',(req,res,error)=>{
  res.render('partsSpares',{banner:'Parts/Spares/Consumables', error:false})
})

// Repair Page 
router.get('/repairs',(req,res,error)=>{
  res.render('repairs',{banner:'Repairs', error:false})
})

// Exchanges Page 
router.get('/Exchanges',(req,res,error)=>{
  res.render('exchanges',{banner:'Exchanges', error:false})
})

// Reman Page 
router.get('/reman',(req,res,error)=>{
  res.render('reman',{banner:'Remanfactured Units', error:false})
})

// Test and cert page
router.get('/testCert',(req,res,error)=>{
  res.render('testCert',{banner:'Test and Certify', error:false})
})

// GE legacy drives Page 
router.get('/geLegacyDrives',(req,res,error)=>{
  res.render('geLegacyDrives',{banner:'GE Legacy Drives', error:false})
})

// AC/DC Drives Page 
router.get('/ACDCDrives',(req,res,error)=>{
  res.render('acdcDrives',{banner:'AC/DC Drives', error:false})
})

// AC/DC Drives Page 
router.get('/innovationDrives',(req,res,error)=>{
  res.render('innovationDrives',{banner:'GE Innovation Drives', error:false})
})

// DC300 Drives Page 
router.get('/dc300',(req,res,error)=>{
  res.render('dc300',{banner:'GE DC300/285/100 Drives', error:false})
})

//Turbine control page
router.get('/turbineControl',(req,res,error) => {
  res.render('turbineControl.ejs', {banner:"Turbine Control"})
})
module.exports = router;
