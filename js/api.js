
var portada="img/default.png";
var dataJSON;
// varables para LIBRO
// ?fechaPublicado ?genre ?genreLabel ?idioma ?idiomaLabel ?bvmc
var titLink, tit, desc,img, autLink, aut, fec, genLink, gen, idiLink, idi, bvmcl;
// variables para autor
var autor, autorLabel, autorDescription, birth, birthDeath, ocupacionLabel, image, firma, bvmca="";

var page = 1;
var pageLimit=20;
var total=0;

/* Primera letra en Mayusculas */
function MaysPrimera(string){
  if (string != null) {
    return string.charAt(0).toUpperCase() + string.slice(1);
  }
}

// window.onload = function() {
//       var txt = dataJSON;
// 	   document.getElementById('link').onclick = function(dataJSON) {
//         this.href = 'data:dataJSON,'
//           + encodeURIComponent(dataJSON.value);
//       };
//     };

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
    document.getElementById("vermas").innerHTML += "<a href="+article+" target='_blank'>Leer +</a>";

  });
}
function pageLess() {
  page = page-pageLimit;
  if (page = 0){
    page = 1;
  }
  // console.log("pageLess: "+page);
  mostrarLibros();
}
function pageMore(){
  page = page+pageLimit;
  if (total > 0) {
    mostrarLibros();
    // console.log("resultados por pageMore: "+page);
    }else {
    $.alert({
    title: 'No hay mas resultados!',
    content: 'Estamos ampliando nuestras referencias!',
    });
    page=1;
    mostrarLibros();
    }
}
/* Lista todos los libros */
function mostrarLibros(){
  document.getElementById("libros").innerHTML="";
    var elementoLibro = [];
    var endpointUrl = 'https://query.wikidata.org/sparql',
    	sparqlQuery = "SELECT DISTINCT ?bookText ?bookTextLabel ?bookTextDescription ?image ?autor ?autorLabel ?fechaPublicado ?genre ?genreLabel ?idioma ?idiomaLabel ?bvmc\n" +
            "WHERE {  \n" +
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
            "OPTIONAL {?bookText wdt:P577 ?fechaPublicado . ?bookText wdt:P18 ?image . ?bookText wdt:P50 ?autor . ?bookText wdt:P136 ?genre . ?bookText wdt:P407 ?idioma . ?bookText wdt:P3976 ?bvmc  } \n" +
            "  #fecha del primer y último libro publicado\n" +
            "  filter (?fechaPublicado > \"1492-01-01\"^^xsd:dateTime && ?fechaPublicado < \"1681-05-26\"^^xsd:dateTime)  \n" +
            "  SERVICE wikibase:label { bd:serviceParam wikibase:language \"[AUTO_LANGUAGE],es,en\". }\n" +
            "}\n" +
            "ORDER BY ASC(?bookTextLabel)\n" +
            "OFFSET "+page+"\n" +
            "LIMIT "+pageLimit+"\n" +
            "\n" +
            "";
    settings = {
        headers: { Accept: 'application/sparql-results+json' },
        data: { query: sparqlQuery},
      };

$.ajax( endpointUrl, settings ).then( function ( data ) {
    if (data.results.bindings != null) {
      // var str = JSON.stringify(data.results.bindings);
      // dataJSON=str;
      for (var i in data.results.bindings) {
        if (data.results.bindings[i] != null) {
          elementoLibro.push(data.results.bindings[i]);
        }
      }
      total = elementoLibro.length;
      // console.log("total libros: "+total);
      for (var i = 0; i < elementoLibro.length; i++) {

        if (elementoLibro[i].image != null) {
          img = elementoLibro[i].image.value;
        }else{
          img="img/default.png";
        }
        if (elementoLibro[i].bookText != null) {
          titLink=elementoLibro[i].bookText.value;
        }
        if (elementoLibro[i].bookTextLabel != null) {
          tit=elementoLibro[i].bookTextLabel.value;
        }
        if (elementoLibro[i].autor != null) {
          autLink=elementoLibro[i].autor.value;
          aut=elementoLibro[i].autorLabel.value;
        }
        document.getElementById("libros").innerHTML +="<div onclick='buscaLibro(this);'class='col-md-2 card'><img src='"+img+"'><h6><a target='_blank' class='link' href='"+titLink+"'</a>"+tit+"</h6><p><a target='_blank' href='"+autLink+"'></a>"+aut+"</p></div>";
        // <p><a target='_blank' href='"+idiLink+"'</a>"+idi+"</p>
        console.log(titLink);
        // <p>"+desc+"</p>
        // <p><a target='_blank' href='"+genLink+"'</a>"+gen+"</p><p>"+fec+"</p><p>BVMC "+bvmc+"</p>
        document.getElementById("pagina").innerHTML= "<span>Pagina "+Math.trunc(page/pageLimit)+"</span>";
      }
    }
  });
}
  var titulo;
