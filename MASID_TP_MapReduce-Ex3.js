   // Travail BIG DATA --- mongoDB mapReduce: @Cyrille KESIKU 
    // AIMS-SENEGAL Fevrier 2020
    /*------------------------------------------------------------------------------------------------------------------------- */
 
//-----------------------------------Question 1-------------------------------------

/*Pour chaque état, donne la liste de ses villes sans supprimer les doublons. Aide :
il faut impérativement que le type des valeurs émises par le map (retourné par
emit) soit le même que le type d’entrée des valeurs du reduce (paramètre values
de la fonction) et le type de sortie du reduce (retourné par return) soient les
mêmes*/ 

var exo3q1map=function(){emit(this.state, this.city)};
var exo3q1red=function(key ,valeurs){
   return valeurs.join(';') };

// job mapReduce exo3q1
db.zips.mapReduce(exo3q1map,exo3q1red,{ out: "exo3q1" })


//-----------------------------------Question 2--------------------------------

/*Même question, mais en supprimant les doublons. Aide : utiliser un objet json
comme un tableau associatif pour garantir l’unicité.*/

var exo3q2map=function(){emit(this.state, this.city)};
var exo3q2red =function(key, valeurs) {
return Array.from(new Set(valeurs)).join(";")}
//job mapReduce exo3q2
db.zips.mapReduce(exo3q2map,exo3q2red,{ out: "exo3q2" })

//--------------------------------Question 3-----------------------------------

/*Pour chaque état, donner à la fois le code postal le plus peuplé et le moins peu-
plé. Aide : utiliser un objet json comme valeur du emit.*/ 

var exo3q3map=function(){emit(this.state, this.pop)};
var exo3q3red=function(key , valeurs){
var nombre = 0;
for(var i = 0; i < valeurs.length; i++){ nombre +=valeurs[i]; };
return nombre;
};

//job mapReduce exo3q3
db.zips.mapReduce(exo3q3map,exo3q3red,{ out: "exo3q3"})

var document=db.exo3q3.find().toArray()
var Post_max= doc.sort(function(x, y){return x.value - y.value}).slice(0,1);
var Post_min= doc.sort(function(x, y){return y.value - x.value}).slice(0,1);
db.exo3q3.drop()
db.exo3q3.insert(Post_max)
db.exo3q3.insert(Post_min)

//-------------------------------------Question 4-----------------------------------

/*Donner l’état le plus peuplé des US un job Map/Reduce sur la collection states.*/

var exo3q3map=function(){emit(this.state, this.pop)};

var exo3q3red=function(key , valeurs){
var nombre = 0;
for(var i = 0; i < valeurs.length; i++){ nombre +=valeurs[i]; };
return nombre;};
db.zips.mapReduce(exo3q3map,exo3q3red,{ out: "state"})

var document=db.state.find().toArray()
var Post_max= doc.sort(function(x, y){return y.value - x.value}).slice(0,1);
db.state.drop()
db.state.insert(Post_max)

// -----------------------------------------fin tache ------------------------------
