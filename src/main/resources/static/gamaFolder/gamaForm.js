function traerInformacionGama(){
    $.ajax({
        url:"http://localhost:8080/api/Gama/all",
        type:"GET",
        datatype:"JSON",
        success:function(respuesta){
            //Acá se puede validar la respuesta.
            $("#div1").empty();
            console.log(respuesta);
            imprimirInformacionGama(respuesta);
        }
    });
}
function imprimirInformacionGama(items) {
    var myTable = "<table>";
    myTable += "<tr>";
    myTable += "<th>Name</th>";
    myTable += "</tr>";
    for(i=0 ; i < items.length; i++) {
        myTable += "<tr>";
        myTable += "<td>"+items[i].name+"</td>";
        myTable += "<td> <a href='#' onclick='crearDetalle("+items[i].idGama+")'> detalles </a> </td>";
        myTable += "</tr>";
    }
    myTable += "</table>";
    $("#div1").append(myTable);
}

function crearDetalle(idSus) {
    localStorage.setItem("id",idSus);
}

function agregarNuevaGama() {
    let myData = {
        name: $("#name").val(),
        description: $("#description").val()
    };
    let dataToSent = JSON.stringify(myData);
    $.ajax({
        url:"http://localhost:8080/api/Gama/save",
        type:"POST",
        data: dataToSent,
        contentType: "application/json",
        datatype:"JSON",
        success:function(respuesta){
            //Acá se puede validar la respuesta.
            $("#div1").empty();
            $("#name").val("");
            $("#description").val("");
            traerInformacionGama();
            alert("nuevo elemento agregado");
        }
    });
}