function buscaLibro(tit){
  titulo = $(tit).find('.link').text();


      var elemento = [];
      var endpointUrl = 'https://query.wikidata.org/sparql',
      	sparqlQuery = "SELECT DISTINCT ?bookText ?bookTextLabel ?bookTextDescription ?image ?autor ?autorLabel ?fechaPublicado ?genre ?genreLabel ?idioma ?idiomaLabel ?bvmc\n" +
              "WHERE {  \n" +
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
              "OPTIONAL {?bookText wdt:P577 ?fechaPublicado . ?bookText wdt:P18 ?image . ?bookText wdt:P50 ?autor . ?bookText wdt:P136 ?genre . ?bookText wdt:P407 ?idioma . ?bookText wdt:P3976 ?bvmc  } \n" +
              "  #fecha del primer y último libro publicado\n" +
              "  filter (?fechaPublicado > \"1492-01-01\"^^xsd:dateTime && ?fechaPublicado < \"1681-05-26\"^^xsd:dateTime)  \n" +
              "  SERVICE wikibase:label { bd:serviceParam wikibase:language \"[AUTO_LANGUAGE],es,en\". }\n" +
              "}\n" +
              "ORDER BY ASC(?bookTextLabel)\n" +
              "\n" +
              "";
      settings = {
          headers: { Accept: 'application/sparql-results+json' },
          data: { query: sparqlQuery},
        };

  $.ajax( endpointUrl, settings ).then( function ( data ) {
      if (data.results.bindings != null) {
        for (var i in data.results.bindings) {
          if (data.results.bindings[i] != null) {
            elemento.push(data.results.bindings[i]);
          }
        }
        for (var i = 0; i < elemento.length; i++) {
          if (elemento[i] != null) {
            if (elemento[i].bookTextLabel.value == titulo) {
              if (elemento[i].image != null) {
                img = elemento[i].image.value;
                console.log(img);
              }else {
                img="img/default.png";
              }
              if (elemento[i].bookText != null) {
                titLink=elemento[i].bookText.value;
                tit=elemento[i].bookTextLabel.value;
              }
              if (elemento[i].autor != null) {
                autLink=elemento[i].autor.value;
                aut=elemento[i].autorLabel.value;
              }
              if (elemento[i].genre != null) {
                genLink=elemento[i].genre.value;
                gen=MaysPrimera(elemento[i].genreLabel.value);
              }
              if (elemento[i].idioma != null) {
                idiLink=elemento[i].idioma.value;
                idi=MaysPrimera(elemento[i].idiomaLabel.value);
              }
              if (elemento[i].fechaPublicado != null) {
                var fecha = elemento[i].fechaPublicado.value.split("-");
                fec=fecha[0];
              }
              if (elemento[i].bookTextDescription != null) {
                desc=MaysPrimera(elemento[i].bookTextDescription.value);
              }
              if (elemento[i].bvmc != null) {
                bvmcl=elemento[i].bvmc.value;
              }else {
                bvmcl = "No ID";
              }

              $.alert({
              title: "<a target='_blank' href='"+titLink+"'>"+tit+"</a>",
              content:"<p>"+desc+"</p><br/>"
              +"<img class='card' src='"+img+"'><br/>"
              +"<p>Autor: "+aut+"</p>"
              +"<p>Año de publicacion: "+fec+"</p>"
              +"<p>Género: "+gen+"</p>"
              +"<p>Idioma: "+idi+"</p>"
              +"<p>BVMC: "+bvmcl+"</p>",
              });
            }
          }
        }
      }
    });
  }

