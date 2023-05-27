function traerInformacionReservation(){
    $.ajax({
        url:"http://localhost:8080/api/Reservation/all",
        type:"GET",
        datatype:"JSON",
        success:function(respuesta){
            //Acá se puede validar la respuesta.
            $("#div1").empty();
            console.log(respuesta);
            imprimirInformacionReservation(respuesta);
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


function agregarNuevaReservacion() {
    var f = new Date();
    let startDay = "";
    if (f.getMonth() < 10) {
        startDay = f.getFullYear() + "-" + "0" + f.getMonth() + "-" + f.getDate()+"-"+ f.getHours();
    } else {
        startDay = f.getFullYear() + "-" + f.getMonth() + "-" + f.getDate()+"-"+ f.getHours();
    }

    const container = document.querySelector("#selectorCarro");
    const valueSelector = container.firstElementChild.value;
    console.log(valueSelector);

    let myData = {
        startDate: startDay,
        devolutionDate: $("#devolutionDate").val(),
        client:{idClient:$("#idClient").val()},
        car:{idCar:valueSelector}
    };
    let dataToSent = JSON.stringify(myData);
    console.log(dataToSent);
    //{"startDate":"2020-12-20","devolutionDate":"2020-12-20","client":{"idClient":1},"car":{"idCar":1}}
    $.ajax({
        url:"http://localhost:8080/api/Reservation/save",
        type:"POST",
        data: dataToSent,
        contentType: "application/json",
        datatype:"JSON",
        success:function(respuesta){
            //Acá se puede validar la respuesta.
            $("#div1").empty();
            $("#devolutionDate").val("");
            $("#idClient").val("");
            $("#idCar").val("");
            $("#selectorCarro").empty();

            traerInformacionReservation();
            alert("nuevo mensaje agregado");
        },
        error : function(xhr, status) {
            alert('Disculpe, existió un problema'+ xhr);
        }
    });
}