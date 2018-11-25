/* Código para las peticiones de archivos. Visor de datos RDF
   Julián Sánchez García Ingeniería Multimedia - UA 2018 */
var cont; // contenedor para mostrar datos
var data; // array de datos XML
var nombre;// nombre del archivo
var tipo; // tipo de archivo
var resultado = document.getElementById("cont");

// inicializa contenedores HTML y array de datos
function cargar() {
  cont = document.getElementById("cont");
	opcion = document.getElementById("opcion");
  data = new Array();
}

// Identifica el tipo de archivo seleccionado y lo muestra
function selectFile(){
	function handleFileSelect(evt) {
	    var files = evt.target.files; // FileList object
	    // propiedades de la lista de archivos del objeto
			nombre = files[0].name;
	    output = [];
      document.getElementById("cont").innerHTML = ""; // limpiar contenedor
      // recorremos la lista del archivo apra mostrar sus propiedades
	    for (var i = 0, f; f = files[i]; i++) {
	      output.push('<li><strong>Nombre de archivo: ', escape(f.name), '</strong> (', f.type || 'n/a', ')</li>',
                    '<li>Tamaño: ',f.size, ' bytes</li>',
	                  '<li>Actualizado: ',f.lastModifiedDate.toLocaleDateString(),'</li>');
	    }
      // almacenamos el tipo de archivo
			var str = nombre;
    	var res = str.split(".");
			tipo = res[1];
      // mostramos nombre del archivo seleccionado
			document.getElementById('list').innerHTML = '<ul>' + output.join('') + '</ul>';
	  }// mostramos datos del archivo seleccionado
	  document.getElementById('files').addEventListener('change', handleFileSelect, false);
}
// lectura JSON
function leerJson(){
  var xmlhttp = requestAjax();
  var cadenaJSON;
  xmlhttp.onreadystatechange = function(){
    if (xmlhttp.readyState === 4 && xmlhttp.status === 200) {
      var datos = JSON.parse(xmlhttp.responseText)
      // console.log(datos);

      // asignar cada propiedad con su valor
      for (var i in datos) {
        // resultado.innerHTML += i + ": " + datos[i] + "<br/>";
        cadenaJSON = JSON.stringify(datos[i]);
        console.log("json como cadena: "+"propiedad: " +i+" Valor: "+cadenaJSON);
        // if (cadenaJSON.hasOwnProperty("id")){
        //   console.log("Id de cadenaJSON: "+cadenaJSON.id);
        // }
        // document.getElementById("cont").innerHTML += i + ": " + datos[i] + "<br/>";

        document.getElementById("cont").innerHTML += i + ": " + cadenaJSON + "<br/>";
      }
    }
  }
  xmlhttp.open("GET","http://localhost/gitRDF/rdfvisor/DATA/"+nombre,true);
  xmlhttp.send();
}
// Lectura del fichero abierto y XML
function leeXML(){
  document.getElementById("cont").innerHTML = ""; // limpiar contenedor
  var request = new requestAjax();
	if (tipo != "json") {
		request.onreadystatechange = function() {
	    if (request.readyState==4 && request.status==200) {
	      if (request.responseXML != null) {
					console.log("Existe el archivo XML: "+request.responseXML);

          var docXML = request.responseXML;
    			console.log("Documento request.responseXML ->");
    			console.log(docXML);
    			console.log("Nombre del nodo -> ");
    			console.log(docXML.documentElement.nodeName);

          var title = docXML.getElementsByTagName("title")[0];
          console.log("Title: "+title);
          if (title != null) {
            var titleText = title.childNodes[0];
            console.log(titleText);
            var titleTextNodeValue = titleText.nodeValue;

          }else {
            var titleTextNodeValue = "SIN DATOS";
          }
					// console.log(request.responseText);
	        // data[1]=request.responseXML.getElementByTagName("edad").item[0];
	        // data[2]=request.responseXML.getElementByTagName("nacionalidad").item[0];
	        // cont.innerHTML+="Nombre: "+data[0].firstChild.nodeValue+"<br/>"
	        // +"Edad: "+data[1].firstChild.nodeValue+"<br/>"
	        // +"Nacionalidad: "+data[2].firstChild.nodeValue+"<br/>";

          document.getElementById("cont").innerHTML +=
          "<h3>Título: "+titleTextNodeValue+"</h3><br/>"
          +"<br/>"
          +this.responseText;
          // document.getElementById("cont").innerHTML = this.responseText;
					// document.getElementById("cont").innerHTML = this.responseText;
	      }
	    }
	  }
	}
	else { // qui abrimos el JSON
		console.log("ES un JSON");
		leerJson();
	}
  // Petición XML
  request.open("GET","http://localhost/gitRDF/rdfvisor/DATA/"+nombre,true);
	request.send();
}
// peticion ajax
function requestAjax(){
  // verificamos el tipo de navegador
  // if (window.XMLHttpRequest) {
  //   // para navegadores nuevos
  //   xmlhttp = new XMLHttpRequest();
  // } else {
  //   // navegadores antiguos
  //   xmlhttp = new ActiveXObject("Microsoft.XMLHTTP");
  // }

  try
  {
    var request = new XMLHttpRequest();
  } catch (error1)
  {
    try
    { // IE 6 o 7
      var request = ActiveXObject("Msxm12.XMLHTTP");
    }
    catch (error2)
    {
      try // IE 5
      {
        var request = ActiveXObject("Microsoft.XMLHTTP");
      } catch (error3)
      {
        var request = false;
      }
    }
  }
  return request;
}