function pageMenos() {
  page = page-pageLimit;
  if (page = 0){
    page = 1;
  }
  mostrarAutores();
}

function pageMas(){
  page = page+pageLimit;
  if (total > 0) {
    mostrarAutores();
  }else {
    $.alert({
    title: 'No hay mas resultados!',
    content: 'Estamos ampliando nuestras referencias!',
    });
    page=1;
    mostrarAutores();
  }
}

function mostrarAutores(){
  document.getElementById("autores").innerHTML="";
    var elemento = [];
    var endpointUrl = 'https://query.wikidata.org/sparql',
	sparqlQuery = "SELECT DISTINCT ?autor ?autorLabel ?autorDescription ?birth ?birthDeath ?ocupacionLabel ?image ?firma ?bvmc\n" +
        "WHERE{\n" +
        "    {\n" +
        "  ?autor wdt:P31 wd:Q5 . # todas las instancias de humanos\n" +
        "  ?autor wdt:P1412 wd:Q1321 . #lenguas escritas o habladas en español\n" +
        "  ?autor wdt:P27 wd:Q29 . #pais de procedencia\n" +
        "  ?autor wdt:P106 wd:Q36180 . #Escritor  \n" +
        "  ?autor wdt:P569 ?birth.   \n" +
        "  ?autor wdt:P570 ?birthDeath. \n" +
        "  ?autor wdt:P373 ?category .\n" +
        "  ?autor wdt:P106 ?ocupacion.\n" +
        "  }   UNION  {\n" +
        "  ?autor wdt:P31 wd:Q5 . # todas las instancias de humanos\n" +
        "  ?autor wdt:P1412 wd:Q1321 . #lenguas escritas o habladas en español\n" +
        "  ?autor wdt:P27 wd:Q29 . #pais de procedencia\n" +
        "  ?autor wdt:P106 wd:Q49757  . #Poeta  \n" +
        "  ?autor wdt:P569 ?birth.   \n" +
        "  ?autor wdt:P570 ?birthDeath. \n" +
        "  ?autor wdt:P373 ?category .\n" +
        "  ?autor wdt:P106 ?ocupacion .  \n" +
        "  }   UNION  {\n" +
        "  ?autor wdt:P31 wd:Q5 . # todas las instancias de humanos\n" +
        "  ?autor wdt:P1412 wd:Q1321 . #lenguas escritas o habladas en español\n" +
        "  ?autor wdt:P27 wd:Q29 . #pais de procedencia\n" +
        "  ?autor wdt:P106 wd:Q6625963 . #Novelista  \n" +
        "  ?autor wdt:P569 ?birth.   \n" +
        "  ?autor wdt:P570 ?birthDeath. \n" +
        "  ?autor wdt:P373 ?category .\n" +
        "  ?autor wdt:P106 ?ocupacion  . \n" +
        "  }   UNION  {\n" +
        "  ?autor wdt:P31 wd:Q5 . # todas las instancias de humanos\n" +
        "  ?autor wdt:P1412 wd:Q1321 . #lenguas escritas o habladas en español\n" +
        "  ?autor wdt:P27 wd:Q29 . #pais de procedencia\n" +
        "  ?autor wdt:P106 wd:Q487596 . #Dramaturgo  \n" +
        "  ?autor wdt:P569 ?birth.   \n" +
        "  ?autor wdt:P570 ?birthDeath. \n" +
        "  ?autor wdt:P373 ?category .\n" +
        "  ?autor wdt:P106 ?ocupacion  . \n" +
        "  } \n" +
        "\n" +
        "    #nacimiento de garcilaso y calderon de la barca y muerte de calderon\n" +
        "    filter (?birth > \"1492-01-01\"^^xsd:dateTime && ?birth < \"1659-01-01\"^^xsd:dateTime) \n" +
        "    filter (?birthDeath > \"1540-01-01\"^^xsd:dateTime && ?birthDeath < \"1681-05-26\"^^xsd:dateTime) \n" +
        "       #filter (?birthDeath < \"1681-05-26\"^^xsd:dateTime) #muerte de calderon de la barca\n" +
        "  \n" +
        "  OPTIONAL{?autor wdt:P106 ?ocupacion  . ?autor wdt:P373 ?category. ?autor wdt:P18 ?image . ?autor wdt:P109 ?firma . ?autor wdt:P2799 ?bvmc}\n" +
        "  SERVICE wikibase:label { bd:serviceParam wikibase:language \"[AUTO_LANGUAGE],es\". }\n" +
        "}\n" +
        "ORDER BY ASC(?autorLabel)\n" +
        "OFFSET "+page+"\n" +
        "LIMIT "+pageLimit+"\n" +
        "";
    settings = {
        headers: { Accept: 'application/sparql-results+json' },
        data: { query: sparqlQuery }
    };
$.ajax( endpointUrl, settings ).then( function ( data ) {
    if (data.results.bindings != null) {
      for (var i in data.results.bindings) {
        // console.log(data.results.bindings[i]);
        if (data.results.bindings[i] != null) {
          elemento.push(data.results.bindings[i]);
        }
      }
      total = elemento.length;

      for (var i = 0; i < elemento.length; i++) {
        // console.log(elemento[i]);
        if (elemento[i].image != null) {
          image = elemento[i].image.value;
        }else {
          image="img/default.png";
        }
        if (elemento[i].autor != null) {
          autor=elemento[i].autor.value;
          autorLabel=elemento[i].autorLabel.value;
        }
        if (elemento[i].autorDescription != null) {
          autorDescription=elemento[i].autorDescription.value;
        }
        if (elemento[i].ocupacionLabel != null) {
          ocupacionLabel =elemento[i].ocupacionLabel.value;
        }
        document.getElementById("autores").innerHTML +="<div onclick='buscaAutor(this);' class='col-md-2 card'><img src='"+image+"'><h6><a class='link' target='_blank' href='"+autor+"'>"+autorLabel+"</a></h6><p class='desAutor'>"+MaysPrimera(autorDescription)+"</p><p class='desAutor'>"+MaysPrimera(ocupacionLabel)+"</p></div>";
        document.getElementById("pagina").innerHTML= "<span>Pagina "+Math.trunc(page/pageLimit)+" de "+elemento.length/2+"</span>";
      }
    }
  });
}
/* FILTRO POR GENERO */
function ShowSelected(){
  /* Para obtener el valor */
  var cod = document.getElementById("producto").value;
  // console.log(cod);
  /* Para obtener el texto */
  var combo = document.getElementById("producto");
  var selected = combo.options[combo.selectedIndex].text;
  console.log(selected);
}

