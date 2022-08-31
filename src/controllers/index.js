const{Country, Activity}=require('../db.js')
const { Op } = require("sequelize");
const mapApiToDb = (response)=>{
    return response.data.map(async e=>{
        let i=await Country.findAll({where: {id: e.cca3}})                
         if(!i.length){
            return Country.create({
                id:e.cca3,
                name:e.name.common,
                flag:e.flags[1],
                continent:e.continents && e.continents[0],
                capital:e.capital && e.capital[0],
                subregion:e.subregion,
                area:e.area,
                population:e.population
            })
         }
    })
}
const findQuery= async (name)=>{
    try{
        let countryName=name.toLowerCase().split('');
        countryName[0]=countryName[0].toUpperCase();
        countryName=countryName.join('');        
        let response= await Country.findAll({
            where: {
              name: {
                [Op.substring]: countryName
              }
            }
          });
        return response


        }catch(error){
            console.log(error)
        }
}
const addActivity =async (obj)=>{
    let i=await Activity.findAll({where: {name: obj.nombre}})                
         if(!i.length){
            let newActivity = await Activity.create({               
                name:obj.nombre,
                Difficulty:obj.dificultad,
                Duration:obj.duracion,
                Season: obj.temporada,            
            });
            obj.countries.map((e)=>{
                newActivity.addCountry(e)
            })  
         }
    
}

module.exports ={
    mapApiToDb,
    findQuery,
    addActivity
  
}