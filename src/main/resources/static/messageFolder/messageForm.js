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

function agregarNuevoMensaje() {
    let myData = {
        messageText: $("#messageText").val(),
        client:{idClient:$("#idClient").val()},
        car:{idCar:$("#idCar").val()}
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
            $("#idCar").val("");
            traerInformacionMensaje();
            alert("nuevo mensaje agregado");
        },
        error : function(xhr, status) {
            alert('Disculpe, existió un problema'+ xhr);
        }
    });
}