
var portada="img/default.png";

/* Primera letra en Mayusculas */
function MaysPrimera(string){
  return string.charAt(0).toUpperCase() + string.slice(1);
}

/* INFO HOME PAGE */
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

    var article = data.results.bindings[0].article.value;
    var categoryLabel = data.results.bindings[0].categoryLabel.value;
    var countryLabel = data.results.bindings[0].countryLabel.value;
    var image = data.results.bindings[0].image.value;
    var item = data.results.bindings[0].item.value;
    var itemLabel = data.results.bindings[0].itemLabel.value;
    var itemDescription = data.results.bindings[0].itemDescription.value;
    var movement = data.results.bindings[0].movement.value;
    var movementLabel = data.results.bindings[0].movementLabel.value;

    document.getElementById("foto").innerHTML += "<img width='auto' height='150px' src="+image+">";
    document.getElementById("infoBasic").innerHTML += "<p><a href="+article+" target='_blank'</a>Wikipedia</p>";
    document.getElementById("infoBasic").innerHTML += "<p><a href="+item+" target='_blank'</a>"+categoryLabel+"</p>";
    document.getElementById("infoBasic").innerHTML += "<p>"+countryLabel+"</p>";
    document.getElementById("infoBasic").innerHTML += "<p>Descripción: "+MaysPrimera(itemDescription)+"</p>";
    document.getElementById("infoBasic").innerHTML += "<p>Movimiento Literario: <a href="+movement+" target='_blank'</a>"+MaysPrimera(movementLabel)+"</p>";

  });
}

