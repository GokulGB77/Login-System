var express = require("express");
var router = express.Router();
const credential = {
  email: "admin@g.c",
  password: "admin123"
}

router.get('/',(req,res)=>{
  if(!req.session.user){
    res.render('base',{title:"Login page",message:req.flash()})
  }else{
    res.redirect("/dashboard")
  }
})


// login user
router.post('/login', (req, res) => {
  if (req.body.email !== credential.email &&
    req.body.password !== credential.password) {
    req.flash("error", "Invalid Credentials..!");
    return res.redirect("/")
  } else if (req.body.email === credential.email &&
    req.body.password === credential.password) {
    req.session.user = req.body.email;
    res.redirect('/dashboard');
    //res.end("Login Successful");
  } else if(req.body.email !== credential.email){
    req.flash("error", "Invalid Username..!")
    return res.redirect("/")
  } else if(req.body.password !== credential.password){
    req.flash("error", "Invalid Password..!")
    return res.redirect("/")
  } else{
    req.flash("error", "User Not Found !")
  }
});


// router for dashboard
router.get('/dashboard',(req, res) =>{
  if(req.session.user){
    res.render('dashboard',{user : req.session.user});
  } else {
    // req.send("Unauthorised User");
    res.redirect("/");
  }
})

//router for logout
router.get('/logout', (req, res)=>{
  req.session.destroy(function(err){
    if(err){
      console.log(err);
      res.send("Error");
    } else{
      // res.render('base',{'title':"Express",'logout':"Logged Out Successfully"})
      res.redirect("/");
    }
  })
})

module.exports= router;