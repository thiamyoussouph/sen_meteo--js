import tabJoursOrdre from "./Utilitaire/gestionTemps.js";
const CLETAPI='27b3833a88ae3421488f42bbb73efb1c';
let resultatsApi;
const  temps=document.querySelector('.temps')
const  temperature=document.querySelector('.temperature')
const localisations=document.querySelector('.localisations')
const heur=document.querySelectorAll('.heure-mon-prevision')
const heurParValeur=document.querySelectorAll('.heure-prevision-valeur')
const jourDiv=document.querySelectorAll('.jour-pevision-nom')
const tempsjour=document.querySelectorAll('.jour-pevision-temp')
const icone=document.querySelector('.logo-meteo')
if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(position =>{
        let long=position.coords.longitude;
        let lat=position.coords.latitude;
        AppelAPI(long,lat);
    },()=> alert("veiller activer lageolocalisation"))
}
function AppelAPI(long,lat) {
    fetch(`https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${long}&exclude=minutely&units=metric&lang=fr&appid=${CLETAPI}`)
    .then((reoonse)=>{
       return reoonse.json();
    })
    .then((data)=>{
        resultatsApi=data
        temps.innerText=resultatsApi.current.weather[0].description;
        temperature.innerText=`${Math.trunc(resultatsApi.current.temp)}°`
        localisations.innerText=resultatsApi.timezone

        let heurActuel= new Date().getHours();
        for (let i = 0; i < heur.length; i++) {
            let heureIncrement = heurActuel+i * 3;
            if (heureIncrement > 24) {
                heur[i].innerText=`${heureIncrement -24}h`;
            }else if(heureIncrement ===24){
                heur[i].innerText="00H";
            }else{
                heur[i].innerText=`${heureIncrement}h`;
            } 
        }
        for (let j = 0; j < heurParValeur.length; j++) {
            heurParValeur[j].innerText=`${Math.trunc(resultatsApi.hourly[j * 3].temp)}°`
            
        }
        for (let k = 0; k < tabJoursOrdre.length; k++) {
            jourDiv[k].innerText=tabJoursOrdre[k].slice(0,3);
            
        }
        for (let m = 0; m < 7; m++) {
           tempsjour[m].innerText=`${Math.trunc(resultatsApi.daily[m + 1].temp.day)}`
            
        }
        if (heurActuel >=6 && heurActuel< 21 ) {
            icone.src=`resources/jour/${resultatsApi.current.weather[0].icone}.svg`
        }else{
            icone.src=`resources/nuit/${resultatsApi.current.weather[0].icone}.svg`
        }
     })
}
