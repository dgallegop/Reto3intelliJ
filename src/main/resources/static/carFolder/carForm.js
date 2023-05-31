function traerInformacionCarro(){
    $.ajax({
        url:"http://129.151.104.11:8080/api/Car/all",
        type:"GET",
        datatype:"JSON",
        success:function(respuesta){
            //Acá se puede validar la respuesta.
            $("#div1").empty();
            console.log(respuesta);
            imprimirInformacionCarro(respuesta);
        }
    });
}
function imprimirInformacionCarro(items) {
    var myTable = "<table>";
    myTable += "<tr>";
    myTable += "<th>Brand</th>";
    myTable += "</tr>";
    for(i=0 ; i < items.length; i++) {
        myTable += "<tr>";
        myTable += "<td>"+items[i].brand+"</td>";
        myTable += "<td> <a href='#' onclick='crearDetalle("+items[i].idCar+")'> detalles </a> </td>";
        myTable += "</tr>";
    }
    myTable += "</table>";
    $("#div1").append(myTable);
}

function crearDetalle(idSus) {
    localStorage.setItem("id",idSus);
    location.href="carDetailFolder/carDetailIndex.html";
}

function agregarNuevoCarro() {

    let myData = {
        name: $("#name").val(),
        brand: $("#brand").val(),
        year : $("#year").val(),
        description : $("#description").val(),
        gama : {idGama: $("#idGama").val()}
    };
    //{"name":"F8","brand":"Ferrari","year":"2023","description":"Ferrari F8 nes","gama":{"idGama":1}}
    let dataToSent = JSON.stringify(myData);
    console.log(dataToSent);
    $.ajax({
        url:"http://129.151.104.11:8080/api/Car/save",
        type:"POST",
        data: dataToSent,
        contentType: "application/json",
        datatype:"JSON",
        success:function(respuesta){
            //Acá se puede validar la respuesta.
            $("#div1").empty();
            $("#name").val("");
            $("#brand").val("");
            $("#year").val("");
            $("#description").val("");
            $("#idGama").val("");
            traerInformacionCarro();
            alert("nuevo elemento agregado");
        }
    });
}