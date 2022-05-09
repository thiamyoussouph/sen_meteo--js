const jourSemaine=['lundi','mardi','mercredi','jeudi','vendredi','samdi','dimanche']
let aujourdhui=new Date();
let option={weekday:'long'};
let jourActuel=aujourdhui.toLocaleDateString('fr-FR',option)
jourActuel=jourActuel.charAt(0).toUpperCase() +jourActuel.slice(1)
let tabJoursOrdre =jourSemaine.slice(jourSemaine.indexOf(jourActuel)).concat(jourSemaine.slice(0,jourSemaine.indexOf(jourActuel)));

export default tabJoursOrdre;