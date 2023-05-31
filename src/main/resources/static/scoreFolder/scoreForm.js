function traerInformacionScore(){
    $.ajax({
        url:"http://localhost:8080/api/Score/all",
        type:"GET",
        datatype:"JSON",
        success:function(respuesta){
            //Acá se puede validar la respuesta.
            $("#div1").empty();
            console.log(respuesta);
            imprimirInformacionScore(respuesta);
        }
    });
}
function imprimirInformacionScore(items) {
    var myTable = "<table>";
    myTable += "<tr>";
    myTable += "<th>messageText</th>";
    myTable += "</tr>";
    for(i=0 ; i < items.length; i++) {
        myTable += "<tr>";
        myTable += "<td>"+items[i].messageText+"</td>";
        myTable += "<td> <a href='#' onclick='crearDetalle("+items[i].idScore+")'> detalles </a> </td>";
        myTable += "</tr>";
    }
    myTable += "</table>";
    $("#div1").append(myTable);
}

function crearDetalle(idSus) {
    localStorage.setItem("id",idSus);
    location.href="../DETAILMESSAGEFOLDER/detailmessageindex.html";
}

function agregarNuevaScore() {
    let myData = {
        messageText: $("#messageText").val(),
        starts: $("#starts").val(),
        //reservation:{idReservation:$("#idReservation").val()}
    };
    let dataToSent = JSON.stringify(myData);
    console.log(dataToSent);
    //{"messageText":"luego2","starts":5, "reservation":{"idReservation":1}}
    $.ajax({
        url:"http://localhost:8080/api/Score/save",
        type:"POST",
        data: dataToSent,
        contentType: "application/json",
        datatype:"JSON",
        success:function(respuesta){
            //Acá se puede validar la respuesta.
            $("#div1").empty();
            $("#messageText").val("");
            $("#starts").val("");
            $("#idReservation").val("");
            traerInformacionScore();
            alert("nuevo mensaje agregado");
        },
        error : function(xhr, status) {
            alert('Disculpe, existió un problema'+ xhr);
        }
    });
}