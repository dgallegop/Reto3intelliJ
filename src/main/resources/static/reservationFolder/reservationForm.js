function traerInformacionReservation(){
    $.ajax({
        url:"http://129.151.104.11:8080/api/Reservation/all",
        type:"GET",
        datatype:"JSON",
        success:function(respuesta){
            //Acá se puede validar la respuesta.
            $("#div1").empty();
            console.log(respuesta);
            imprimirInformacionReservation(respuesta);
        }
    });
}
function imprimirInformacionReservation(items) {
    var myTable = "<table>";
    myTable += "<tr>";
    myTable += "<th>startDate</th>";
    myTable += "</tr>";
    for(i=0 ; i < items.length; i++) {
        myTable += "<tr>";
        myTable += "<td>"+items[i].startDate+"</td>";
        myTable += "<td> <a href='#' onclick='crearDetalle("+items[i].idReservation+")'> detalles </a> </td>";
        myTable += "</tr>";
    }
    myTable += "</table>";
    $("#div1").append(myTable);
}

function crearDetalle(idSus) {
    localStorage.setItem("id",idSus);
    location.href="../DETAILMESSAGEFOLDER/detailmessageindex.html";
}

function agregarNuevaReservacion() {
    let myData = {
        startDate: $("#startDate").val(),
        devolutionDate: $("#devolutionDate").val(),
        client:{idClient:$("#idClient").val()},
        car:{idCar:$("#idCar").val()}
    };
    let dataToSent = JSON.stringify(myData);
    console.log(dataToSent);
    //{"startDate":"2020-12-20","devolutionDate":"2020-12-20","client":{"idClient":1},"car":{"idCar":1}}
    $.ajax({
        url:"http://129.151.104.11:8080/api/Reservation/save",
        type:"POST",
        data: dataToSent,
        contentType: "application/json",
        datatype:"JSON",
        success:function(respuesta){
            //Acá se puede validar la respuesta.
            $("#div1").empty();
            $("#startDate").val("");
            $("#devolutionDate").val("");
            $("#idClient").val("");
            $("#idCar").val("");

            traerInformacionReservation();
            alert("nuevo mensaje agregado");
        },
        error : function(xhr, status) {
            alert('Disculpe, existió un problema'+ xhr);
        }
    });
}