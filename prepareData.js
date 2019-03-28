const fetch = require('node-fetch')
const d3 = require('d3')
const R = require('ramda')

const writeJson = require('./writeJson')
/*
  writeJson prends deux arguments:
    * le nom du fichier
    * un objet ou une liste JSON
  
  ex:
    writeJson('asylum.json', data)
*/
const URL = 'https://raw.githubusercontent.com/idris-maps/heig-datavis-2019/master/20190322-node/exercice_node/ch_asylum_demands.csv'
// le lien vers le fichier CSV

fetch(URL)
  .then(r => r.text())
  .then(d3.csvParse)
  .then(donnees => donnees.filter(d => d.affected !== "*")) 
      //Number traduit "1999" en 1999
  .then(donnees => donnees.map(d => ({...d, affected: Number(d.affected), year: Number(d.year)}))) 
      //Normalise les USA
  .then(donnees => donnees.map(d => ({...d, country_asylum: d.country_asylum.includes("USA") ? "USA" : d.country_asylum}) ))
      //Crée le fichier asylum.json
  .then(donnees => writeJson('asylum.json', donnees))
.catch(console.log);

//writeJson('asylum.json', data);