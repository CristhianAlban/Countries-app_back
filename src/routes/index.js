const { Router } = require('express');
const axios = require('axios');
const{Country, Activity}=require('../db.js')
const{mapApiToDb, findQuery, addActivity}=require('../controllers')

// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');


const router = Router();


// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);
router.get('/', (req, res)=>{
    console.log("estoy funcionando home");
    res.send("esto es una ruta home")
})
router.get('/countries/:idCountry', async(req, res)=>{
    try{  
    let id=req.params.idCountry
    let response= await Country.findAll({
        where: {id: id},
        include:Activity
    })
    res.send(response)
    }catch(error){
        console.log(error)
    }
})
router.get('/countries', async(req, res)=>{
    try{
        const response = await axios.get('https://restcountries.com/v3/all')
        await Promise.all(mapApiToDb(response))
        if(req.query.name){
            let responseFilter= await findQuery(req.query.name);
            if(responseFilter.length){
                return res.send(responseFilter)
            }else{
                return res.send([{msg:"No se encontró el pais o no existe"}])
            }                           
            
        }
        let countries = await Country.findAll({
            attributes: ['flag', 'continent', 'name', 'population', 'id'],
            include:Activity              
        })
        res.send(countries)    
    }catch(error){
        // handle error
        console.log(error);
    }    
})
router.post('/activities', (req, res)=>{
    addActivity(req.body)
    // console.log(req.body)
    res.send("exito")
})




module.exports = router;