/* BUSCADOR LIBROS */
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
    document.getElementById("libros").innerHTML = "";
    var searchTermAutor = $("#searchTermAutor").val();
    var searchTermAutorMAY= searchTermAutor.toUpperCase();
    var endpointUrl = 'https://query.wikidata.org/sparql',
    	sparqlQuery = "SELECT DISTINCT ?bookText ?bookTextLabel ?bookTextDescription ?image ?autor ?autorLabel ?fechaPublicado ?genre ?genreLabel ?idioma ?idiomaLabel ?bvmc\n" +
            "WHERE {  \n" +
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
            "OPTIONAL {?bookText wdt:P577 ?fechaPublicado . ?bookText wdt:P18 ?image . ?bookText wdt:P50 ?autor . ?bookText wdt:P136 ?genre . ?bookText wdt:P407 ?idioma . ?bookText wdt:P3976 ?bvmc  } \n" +
            "  #fecha del primer y último libro publicado\n" +
            "  filter (?fechaPublicado > \"1492-01-01\"^^xsd:dateTime && ?fechaPublicado < \"1681-05-26\"^^xsd:dateTime)  \n" +
            "  SERVICE wikibase:label { bd:serviceParam wikibase:language \"[AUTO_LANGUAGE],es,en\". }\n" +
            "}\n" +
            "ORDER BY ASC(?bookTextLabel)\n" +
            "";
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
      document.getElementById("libros").innerHTML += "<h4>Resultados <span style='font-weight:bold'>"+elemento.length+"</span></h4>";
      if (elemento.length > 0) {
        for (var i = 0; i < elemento.length; i++) {
          if (elemento[i].image != null) {
            img = elemento[i].image.value;
          }else {
            img="img/default.png";
          }
          if (elemento[i].bookText != null) {
            titLink=elemento[i].bookText.value;
            tit=elemento[i].bookTextLabel.value;
          }
          if (elemento[i].autor != null) {
            autLink=elemento[i].autor.value;
            aut=elemento[i].autorLabel.value
          }
          if (elemento[i].genre != null) {
            genLink=elemento[i].genre.value;
            gen=MaysPrimera(elemento[i].genreLabel.value);
          }
          if (elemento[i].idioma != null) {
            idiLink=elemento[i].idioma.value
            idi=MaysPrimera(elemento[i].idiomaLabel.value);
          }
          if (elemento[i].fechaPublicado != null) {
            var fecha = elemento[i].fechaPublicado.value.split("-")
            fec=fecha[0];
          }
          if (elemento[i].bookTextDescription != null) {
            desc=MaysPrimera(elemento[i].bookTextDescription.value);
          }
          if (elemento[i].bvmc != null) {
            bvmcl=elemento[i].bvmc.value;
          }else {
            bvmcl = "";
          }
          document.getElementById("libros").innerHTML +="<div onclick='buscaLibro(this)' class='col-md-2 card'><img src='"+img+"'><h6><a class='link' target='_blank' href='"+titLink+"'</a>"+tit+"</h6><p><a target='_blank' href='"+autLink+"'</a>"+aut+"</p></div>";
          // <p><a target='_blank' href='"+idiLink+"'</a>"+idi+"</p>
          // <p>"+desc+"</p>
          // <p><a target='_blank' href='"+genLink+"'</a>"+gen+"</p><p>"+fec+"</p><p>BVMC "+bvmc+"</p>
        }
      }else{
        $.alert({
        title: 'No se han encontrado resultados!!!',
        content: '',
        });
        mostrarLibros()
      }
      // vaciamos el array de libros
      while (elemento.length >0) {
        elemento.pop();
      }
    });
  });
});

