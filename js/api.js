function cargar() {
  mostrarBasico();
}
function mostrarBasico(){
  var endpointUrl = 'https://query.wikidata.org/sparql',
    sparqlQuery = "SELECT distinct ?item ?itemLabel ?itemDescription ?article ?image ?countryLabel ?categoryLabel ?movementLabel ?movement WHERE{\n" +
        "\n" +
        " ?item ?label \"Spanish Golden Age\"@en.  \n" +
        " ?article schema:about ?item .\n" +
        " ?article schema:inLanguage \"en\" .\n" +
        " ?item wdt:P18 ?image .\n" +
        " ?item wdt:P17 ?country .\n" +
        " ?item wdt:P373 ?category .\n" +
        " ?item wdt:P31 ?movement .\n" +
        "  \n" +
        " ?article schema:isPartOf <https://en.wikipedia.org/>.	\n" +
        "\n" +
        " SERVICE wikibase:label { bd:serviceParam wikibase:language \"[AUTO_LANGUAGE],en\". }    \n" +
        "}",
      settings = {
          headers: { Accept: 'application/sparql-results+json' },
          data: { query: sparqlQuery }
      };

  $.ajax( endpointUrl, settings ).then( function ( data ) {
    // $( 'body' ).append( ( $('<pre>').text( JSON.stringify( data) ) ) );
    // console.log( data );
    // console.log(data.results);
    // console.log(data.results.bindings[0]);
    document.getElementById("foto").innerHTML += "<img width='auto' height='150px' src="+data.results.bindings[0].image.value+">";
    for (var i in data.results.bindings[0]) {
      console.log(data.results.bindings[0]);
    // console.log("json como cadena. Propiedad: "+i+" Valor: "+cadenaJSON);
    // document.getElementById("cont").innerHTML += i + ": " + datos[i] + "<br/>";
      if (i != "image") {
        document.getElementById("infoBasic").innerHTML += "<div><h5>"+i+"</h5><p>"+data.results.bindings[0][i].value+"</p></div>";
      }
    }
  });
}