function mostrarLibros(){

  var endpointUrl = 'https://query.wikidata.org/sparql',
    sparqlQuery = "SELECT DISTINCT ?bookText ?bookTextLabel ?bookTextDescription ?image ?autor ?autorLabel ?fechaPublicado ?genre ?genreLabel ?idioma ?idiomaLabel\n" +
        "WHERE {\n" +
        "  \n" +
        "    {?bookText wdt:P31 wd:Q83790 . ?bookText wdt:P407 wd:Q1321 . ?bookText wdt:P577 ?fechaPublicadoLabel .  } #libro de texto\n" +
        "   UNION\n" +
        "    {?bookText wdt:P31 wd:Q571 . ?bookText wdt:P407 wd:Q1321 . ?bookText wdt:P577 ?fechaPublicado .} #libro impreso\n" +
        "   UNION\n" +
        "    {?bookText wdt:P31 wd:Q8261 . ?bookText wdt:P407 wd:Q1321 . ?bookText wdt:P577 ?fechaPublicado .} #novela\n" +
        "   UNION\n" +
        "    {?bookText wdt:P31 wd:Q35760 . ?bookText wdt:P407 wd:Q1321 . ?bookText wdt:P577 ?fechaPublicado .} #ensayo #idioma de la obra spaña\n" +
        "   UNION\n" +
        "    {?bookText wdt:P31 wd:Q37484 . ?bookText wdt:P407 wd:Q1321 . ?bookText wdt:P577 ?fechaPublicado .} #poema épico\n" +
        "   UNION\n" +
        "    {?bookText wdt:P31 wd:Q7725634 . ?bookText wdt:P407 wd:Q1321 . ?bookText wdt:P577 ?fechaPublicado .} #obra literaria Q5364419\n" +
        "  UNION\n" +
        "    {?bookText wdt:P31 wd:Q7725634 . ?bookText wdt:P407 wd:Q5364419 . ?bookText wdt:P577 ?fechaPublicado .} #obra literaria Español moderno\n" +
        "   UNION\n" +
        "    {?bookText wdt:P31 wd:Q25379 . ?bookText wdt:P407 wd:Q1321 . ?bookText wdt:P577 ?fechaPublicado .} #play\n" +
        "   UNION\n" +
        "    {?bookText wdt:P31 wd:Q25379 . ?bookText wdt:P407 wd:Q1088025 . ?bookText wdt:P577 ?fechaPublicado .} #play español antiguo\n" +
        "  UNION\n" +
        "    {?bookText wdt:P31 wd:Q25379 . ?bookText wdt:P407 wd:Q397 . ?bookText wdt:P577 ?fechaPublicado .} #play latin\n" +
        "  \n" +
        "  OPTIONAL {?bookText wdt:P577 ?fechaPublicado . ?bookText wdt:P18 ?image . ?bookText wdt:P50 ?autor . \n" +
        "            ?bookText wdt:P136 ?genre . ?bookText wdt:P407 ?idioma . } \n" +
        "\n" +
        "\n" +
        "  \n" +
        "  #fecha del primer y último libro publicado\n" +
        "  filter (?fechaPublicado > \"1492-01-01\"^^xsd:dateTime && ?fechaPublicado < \"1681-05-26\"^^xsd:dateTime) \n" +
        "\n" +
        "\n" +
        "  \n" +
        "  SERVICE wikibase:label { bd:serviceParam wikibase:language \"[AUTO_LANGUAGE],es,en\". }\n" +
        "}\n" +
        "\n" +
        "ORDER BY ASC(?bookTextLabel)\n" +
        "",
    settings = {
        headers: { Accept: 'application/sparql-results+json' },
        data: { query: sparqlQuery }
    };

$.ajax( endpointUrl, settings ).then( function ( data ) {
  console.log(data.results.bindings);

    if (data.results.bindings != null) {
      for (var i in data.results.bindings) {
        document.getElementById("libros").innerHTML += "<div class='tarjeta'>";

        // console.log(data.results.bindings[i]);
        if (data.results.bindings[i] != null) {
          for (var j in data.results.bindings[i]) {
            if (data.results.bindings[i][j] != null) {
              // console.log("elemento I: "+data.results.bindings[i]);
              // console.log("J: "+j+"Valor: "+data.results.bindings[i][j].value);


              if (j=="image" && data.results.bindings[i].image != null) {
                document.getElementById("libros").innerHTML += "<img class='portada' src='"+data.results.bindings[i].image.value+"'>";

              }else if(data.results.bindings[i].image == null)  {
                console.log("SIN IMAGEN");
                console.log(data.results.bindings[i].bookTextLabel.value);
                var portada = "img/default.png";
                // document.getElementById("libros").innerHTML += "<img class='portada' src='"+portada+"'>";
              }

              if (j=="bookText" && data.results.bindings[i].bookText != null) {
                document.getElementById("libros").innerHTML += "<h3><a target='_blank' href='"+data.results.bindings[i].bookText.value+"'</a>"+data.results.bindings[i].bookTextLabel.value+"</h3>";
              }
              if (j=="autor" && data.results.bindings[i].autor != null) {
                document.getElementById("libros").innerHTML += "<h4><a target='_blank' href='"+data.results.bindings[i].autor.value+"'</a>"+data.results.bindings[i].autorLabel.value+"</h4>";
              }
              if (j=="genre" && data.results.bindings[i].genre != null) {
                document.getElementById("libros").innerHTML += "<p><a target='_blank' href='"+data.results.bindings[i].genre.value+"'</a>"+MaysPrimera(data.results.bindings[i].genreLabel.value)+"</p>";
              }
              if (j=="idioma" && data.results.bindings[i].idioma != null) {
                document.getElementById("libros").innerHTML += "<p><a target='_blank' href='"+data.results.bindings[i].idioma.value+"'</a>"+MaysPrimera(data.results.bindings[i].idiomaLabel.value)+"</p>";
              }
              if (j=="fechaPublicado" && data.results.bindings[i].fechaPublicado != null) {
                var fecha = data.results.bindings[i].fechaPublicado.value.split("-")
                document.getElementById("libros").innerHTML += "<p><small>"+fecha[0]+"</small></p>";
              }
              if (j=="bookTextDescription" && data.results.bindings[i].bookTextDescription != null) {
                document.getElementById("libros").innerHTML += "<p><small>"+MaysPrimera(data.results.bindings[i].bookTextDescription.value)+"</small></p>";
              }

            }
          }
        }
      }
      document.getElementById("libros").innerHTML += "</div>";

    }
  } );
}


