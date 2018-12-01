
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
      // console.log(data.results.bindings[0]);
    // console.log("json como cadena. Propiedad: "+i+" Valor: "+cadenaJSON);
    // document.getElementById("cont").innerHTML += i + ": " + datos[i] + "<br/>";
      if (i != "image") {
        document.getElementById("infoBasic").innerHTML += "<div><h5>"+i+"</h5><p>"+data.results.bindings[0][i].value+"</p></div>";
      }
    }
  });
}

function mostrarLibros(){
  var endpointUrl = 'https://query.wikidata.org/sparql',
    sparqlQuery = "SELECT ?bookText ?bookTextLabel ?fechaPublicado ?image ?autor ?autorLabel\n" +
        "WHERE {\n" +
        "  \n" +
        "    {?bookText wdt:P31 wd:Q83790 . ?bookText wdt:P407 wd:Q1321 . ?bookText wdt:P577 ?fechaPublicado .  } #libro de texto\n" +
        "   UNION\n" +
        "    {?bookText wdt:P31 wd:Q571 . ?bookText wdt:P407 wd:Q1321 . ?bookText wdt:P577 ?fechaPublicado .} #libro impreso\n" +
        "   UNION\n" +
        "    {?bookText wdt:P31 wd:Q8261 . ?bookText wdt:P407 wd:Q1321 . ?bookText wdt:P577 ?fechaPublicado .} #novela\n" +
        "   UNION\n" +
        "    {?bookText wdt:P31 wd:Q35760 . ?bookText wdt:P407 wd:Q1321 . ?bookText wdt:P577 ?fechaPublicado .} #ensayo #idioma de la obra spaña\n" +
        "   UNION\n" +
        "    {?bookText wdt:P31 wd:Q37484 . ?bookText wdt:P407 wd:Q1321 . ?bookText wdt:P577 ?fechaPublicado .} #poema épico\n" +
        "   UNION\n" +
        "    {?bookText wdt:P31 wd:Q7725634 . ?bookText wdt:P407 wd:Q1321 . ?bookText wdt:P577 ?fechaPublicado .} #obra literaria\n" +
        "   UNION\n" +
        "    {?bookText wdt:P31 wd:Q25379 . ?bookText wdt:P407 wd:Q1321 . ?bookText wdt:P577 ?fechaPublicado .} #play\n" +
        "   UNION\n" +
        "    {?bookText wdt:P31 wd:Q25379 . ?bookText wdt:P407 wd:Q1088025 . ?bookText wdt:P577 ?fechaPublicado .} #play español antiguo\n" +
        "  UNION\n" +
        "    {?bookText wdt:P31 wd:Q25379 . ?bookText wdt:P407 wd:Q397 . ?bookText wdt:P577 ?fechaPublicado .} #play latin\n" +
        "  \n" +
        "  OPTIONAL {?bookText wdt:P577 ?fechaPublicado . ?bookText wdt:P18 ?image . ?bookText wdt:P50 ?autor .} \n" +
        "\n" +
        "\n" +
        "  \n" +
        "  #fecha del primer y último libro publicado\n" +
        "  filter (?fechaPublicado > \"1492-01-01\"^^xsd:dateTime && ?fechaPublicado < \"1681-05-26\"^^xsd:dateTime) \n" +
        "\n" +
        "\n" +
        "  \n" +
        "  SERVICE wikibase:label { bd:serviceParam wikibase:language \"[AUTO_LANGUAGE],es\". }\n" +
        "}\n" +
        "\n" +
        "ORDER BY ASC(?fechaPublicado)\n" +
        "",
    settings = {
        headers: { Accept: 'application/sparql-results+json' },
        data: { query: sparqlQuery }
    };

$.ajax( endpointUrl, settings ).then( function ( data ) {
    // $( 'body' ).append( ( $('<pre>').text( JSON.stringify( data) ) ) );
    console.log( data );
    // console.log(data.results);
    // console.log(data.results.bindings);
    // console.log(data.results.bindings[0].image.value);
    if (data.results.bindings != null) {
      for (var i in data.results.bindings) {
        // console.log(data.results.bindings[i]);
        if (data.results.bindings[i] != null) {
          for (var j in data.results.bindings[i]) {
            if (data.results.bindings[i][j] != null) {
              if (j !=null && j == "image") {
                document.getElementById("libros").innerHTML +="<span><img class='portada'src='"+data.results.bindings[i][j].value+"'></span>";
                // document.getElementById("libros").innerHTML +="<h6>"+j+"</h6><p>"+data.results.bindings[i][j].value+"</p>";
              }else if(j!="image") {
                // document.getElementById("libros").innerHTML +="<img class='portada'src='img/default.png'>";
                document.getElementById("libros").innerHTML +="<div style='display:flex' class='col center-block'><p style='strong'>"+j+": </p><span>"+data.results.bindings[i][j].value+"</span></div>";

              }
            }
          }

        }
      }

    }
  } );
}


