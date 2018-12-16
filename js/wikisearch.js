$(function() {
      var page = 1,
          pagelimit = 5,
          totalRecord = 0;
          fetchData();

      $(".prev-btn").on("click",function(){
        if (page > 1) {
          page--;
          fetchData();
        }
        console.log("prev: "+page);
      });

      $(".next-btn").on("click",function(){
        if (page * pagelimit < totalRecord) {
          page++;
          fetchData();
        }
        console.log("next: "+page);
      });

  // click ajax call
  function fetchData(){
    // enter
    $("#searchTerm").keypress(function(e){
    	if(e.keyCode===13){
    		var searchTerm = $("#searchTerm").val();
        var url = "https://en.wikipedia.org/w/api.php?action=opensearch&search="+ searchTerm +"&limit=1000&format=json&callback=?";
		    $.ajax({
			url: url,
			type: 'GET',
			contentType: "application/json; charset=utf-8",
			async: false,
        	dataType: "json",
        	success: function(data, status, jqXHR) {
        		//console.log(data);
            $("#cont").html();
            $("#cont").empty()
        		for(var i=0;i<data[1].length;i++){
              $("#cont").prepend("<div class='well'><a href="+data[3][i]+" target='_blank' rel='noopener'><h5>" + data[1][i]+ "</h5>" + "</a><p>" + data[2][i] + "</p></div>");
        		}
        	}
	      })
    	}
    });

    $("#search").on("click", function() {
    var searchTerm = $("#searchTerm").val();
    if (searchTerm=="") {
      // swal("No has escrito nada payaso!","");
      $.alert({
      title: 'Campo vacío!',
      content: 'Introduce un texto!',
      });
    }
    var url = "https://en.wikipedia.org/w/api.php?action=opensearch&search="+ searchTerm +"&limit=1000&format=json&callback=?";
    $.ajax({
      url: url,
      type: 'GET',
      contentType: "application/json; charset=utf-8",
      async: false,
          dataType: "json",
          data:{
            page:page,
            pagelimit:pagelimit
          },
          // plop data
          success: function(data, status, jqXHR) {
          totalRecord = data[1].length;
          for (var i = 0; i < data[1].length; i++) {
            console.log("DATA: "+data[3]);
          }
          $("#cont").html();
          $("#cont").empty();
          $("#titulo").empty();
          $("#titulo").prepend("<h5>Resultados de búsqueda: <small>"+data[1].length+"</small></h5>");
          for(var i=0;i<data[1].length;i++){
            $("#cont").prepend("<div class='well'><a href="+data[3][i]+" target='_blank' rel='noopener'><h5>" + data[1][i]+ "</h5>" + "</a><p>" + data[2][i] + "</p></div>");
          }
        }
      })
    });
  }
});