/* BUSCADOR AUTORES */
$(function() {
  var elemento = [];
  // click ajax call
  $("#buscaTerminoAutor").keypress(function(e){
    if(e.keyCode===13){
      $.alert({
      title: 'Estoy en ello!',
      content: 'De momento solo click!',
      });
    }
  });

  $("#buscaAutor").on("click", function() {
    document.getElementById("autores").innerHTML = "";
    var searchTermAutor = $("#buscaTerminoAutor").val();
    var searchTermAutorMAY= searchTermAutor.toUpperCase();
    var endpointUrl = 'https://query.wikidata.org/sparql',
	sparqlQuery = "SELECT DISTINCT ?autor ?autorLabel ?autorDescription ?birth ?birthDeath ?ocupacionLabel ?image ?firma ?bvmc\n" +
        "WHERE{\n" +
        "    {\n" +
        "  ?autor wdt:P31 wd:Q5 . # todas las instancias de humanos\n" +
        "  ?autor wdt:P1412 wd:Q1321 . #lenguas escritas o habladas en español\n" +
        "  ?autor wdt:P27 wd:Q29 . #pais de procedencia\n" +
        "  ?autor wdt:P106 wd:Q36180 . #Escritor  \n" +
        "  ?autor wdt:P569 ?birth.   \n" +
        "  ?autor wdt:P570 ?birthDeath. \n" +
        "  ?autor wdt:P373 ?category .\n" +
        "  ?autor wdt:P106 ?ocupacion.\n" +
        "  }   UNION  {\n" +
        "  ?autor wdt:P31 wd:Q5 . # todas las instancias de humanos\n" +
        "  ?autor wdt:P1412 wd:Q1321 . #lenguas escritas o habladas en español\n" +
        "  ?autor wdt:P27 wd:Q29 . #pais de procedencia\n" +
        "  ?autor wdt:P106 wd:Q49757  . #Poeta  \n" +
        "  ?autor wdt:P569 ?birth.   \n" +
        "  ?autor wdt:P570 ?birthDeath. \n" +
        "  ?autor wdt:P373 ?category .\n" +
        "  ?autor wdt:P106 ?ocupacion .  \n" +
        "  }   UNION  {\n" +
        "  ?autor wdt:P31 wd:Q5 . # todas las instancias de humanos\n" +
        "  ?autor wdt:P1412 wd:Q1321 . #lenguas escritas o habladas en español\n" +
        "  ?autor wdt:P27 wd:Q29 . #pais de procedencia\n" +
        "  ?autor wdt:P106 wd:Q6625963 . #Novelista  \n" +
        "  ?autor wdt:P569 ?birth.   \n" +
        "  ?autor wdt:P570 ?birthDeath. \n" +
        "  ?autor wdt:P373 ?category .\n" +
        "  ?autor wdt:P106 ?ocupacion  . \n" +
        "  }   UNION  {\n" +
        "  ?autor wdt:P31 wd:Q5 . # todas las instancias de humanos\n" +
        "  ?autor wdt:P1412 wd:Q1321 . #lenguas escritas o habladas en español\n" +
        "  ?autor wdt:P27 wd:Q29 . #pais de procedencia\n" +
        "  ?autor wdt:P106 wd:Q487596 . #Dramaturgo  \n" +
        "  ?autor wdt:P569 ?birth.   \n" +
        "  ?autor wdt:P570 ?birthDeath. \n" +
        "  ?autor wdt:P373 ?category .\n" +
        "  ?autor wdt:P106 ?ocupacion  . \n" +
        "  } \n" +
        "\n" +
        "    #nacimiento de garcilaso y calderon de la barca y muerte de calderon\n" +
        "    filter (?birth > \"1492-01-01\"^^xsd:dateTime && ?birth < \"1659-01-01\"^^xsd:dateTime) \n" +
        "    filter (?birthDeath > \"1540-01-01\"^^xsd:dateTime && ?birthDeath < \"1681-05-26\"^^xsd:dateTime) \n" +
        "       #filter (?birthDeath < \"1681-05-26\"^^xsd:dateTime) #muerte de calderon de la barca\n" +
        "  \n" +
        "  OPTIONAL{?autor wdt:P106 ?ocupacion  . ?autor wdt:P373 ?category. ?autor wdt:P18 ?image . ?autor wdt:P109 ?firma . ?autor wdt:P2799 ?bvmc}\n" +
        "  SERVICE wikibase:label { bd:serviceParam wikibase:language \"[AUTO_LANGUAGE],es\". }\n" +
        "}\n" +
        "ORDER BY ASC(?autorLabel)\n" +
            "";
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
                  if (j == "autor" && data.results.bindings[i].autor.value.toUpperCase().includes(searchTermAutorMAY)
                    || j == "autorLabel" && data.results.bindings[i].autorLabel.value.toUpperCase().includes(searchTermAutorMAY)) {
                        elemento.push(data.results.bindings[i]);
                  }
                }
              }
            }
          }
        }
      }
      // MOSTRAOS INFO de los Autores resultantes
      document.getElementById("autores").innerHTML += "<h4>Resultados <span style='font-weight:bold'>"+elemento.length+"</span></h4>";
      if (elemento.length > 0) {
        for (var i = 0; i < elemento.length; i++) {
          if (elemento[i].image != null) {
            image = elemento[i].image.value;
          }else {
            image="img/default.png";
          }
          if (elemento[i].autor != null) {
            autor=elemento[i].autor.value;
            autorLabel=elemento[i].autorLabel.value;
          }
          if (elemento[i].autorDescription != null) {
            autorDescription=elemento[i].autorDescription.value;
          }
          if (elemento[i].bvmc != null) {
            bvmca =elemento[i].bvmc.value;
          }
          document.getElementById("autores").innerHTML +="<div onclick='buscaAutor(this);' class='col-md-2 card'><img src='"+image+"'><h6><a class='link' target='_blank' href='"+autor+"'>"+autorLabel+"</a></h6><p class='desAutor'>"+MaysPrimera(autorDescription)+"</p><p class='desAutor'>"+MaysPrimera(ocupacionLabel)+"</p></div>";
          document.getElementById("pagina").innerHTML= "<span>Pagina "+Math.trunc(page/pageLimit)+" de "+elemento.length/2+"</span>";          // <p><a target='_blank' href='"+idiLink+"'</a>"+idi+"</p>
          // <p>"+desc+"</p>
          // <p><a target='_blank' href='"+genLink+"'</a>"+gen+"</p><p>"+fec+"</p><p>BVMC "+bvmc+"</p>
        }
      }else{
        $.alert({
        title: 'No se han encontrado resultados!!!',
        content: '',
        });
        mostrarAutores()
      }
      // vaciamos el array de libros
      while (elemento.length >0) {
        elemento.pop();
      }
    });
  });
});

