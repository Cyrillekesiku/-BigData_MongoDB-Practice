    // Travail BIG DATA --- mongoDB mapReduce: @Cyrille KESIKU 
    // AIMS-SENEGAL Fevrier 2020
    /*------------------------------------------------------------------------------------------------------------------------- */
 
    //--------------------------------------------Question 1-----------------------------------------------
    /*Donner les codes postaux et leur population quand elle est supérieure à 100.000
    en filtrant dans le map.*/

    var Maper = function() {
    if (this.pop>100000)
    emit(this._id, this.pop); }
    var Reducer = function(key, values) {}
    // Job mapReduce exo2q1
    db.zips.mapReduce(Maper, Reducer, {out: "exo2q1"});
    
    
    //--------------------------------------------Question 2---------------------------------

    /*Même question mais en filtrant avec le paramètre query de la fonction mapRe-
    duce() 3 . Laquelle des deux solutions faut-il privilégier ?*/

    var Maper = function() {emit(this._id, this.pop); }
    var Reducer = function(key, values) {}
    //Job mapReduce exo2q2
    db.zips.mapReduce(Maper, Reducer, {out: "exo2q2", query:{pop:{$gt:100000}}});

    // dans ce cas on prefere  la deuxième solution.car elle nous renseigne mieux que la premiere 
    
    
    //--------------------------------------------Question 3------------------------------------

    /* Donner la population totale de chaque état, puis en javascript avec sort et slice,
    filtrer ce résultat en javascript pour ne garder que les 3 états les plus peuplés.
    Vérifiez que votre résultat est cohérent avec la réalité. */

    var MAPER = function() {emit(this.state, this.pop); }
    var REDUCER = function ( key, values ) {
        var nombre = 0;
        for(var i = 0; i < values.length; i++){
            nombre +=values[i];
        };
    
        return nombre;
    }
    db.zips.mapReduce( MAPER, REDUCER, {out: "exo2q3"});
    
    var ts=db.t.find();
    var td = ts.toArray();
    
    var sorted = td.sort(function (x, y) {
        if (x.value < y.value) {
            return 1;
    }
        if (x.value > y.value) {
            return -1;
        }
        return 0;
    });
    var data = sorted.slice(0, 3);
    
    
    //----------------------------------Question 4----------------------------------

    /*Donner la liste des villes des US, attention à ne pas mélanger des villes ho-
    monymes mais dans des états différents. Pour tester votre requête, utiliser le
    paramètre limit de mapReduce()*/
    
    var MAPER = function() {emit(this.city, this.state);}
    var REDUCER = function(key, values) {}

    //Job mapReduce exo2q4
    db.zips.mapReduce(MAPER, REDUCER, {out: "exo2q4", limit:16584 });
    
//-----------------------------fin tache----------------------------------------------------
    
