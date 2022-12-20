let {Router}=require("express");
let router=new Router();
let productosApi = require("../components/productos");
let carritoApi = require("../components/carrito");




module.exports=app=>{
    productosApi(app);
    carritoApi(app);
    router.get("/",async(req,res,next)=>{
        res.send("ok");
    })
}