function buscaAutor(nombre){
      var name = $(nombre).find('.link').text();
      // console.log("name: "+name);
      var elemento = [];
      var endpointUrl = 'https://query.wikidata.org/sparql',
	        sparqlQuery = "SELECT DISTINCT ?autor ?autorLabel ?autorDescription ?birth ?birthDeath ?ocupacionLabel ?image ?firma ?bvmc\n" +
        "WHERE{\n" +
        "    {\n" +
        "  ?autor wdt:P31 wd:Q5 . # todas las instancias de humanos\n" +
        "  ?autor wdt:P1412 wd:Q1321 . #lenguas escritas o habladas en español\n" +
        "  ?autor wdt:P27 wd:Q29 . #pais de procedencia\n" +
        "  ?autor wdt:P106 wd:Q36180 . #Escritor  \n" +
        "  ?autor wdt:P569 ?birth.   \n" +
        "  ?autor wdt:P570 ?birthDeath. \n" +
        "  ?autor wdt:P373 ?category .\n" +
        "  ?autor wdt:P106 ?ocupacion.\n" +
        "  }   UNION  {\n" +
        "  ?autor wdt:P31 wd:Q5 . # todas las instancias de humanos\n" +
        "  ?autor wdt:P1412 wd:Q1321 . #lenguas escritas o habladas en español\n" +
        "  ?autor wdt:P27 wd:Q29 . #pais de procedencia\n" +
        "  ?autor wdt:P106 wd:Q49757  . #Poeta  \n" +
        "  ?autor wdt:P569 ?birth.   \n" +
        "  ?autor wdt:P570 ?birthDeath. \n" +
        "  ?autor wdt:P373 ?category .\n" +
        "  ?autor wdt:P106 ?ocupacion .  \n" +
        "  }   UNION  {\n" +
        "  ?autor wdt:P31 wd:Q5 . # todas las instancias de humanos\n" +
        "  ?autor wdt:P1412 wd:Q1321 . #lenguas escritas o habladas en español\n" +
        "  ?autor wdt:P27 wd:Q29 . #pais de procedencia\n" +
        "  ?autor wdt:P106 wd:Q6625963 . #Novelista  \n" +
        "  ?autor wdt:P569 ?birth.   \n" +
        "  ?autor wdt:P570 ?birthDeath. \n" +
        "  ?autor wdt:P373 ?category .\n" +
        "  ?autor wdt:P106 ?ocupacion  . \n" +
        "  }   UNION  {\n" +
        "  ?autor wdt:P31 wd:Q5 . # todas las instancias de humanos\n" +
        "  ?autor wdt:P1412 wd:Q1321 . #lenguas escritas o habladas en español\n" +
        "  ?autor wdt:P27 wd:Q29 . #pais de procedencia\n" +
        "  ?autor wdt:P106 wd:Q487596 . #Dramaturgo  \n" +
        "  ?autor wdt:P569 ?birth.   \n" +
        "  ?autor wdt:P570 ?birthDeath. \n" +
        "  ?autor wdt:P373 ?category .\n" +
        "  ?autor wdt:P106 ?ocupacion  . \n" +
        "  } \n" +
        "\n" +
        "    #nacimiento de garcilaso y calderon de la barca y muerte de calderon\n" +
        "    filter (?birth > \"1492-01-01\"^^xsd:dateTime && ?birth < \"1659-01-01\"^^xsd:dateTime) \n" +
        "    filter (?birthDeath > \"1540-01-01\"^^xsd:dateTime && ?birthDeath < \"1681-05-26\"^^xsd:dateTime) \n" +
        "       #filter (?birthDeath < \"1681-05-26\"^^xsd:dateTime) #muerte de calderon de la barca\n" +
        "  \n" +
        "  OPTIONAL{?autor wdt:P106 ?ocupacion  . ?autor wdt:P373 ?category. ?autor wdt:P18 ?image . ?autor wdt:P109 ?firma . ?autor wdt:P2799 ?bvmc}\n" +
        "  SERVICE wikibase:label { bd:serviceParam wikibase:language \"[AUTO_LANGUAGE],es\". }\n" +
        "}\n" +
        "ORDER BY ASC(?autorLabel)\n" +
              "\n" +
              "";
      settings = {
          headers: { Accept: 'application/sparql-results+json' },
          data: { query: sparqlQuery},
        };

  $.ajax( endpointUrl, settings ).then( function ( data ) {
      if (data.results.bindings != null) {
        for (var i in data.results.bindings) {
          if (data.results.bindings[i] != null) {
            elemento.push(data.results.bindings[i]);
          }
        }
      //  ?autor ?autorLabel ?autorDescription ?birth ?birthDeath ?ocupacionLabel ?image ?firma ?bvmc
        for (var i = 0; i < elemento.length; i++) {
          if (elemento[i].autorLabel.value && name != null && elemento[i].autorLabel.value == name) {

            if (elemento[i].image != null) {
              image = elemento[i].image.value;
            }else {
              image="img/default.png";
            }
            if (elemento[i].autor != null) {
              autor=elemento[i].autor.value;
              autorLabel=elemento[i].autorLabel.value;
            }
            if (elemento[i].autorDescription != null) {
              autorDescription=MaysPrimera(elemento[i].autorDescription.value);
            }
            if (elemento[i].firma != null) {
              firma=elemento[i].firma.value;
            }else {
              firma="img/firma.png";
            }

            if (elemento[i].bvmc != null) {
              bvmca=elemento[i].bvmc.value;
            }else {
              bvmca = "No BVMC Id";
            }
            if (elemento[i].birth != null) {
              var nacimiento = elemento[i].birth.value.split("-")
              birth=nacimiento[0];
            }
            if (elemento[i].birthDeath != null) {
              var muerte = elemento[i].birthDeath.value.split("-")
              birthDeath=muerte[0];
            }
            if (elemento[i].ocupacionLabel != null) {
              ocupacionLabel = elemento[i].ocupacionLabel.value;
            }

            //var autor, autorLabel, autorDescription, birth, birthDeath, ocupacionLabel, image, firma, bvmca;

            $.alert({
            title: "<a target='_blank' href='"+autor+"'>"+autorLabel+"</a>",
            content:"<p>"+autorDescription+"</p><br/>"
            +"<img class='card' src='"+image+"'><br/>"
            +"<p>BVMC: "+bvmca+"</p>"
            +"<p>Nacimiento: "+birth+"</p>"
            +"<p>Muerte: "+birthDeath+"</p>"
            +"<p>Ocupacion: "+ocupacionLabel+"</p>"
            +"<img class='firma' src='"+firma+"'><br/>"

            ,
            });
          }
        }
      }
    });
  }
