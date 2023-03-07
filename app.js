const express = require("express")

const app = express()

app.set('view engine', 'ejs');
app.use(express.static('public'))


app.get("/" , (req,res)=>{
    res.render("Home")
})

app.get("/about" , (req,res)=>{
    res.render("About")
})

app.listen(3000 , (req,res)=>console.log("Listning on port 3000"))