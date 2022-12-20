let {Router} = require("express");
let router = new Router();
let utils=require("../../utils")

const esAdmin = true;

function soloAdmins(req, res, next) {
    if (!esAdmin) {
        res.json(crearErrorNoEsAdmin())
    } else {
        next()
    }
}

function crearErrorNoEsAdmin() {
    const error={error : -2}
    error.description="no autorizado";
    return error
}
module.exports = app =>{
    const Contenedor=require("../../Contenedor");
    const productos=new Contenedor(utils+"/productos.json");
    app.use("/api/productos",router);
    router.get("/",async(req,res,next)=>{
        let products = await productos.getAll();
        res.json(products);
    })
    router.get("/:id",async(req,res,next)=>{
        const {id}=req.params;
        let products = await productos.getById(Number(id));
        if(products){
            res.json(products);
        }
        else{
            res.json({error: "producto no encontrado"});
        }
    })

    router.post("/",soloAdmins,async(req,res,next)=>{
        let obj=req.body;
        await productos.save(obj);
        let productActualizado=await productos.getAll();
        res.json({product: productActualizado});
    })
    router.put("/:id",soloAdmins,async(req,res,next)=>{
        let {id}=req.params;
        let {title,price,thumbnail,stock}=req.body;
        if(title && price &&thumbnail){
            let productEdit={id:Number(id),title: title,price:Number(price),thumbnail:thumbnail,stock:Number(stock)}
            await productos.actualizar(productEdit);
            res.json({product: productEdit})
        }
        else{
            res.json({error: "datos a cambiar incorrectos"})
        }

    })
    router.delete("/:id",soloAdmins,async(req,res,next)=>{
        let {id}=req.params;
        let productEliminado=await productos.getById(Number(id));
        await productos.deleteById(Number(id));
        res.json({deletProduct: productEliminado})
    })
}
