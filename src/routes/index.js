const { Router } = require('express');
const axios = require('axios');
const{Country, Activity}=require('../db.js')
const{mapApiToDb, findQuery, addActivity}=require('../controllers')

// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');


const router = Router();


// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);
router.get('/', async(req, res)=>{
    try{
    const response = await axios.get('https://restcountries.com/v3/all')
    await Promise.all(mapApiToDb(response))    
    let countries = await Country.findAll({
        attributes: ['flag', 'continent', 'name', 'population', 'id'],
        include:Activity
    })
    let responseToSend;
    countries.length? responseToSend= "Base de datos cargada" : responseToSend = "La API respondio pero no se cargó la base de datos";
    console.log(responseToSend)
    res.send(responseToSend)    
}catch(error){
    // handle error
    console.log(error);
    res.send("Hubo un error, la API no responde y no se actualizo la base de datos")
}    
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
        // const response = await axios.get('https://restcountries.com/v3/all')
        // await Promise.all(mapApiToDb(response))
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
