// executes the query
function sendData(FD) {
    if (FD.get('f').replace(/\s/g, "").length < 4) {
        return;
    }

    const XHR = new XMLHttpRequest();

    var parameters = [];
    for (var pair of FD.entries()) {
        parameters.push(encodeURIComponent(pair[0]) + '=' + encodeURIComponent(pair[1]));
    }

    XHR.addEventListener( "load", function(event) {
        document.getElementById( "inputSearch" ).disabled = false;
        document.getElementById( "buttonSubmitSearch" ).disabled = false;
        document.getElementById( "iconSearch" ).classList="fa fa-search";

        if (event.target.status != 200) {
            var results = '<div class="search-results"><h1 class="title">Ouch</h1>';
            results += "<p>Hubo un error. Por favor intente más tarde.";
            results += "</div>";

            document.getElementById( "resultados" ).innerHTML = results;
        }
        else {
            var jsonResponse = JSON.parse(event.target.responseText);
            var results = '<div class="search-results"><h1 class="title">Resultados</h1>';
            if (jsonResponse.length > 0) {
	            results += '<table><thead>';
                results += '<tr><th>Posici&oacute;n</th><th>Nombre</th>'+
                           '<th>Tiempo</th><th>Promedio</th><th>Sexo</th><th>Categor&iacute;a</th><th>Distancia</th><th>Edici&oacute;n</th></tr>';
                results += '</thead><tbody>';
                for (var result of jsonResponse) {	
                    results += '<tr><td>'+result["posicion"]+'</td><td>'+result["nombre"]+'</td><td>'
                                +result["tiempo"]+'</td><td>'+result["promedio"]+'</td><td>'+result["sexo"]+'</td><td>'+result["categoria"]
                                +'</td><td>'+result["distancia"]+'</td><td>'+result["edicion"]+'</td></tr>';
                }
                results += '</tbody></table>';
            }
            else {
                results += '<div class="post">Sin resultados</div>';
            }

            // window.history.pushState("", "", "/search/");

            results += "</div>";
        }

        document.getElementById( "resultados" ).innerHTML = results;
    });

    XHR.addEventListener( "error", function( event ) {
        document.getElementById( "inputSearch" ).disabled = false;
        document.getElementById( "buttonSubmitSearch" ).disabled = false;
        document.getElementById( "iconSearch" ).classList="fa fa-search";

        var results = '<div class="search-results"><h1 class="title">Ouch</h1>';
        results += "<p>Hubo un error, por favor intente más tarde.";
        results += "</div>";

        document.getElementById( "resultados" ).innerHTML = results;

        console.log('Request failed:' + event);
    });
    
    XHR.open( "GET", searchUrl + "?" + parameters.join('&'));
    XHR.send();

    document.getElementById( "inputSearch" ).disabled = true;
    document.getElementById( "buttonSubmitSearch" ).disabled = true;
    document.getElementById( "iconSearch" ).classList="fa fa-spinner";
}
