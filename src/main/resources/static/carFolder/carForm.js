function traerInformacionCarro(){
    $.ajax({
        url:"http://localhost:8080/api/Car/all",
        type:"GET",
        datatype:"JSON",
        success:function(respuesta){
            //Acá se puede validar la respuesta.
            $("#div1").empty();
            console.log(respuesta);
            traerInformacionGama();
            imprimirInformacionCarro(respuesta);
        }
    });
}
function traerInformacionGama(){
    $.ajax({
        url:"http://localhost:8080/api/Gama/all",
        type:"GET",
        datatype:"JSON",
        success:function(respuesta){
            //Acá se puede validar la respuesta
            console.log(respuesta);
            $("#selectorGama").empty();

            creacionSelector(respuesta);
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

function creacionSelector(items) {
    var mySelect = "<select name='Gamas'>";
    mySelect += "<optgroup label= GamasDisponibles>";
    for(i=0 ; i < items.length; i++) {
    mySelect += "<option value='"+items[i].idGama+"'>"+items[i].name+"</option>";
   }
    mySelect += "</optgroup>";
    mySelect += "</select>";
    $("#selectorGama").append(mySelect);
}

function crearDetalle(idSus) {
    localStorage.setItem("id",idSus);
    location.href="carDetailFolder/carDetailIndex.html";
}

function agregarNuevoCarro() {
    const container = document.querySelector("#selectorGama");
    const valueSelector = container.firstElementChild.value;
    console.log(valueSelector);
    let myData = {
        name: $("#name").val(),
        brand: $("#brand").val(),
        year : $("#year").val(),
        description : $("#description").val(),
        gama : {idGama: valueSelector}
    };
    //{"name":"F8","brand":"Ferrari","year":"2023","description":"Ferrari F8 nes","gama":{"idGama":1}}
    let dataToSent = JSON.stringify(myData);

    $.ajax({
        url:"http://localhost:8080/api/Car/save",
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
            $("#selectorGama").empty();
            traerInformacionCarro();
            alert("nuevo elemento agregado");
        }
    });
}