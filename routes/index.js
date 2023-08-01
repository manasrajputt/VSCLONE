var express = require('express');
var router = express.Router();
var fs=require('fs');
const { type } = require('os');

/* GET home page. */
// router.get('/', function(req, res) {
//   res.render('index');
// });

router.get('/back', function(req, res) {
  res.redirect('/');
});

router.get('/', function(req, res) {
fs.readdir("./uploads",{withFileTypes:true},function(err,files){
  // console.log(files)
  if(err) res.send(err);
  else{
      res.render('index',{files:files});
    }
  })
})


router.get('/file/:filename',function(req,res){
  fs.readdir(`./uploads`,{withFileTypes:true},function(err,files){
    fs.readFile(`./uploads/${req.params.filename}`,"utf-8",function(err,data){
      res.render('opened',{files,filename:req.params.filename,data});
    })
  })
})

router.post(`/updatename/:oldname`,function(req,res){
  // console.log(req.params.oldname);
  // console.log(req.body.newname);
  fs.rename(`./uploads/${req.params.oldname}`,`./uploads/${req.body.newname}`,function(err){
    if(err) console.log(err)
    else res.redirect("/");
  })
})

router.post(`/update/:filename`,function(req,res){
  fs.writeFile(`./uploads/${req.params.filename}`,req.body.inputdata,function(err){
    res.redirect("back");
  })
})

router.get('/delete/:type/:filename',function(req,res){
  if(req.params.type === "folder")
  {
    fs.rmdir(`./uploads/${req.params.filename}`,function(err){
      res.redirect("back");
    })
  }
  else{
    fs.unlink(`./uploads/${req.params.filename}`,function(err){
      res.redirect("back");
    })
  }
})

router.get('/createfile',function(req,res){
  fs.writeFile(`./uploads/${req.query.filename}`,"",function(err){
    if(err) res.send(err);
    else res.redirect("/");
  })
})

router.get('/createfolder',function(req,res){
  fs.mkdir(`./uploads/${req.query.foldername}`,function(err){
    if(err) res.send(err);
    else res.redirect("/");
  })
})

module.exports = router;