function buscador(){
  $(function() {


    var endpointUrl = 'https://query.wikidata.org/sparql',
      sparqlQuery = "SELECT ?bookText ?bookTextLabel ?fechaPublicado ?image ?autor ?autorLabel\n" +
          "WHERE {\n" +
          "  \n" +
          "    {?bookText wdt:P31 wd:Q83790 . ?bookText wdt:P407 wd:Q1321 . ?bookText wdt:P577 ?fechaPublicado .  } #libro de texto\n" +
          "   UNION\n" +
          "    {?bookText wdt:P31 wd:Q571 . ?bookText wdt:P407 wd:Q1321 . ?bookText wdt:P577 ?fechaPublicado .} #libro impreso\n" +
          "   UNION\n" +
          "    {?bookText wdt:P31 wd:Q8261 . ?bookText wdt:P407 wd:Q1321 . ?bookText wdt:P577 ?fechaPublicado .} #novela\n" +
          "   UNION\n" +
          "    {?bookText wdt:P31 wd:Q35760 . ?bookText wdt:P407 wd:Q1321 . ?bookText wdt:P577 ?fechaPublicado .} #ensayo #idioma de la obra spaña\n" +
          "   UNION\n" +
          "    {?bookText wdt:P31 wd:Q37484 . ?bookText wdt:P407 wd:Q1321 . ?bookText wdt:P577 ?fechaPublicado .} #poema épico\n" +
          "   UNION\n" +
          "    {?bookText wdt:P31 wd:Q7725634 . ?bookText wdt:P407 wd:Q1321 . ?bookText wdt:P577 ?fechaPublicado .} #obra literaria\n" +
          "   UNION\n" +
          "    {?bookText wdt:P31 wd:Q25379 . ?bookText wdt:P407 wd:Q1321 . ?bookText wdt:P577 ?fechaPublicado .} #play\n" +
          "   UNION\n" +
          "    {?bookText wdt:P31 wd:Q25379 . ?bookText wdt:P407 wd:Q1088025 . ?bookText wdt:P577 ?fechaPublicado .} #play español antiguo\n" +
          "  UNION\n" +
          "    {?bookText wdt:P31 wd:Q25379 . ?bookText wdt:P407 wd:Q397 . ?bookText wdt:P577 ?fechaPublicado .} #play latin\n" +
          "  \n" +
          "  OPTIONAL {?bookText wdt:P577 ?fechaPublicado . ?bookText wdt:P18 ?image . ?bookText wdt:P50 ?autor .} \n" +
          "\n" +
          "\n" +
          "  \n" +
          "  #fecha del primer y último libro publicado\n" +
          "  filter (?fechaPublicado > \"1492-01-01\"^^xsd:dateTime && ?fechaPublicado < \"1681-05-26\"^^xsd:dateTime) \n" +
          "\n" +
          "\n" +
          "  \n" +
          "  SERVICE wikibase:label { bd:serviceParam wikibase:language \"[AUTO_LANGUAGE],es\". }\n" +
          "}\n" +
          "\n" +
          "ORDER BY ASC(?fechaPublicado)\n" +
          "",
      settings = {
          headers: { Accept: 'application/sparql-results+json' },
          data: { query: sparqlQuery }
      };

  $.ajax( endpointUrl, settings ).then( function ( data ) {
      // $( 'body' ).append( ( $('<pre>').text( JSON.stringify( data) ) ) );
      console.log( data );
      // console.log(data.results);
      // console.log(data.results.bindings);
      // console.log(data.results.bindings[0].image.value);

    } );



    // enter
      $("#searchTerm2").keypress(function(e){
      	if(e.keyCode===13){
      		var searchTerm = $("#searchTerm2").val();
          var url = "https://en.wikipedia.org/w/api.php?action=opensearch&search="+ searchTerm +"&limit=5&format=json&callback=?";

      	}
      });


    // click ajax call
    $("#search2").on("click", function() {
  	var searchTerm = $("#searchTerm2").val();
    if (searchTerm=="") {
      // swal("No has escrito nada payaso!","");
      $.alert({
      title: 'Campo vacío!',
      content: 'Introduce un texto!',
      });
    }
  	var url = "https://en.wikipedia.org/w/api.php?action=opensearch&search="+ searchTerm +"&limit=10&format=json&callback=?";

    });
  });

}
