   // Travail BIG DATA --- mongoDB mapReduce: @Cyrille KESIKU 
    // AIMS-SENEGAL Fevrier 2020
    /*------------------------------------------------------------------------------------------------------------------------- */
//---------------------------------Question 1------------------------------------

/*Calculer le nombre total d’enregistrements de la collection zips en remplissant
les fonctions exo1q1map et exo1q1red. Le résultat du job Map/Reduce sera sto-
cké dans la variable exo1q1.*/

var exo1q1map=function(){
    emit('documents',1);
};

var exo1q1red = function(documents, values) {
    nombre = 0;
    for(i = 0; i < values.length; i++){
        nombre += values[i];
 }
 return nombre;
};
// Job mapReduce exo1q1
db.zips.mapReduce(exo1q1map,exo1q1red,{
    out:'exo1q1'
});

//----------------------------------Question 2--------------------------------------

/*Modifier la fonction exo1q1red pour utiliser la fonction values.reduce() 1 à la place
de la boucle et l’enregistrer dans la variable exo1q2red. */

var exo1q2red = function(key, values ) {
    const reducer = (ac, cv) => ac + cv;
    return values.reduce(reducer);
 };
// Job mapReduce exo1q2
db.zips.mapReduce(exo1q1map,exo1q2red,{
    out:'exo1q2'
});

// --------------------------------Question 3---------------------------------------

/*Modifier la fonction exo1q1red pour utiliser la fonction values.forEach 2 à la place
de la boucle et l’enregistrer dans la variable exo1q3red. */

 var exo1q3red = function ( key, values ) {
    var vs = 0;
    values.forEach(function(val) { vs +=val; });
     return vs;
 };
db.zips.mapReduce(exo1q1map,exo1q3red,{
    out:'exo1q3'
});


//*************************fin Tâche********************** */
