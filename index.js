const express = require('express');
const app = express()
const PORT=process.env.PORT || 8080;
let serverRoutes=require("./routes");



app.use(express.urlencoded({extended:true}))
app.use(express.json())


serverRoutes(app);






app.listen(PORT,console.log("server on"));





