const express = require('express')
const app=express();
const path=require("path");
const fs=require("fs");
const methodOverride = require('method-override'); 

app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(express.static(path.join(__dirname,"public")));
app.set("view engine","ejs");
app.use(methodOverride('_method'));

app.get("/",function(req,res){
    fs.readdir(`./files`,function(err,files){
        res.render("index",{files:files});
    })
})

app.get("/file/:filename",function(req,res){
    fs.readFile(`./files/${req.params.filename}`,"utf-8",function(err,filedata){
        res.render('show',{filename:req.params.filename,filedata:filedata});
    })
})

app.get("/edit/:filename",function(req,res){
    res.render("edit",{filename:req.params.filename});
})

app.post("/create",function(req,res){
        fs.writeFile(`./files/${req.body.title.split(" ").join("")}.txt`,req.body.details,function(err){
            
            res.redirect("/");
        })
})

app.post("/edit",function(req,res){
    
    fs.rename(`./files/${req.body.previous}`,`./files/${req.body.new}`,function(err){
        console.log(err);
    })
    res.redirect("/");
})

app.get("/delete/:deletefilename",function(req,res){
    console.log(req.params.deletefilename);
    res.render("delete",{deletefilename:req.params.deletefilename});
    
})

app.delete("/delete",function(req,res){
    console.log(req.body.fileName);
    fs.unlink(`./files/${req.body.fileName}`,function(err){
        console.log(err);
    })
    res.redirect("/");
})



app.listen(3000,function(){
    console.log("chall rha he");
});