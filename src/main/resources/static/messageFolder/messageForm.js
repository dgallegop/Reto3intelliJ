function traerInformacionMensaje(){
    $.ajax({
        url:"http://localhost:8080/api/Message/all",
        type:"GET",
        datatype:"JSON",
        success:function(respuesta){
            //Acá se puede validar la respuesta.
            $("#div1").empty();
            console.log(respuesta);
            imprimirInformacionMensaje(respuesta);
            traerInformacionCarro();
        }
    });
}

function traerInformacionCarro(){
    $.ajax({
        url:"http://localhost:8080/api/Car/all",
        type:"GET",
        datatype:"JSON",
        success:function(respuesta){
            //Acá se puede validar la respuesta.
            console.log(respuesta);
            $("#selectorCarro").empty();
            creacionSelector(respuesta);
        }
    });
}
function imprimirInformacionMensaje(items) {
    var myTable = "<table>";
    myTable += "<tr>";
    myTable += "<th>Message</th>";
    myTable += "</tr>";
    for(i=0 ; i < items.length; i++) {
        myTable += "<tr>";
        myTable += "<td>"+items[i].messageText+"</td>";
        myTable += "<td> <a href='#' onclick='crearDetalle("+items[i].idMessage+")'> detalles </a> </td>";
        myTable += "</tr>";
    }
    myTable += "</table>";
    $("#div1").append(myTable);
}

function crearDetalle(idSus) {
    localStorage.setItem("id",idSus);
    location.href="../DETAILMESSAGEFOLDER/detailmessageindex.html";
}

function creacionSelector(items) {
    var mySelect = "<select name='Carro'>";
    mySelect += "<optgroup label= CarrosDisponibles>";
    for(i=0 ; i < items.length; i++) {
        mySelect += "<option value='"+items[i].idCar+"'>"+items[i].name+"</option>";
    }
    mySelect += "</optgroup>";
    mySelect += "</select>";
    $("#selectorCarro").append(mySelect);
}

function agregarNuevoMensaje() {

    const container = document.querySelector("#selectorCarro");
    const valueSelector = container.firstElementChild.value;
    console.log(valueSelector);

    let myData = {
        messageText: $("#messageText").val(),
        client:{idClient:$("#idClient").val()},
        car:{idCar:valueSelector}
    };
    let dataToSent = JSON.stringify(myData);
    console.log(dataToSent);
    //{"messageText":"Me gusta.","client":{"idClient":1},"car":{"idCar":1}}
    $.ajax({
        url:"http://localhost:8080/api/Message/save",
        type:"POST",
        data: dataToSent,
        contentType: "application/json",
        datatype:"JSON",
        success:function(respuesta){
            //Acá se puede validar la respuesta.
            $("#div1").empty();
            $("#messageText").val("");
            $("#idClient").val("");
            $("#selectorCarro").empty();
            traerInformacionMensaje();
            alert("nuevo mensaje agregado");
        },
        error : function(xhr, status) {
            alert('Disculpe, existió un problema'+ xhr);
        }
    });
}