/* BUSCADOR*/
$(function() {
  var elemento = [];
  // click ajax call
  $("#searchTermAutor").keypress(function(e){
    if(e.keyCode===13){
      $.alert({
      title: 'Estoy en ello!',
      content: 'De momento solo click!',
      });
    }
  });

  $("#searchAutor").on("click", function() {
    document.getElementById("cont").innerHTML = "";
    var searchTermAutor = $("#searchTermAutor").val();
    var searchTermAutorMAY= searchTermAutor.toUpperCase();

    var endpointUrl = 'https://query.wikidata.org/sparql',
    sparqlQuery = "SELECT DISTINCT ?bookText ?bookTextLabel ?bookTextDescription ?image ?autor ?autorLabel ?fechaPublicado ?genre ?genreLabel ?idioma ?idiomaLabel\n" +
        "WHERE {\n" +
        "  \n" +
        "    {?bookText wdt:P31 wd:Q83790 . ?bookText wdt:P407 wd:Q1321 . ?bookText wdt:P577 ?fechaPublicadoLabel .  } #libro de texto\n" +
        "   UNION\n" +
        "    {?bookText wdt:P31 wd:Q571 . ?bookText wdt:P407 wd:Q1321 . ?bookText wdt:P577 ?fechaPublicado .} #libro impreso\n" +
        "   UNION\n" +
        "    {?bookText wdt:P31 wd:Q8261 . ?bookText wdt:P407 wd:Q1321 . ?bookText wdt:P577 ?fechaPublicado .} #novela\n" +
        "   UNION\n" +
        "    {?bookText wdt:P31 wd:Q35760 . ?bookText wdt:P407 wd:Q1321 . ?bookText wdt:P577 ?fechaPublicado .} #ensayo #idioma de la obra spaña\n" +
        "   UNION\n" +
        "    {?bookText wdt:P31 wd:Q37484 . ?bookText wdt:P407 wd:Q1321 . ?bookText wdt:P577 ?fechaPublicado .} #poema épico\n" +
        "   UNION\n" +
        "    {?bookText wdt:P31 wd:Q7725634 . ?bookText wdt:P407 wd:Q1321 . ?bookText wdt:P577 ?fechaPublicado .} #obra literaria Q5364419\n" +
        "  UNION\n" +
        "    {?bookText wdt:P31 wd:Q7725634 . ?bookText wdt:P407 wd:Q5364419 . ?bookText wdt:P577 ?fechaPublicado .} #obra literaria Español moderno\n" +
        "   UNION\n" +
        "    {?bookText wdt:P31 wd:Q25379 . ?bookText wdt:P407 wd:Q1321 . ?bookText wdt:P577 ?fechaPublicado .} #play\n" +
        "   UNION\n" +
        "    {?bookText wdt:P31 wd:Q25379 . ?bookText wdt:P407 wd:Q1088025 . ?bookText wdt:P577 ?fechaPublicado .} #play español antiguo\n" +
        "  UNION\n" +
        "    {?bookText wdt:P31 wd:Q25379 . ?bookText wdt:P407 wd:Q397 . ?bookText wdt:P577 ?fechaPublicado .} #play latin\n" +
        "  \n" +
        "  OPTIONAL {?bookText wdt:P577 ?fechaPublicado . ?bookText wdt:P18 ?image . ?bookText wdt:P50 ?autor . \n" +
        "            ?bookText wdt:P136 ?genre . ?bookText wdt:P407 ?idioma . } \n" +
        "\n" +
        "\n" +
        "  \n" +
        "  #fecha del primer y último libro publicado\n" +
        "  filter (?fechaPublicado > \"1492-01-01\"^^xsd:dateTime && ?fechaPublicado < \"1681-05-26\"^^xsd:dateTime) \n" +
        "\n" +
        "\n" +
        "  \n" +
        "  SERVICE wikibase:label { bd:serviceParam wikibase:language \"[AUTO_LANGUAGE],es,en\". }\n" +
        "}\n" +
        "\n" +
        "ORDER BY ASC(?bookTextLabel)\n" +
        "",
      settings = {
          headers: { Accept: 'application/sparql-results+json' },
          data: { query: sparqlQuery }
      };

  $.ajax( endpointUrl, settings ).then( function ( data ) {
      // $( 'body' ).append( ( $('<pre>').text( JSON.stringify( data) ) ) );
      if (searchTermAutor == "") {
        $.alert({
        title: 'Campo vacío!',
        content: 'Introduce un texto!',
        });
      }else {
        if (data.results.bindings != null) {
          for (var i in data.results.bindings) {
            if (data.results.bindings[i] != null) {
              for (var j in data.results.bindings[i]) {
                if (data.results.bindings[i][j] != null) {
                  // console.log("dato "+i+" j: "+j+"...."+data.results.bindings[i][j].value);

                  if (j == "bookTextLabel" && data.results.bindings[i].bookTextLabel.value.toUpperCase().includes(searchTermAutorMAY)
                      || j == "autorLabel" && data.results.bindings[i].autorLabel.value.toUpperCase().includes(searchTermAutorMAY)) {
                        elemento.push(data.results.bindings[i]);
                  }
                }
              }
            }
          }
        }
      }
      // MOSTRAOS INFO de los libros resultantes
      // console.log(elemento);

      if (elemento.length > 0) {
        for (var i in elemento) {
          document.getElementById("cont").innerHTML += "<div class='tarjeta'>";

          // console.log("ELEMENTO i " +elemento[i]);
          for (var j in elemento[i]) {

            console.log(elemento[i]);

            if (j=="image" && elemento[i].image != null) {
              document.getElementById("cont").innerHTML += "<img class='portada' src='"+elemento[i].image.value+"'</img>";
            }else if (j=="image" && elemento[i].image.value == null) {
              console.log("SIN IMAGEN");
              document.getElementById("cont").innerHTML += "<img class='portada' src='img/default.png'</img>";
            }
            if (j=="bookText" && elemento[i].bookText != null) {
              document.getElementById("cont").innerHTML += "<h3><a target='_blank' href='"+elemento[i].bookText.value+"'</a>"+elemento[i].bookTextLabel.value+"</h3>";
            }
            if (j=="autor" && elemento[i].autor != null) {
              document.getElementById("cont").innerHTML += "<h4><a target='_blank' href='"+elemento[i].autor.value+"'</a>"+elemento[i].autorLabel.value+"</h4>";
            }
            if (j=="genre" && elemento[i].genre != null) {
              document.getElementById("cont").innerHTML += "<p><a target='_blank' href='"+elemento[i].genre.value+"'</a>"+MaysPrimera(elemento[i].genreLabel.value)+"</p>";
            }
            if (j=="idioma" && elemento[i].idioma != null) {
              document.getElementById("cont").innerHTML += "<p><a target='_blank' href='"+elemento[i].idioma.value+"'</a>"+MaysPrimera(elemento[i].idiomaLabel.value)+"</p>";
            }
            if (j=="fechaPublicado" && elemento[i].fechaPublicado != null) {
              var fecha = elemento[i].fechaPublicado.value.split("-")
              document.getElementById("cont").innerHTML += "<p><small>"+fecha[0]+"</small></p>";
            }
            if (j=="bookTextDescription" && elemento[i].bookTextDescription != null) {
              document.getElementById("cont").innerHTML += "<p><small>"+MaysPrimera(elemento[i].bookTextDescription.value)+"</small></p>";
            }

          }
        }
        document.getElementById("cont").innerHTML += "</div>";
      }else {
        $.alert({
        title: 'No se han encontrado resultados!!!',
        content: 'Introduce un texto!',
        });
      }
      // vaciamos el array de libros
      while (elemento.length >0) {
        elemento.pop();
      }
    });
  });

});
