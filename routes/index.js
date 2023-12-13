var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res,error) {
  res.render('home', {banner: 'Home',error: false})
});
// Search Results Page
router.get('/results',function(req,res,error){
  res.render('results', {banner: 'Results',error: false})
})

// Contact Page 
router.get('/contact',function(req,res,error){
  var item =''
  res.render('contact',{banner:'Contact Us', error:false,item})
})
// Contact Post page
router.post('/addContact',function(req,res,error){
  var item = req.body
  console.log(item)
  res.render('addContact',{banner:'',error:false})
})
// add quote to db
router.post('/addQuote',function(req,res,error){
  var item = req.body
  console.log(item.modelQuote)
  console.log(item.service)
  res.render('contact',{banner: 'Submit Quote',error:false,item})
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
