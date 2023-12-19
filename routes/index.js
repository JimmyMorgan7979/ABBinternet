var express = require('express');
var router = express.Router();

const nodemailer = require('nodemailer')

//Load DB Models
//const Contact = require('../models/Contact')
//const Product = require('../models/Product')

/* GET home page. */
router.get('/', function(req, res,error) {
  res.render('home', {banner: 'Home',error: false})
});


// Search Results Page
router.post('/results',function(req,res,error){
  res.render('results', {banner: 'Results',error: false})
})

// Result to contact
router.post('/addQuote',function(req,res,error){
  var item = req.body
  console.log(item.service)
  res.render('contact',{banner: 'Submit Quote',error: false, item})
})

// Contact Page 
router.get('/contact',function(req,res,error){
  var item =''
  res.render('contact',{banner:'Contact Us', error:false,item})
})

// Contact Submit
router.post('/addContact', (req, res, error) => {
  console.log(req.body)
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
      to: 'thetvdoctor66@gmail.com', // list of receivers
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
      console.log('Message sent: %s', info.messageId) 
      console.log('Preview URL: %s', nodemailer.getTestMessageUrl(info))

      res.render('addContact',{banner:'Email has been sent', error: false})
  })
  })

// Parts/Spares Page 
router.get('/partsSpares',function(req,res,error){
  res.render('partsSpares',{banner:'Parts/Spares/Consumables', error:false})
})

// Repair Page 
router.get('/repairs',function(req,res,error){
  res.render('repairs',{banner:'Repairs', error:false})
})

// Exchanges Page 
router.get('/Exchanges',function(req,res,error){
  res.render('exchanges',{banner:'Exchanges', error:false})
})

// Reman Page 
router.get('/reman',function(req,res,error){
  res.render('reman',{banner:'Remanfactured Units', error:false})
})

// Test and cert page
router.get('/testCert',function(req,res,error){
  res.render('testCert',{banner:'Test and Certify', error:false})
})

// GE legacy drives Page 
router.get('/geLegacyDrives',function(req,res,error){
  res.render('geLegacyDrives',{banner:'GE Legacy Drives', error:false})
})

// AC/DC Drives Page 
router.get('/ACDCDrives',function(req,res,error){
  res.render('acdcDrives',{banner:'AC/DC Drives', error:false})
})

// AC/DC Drives Page 
router.get('/innovationDrives',function(req,res,error){
  res.render('innovationDrives',{banner:'GE Innovation Drives', error:false})
})

// DC300 Drives Page 
router.get('/dc300',function(req,res,error){
  res.render('dc300',{banner:'GE DC300/285/100 Drives', error:false})
})

module.exports = router;
