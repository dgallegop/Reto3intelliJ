function traerInformacionCliente(){
    $.ajax({
        url:"http://localhost:8080/api/Client/all",
        type:"GET",
        datatype:"JSON",
        success:function(respuesta){
            //Acá se puede validar la respuesta.
            $("#div1").empty();
            console.log(respuesta);
            imprimirInformacionCliente(respuesta);
        }
    });
}
function imprimirInformacionCliente(items) {
    var myTable = "<table>";
    myTable += "<tr>";
    myTable += "<th>Name</th>";
    myTable += "</tr>";
    for(i=0 ; i < items.length; i++) {
        myTable += "<tr>";
        myTable += "<td>"+items[i].name+"</td>";
        myTable += "<td> <a href='#' onclick='crearDetalle("+items[i].idClient+")'> detalles </a> </td>";
        myTable += "</tr>";
    }
    myTable += "</table>";
    $("#div1").append(myTable);
}

function crearDetalle(idSus) {
    localStorage.setItem("id",idSus);
    localStorage.setItem("tipo","Client");
    var array = ["idClient","email","password","name","age"]
    localStorage.setItem("nombres", JSON.stringify(array));
    localStorage.setItem("nombreID", "idClient")
    localStorage.setItem("urlRegresar", "../clientFolder/clientIndex.html");
    location.href="../detailFolder/detail.html";

}

function agregarNuevoCliente() {
    if($("#name").val() != "" && $("#email").val() != "" && $("#password").val() != "" && $("#age").val() != "") {
        let myData = {
            name : $("#name").val(),
            email: $("#email").val(),
            password: $("#password").val(),
            age:$("#age").val()
        };


        //{"name":"Agustin Parra","email":"agustin@gmail.com","password":"agustin123","age":18}
        let dataToSent  = JSON.stringify(myData);
        console.log(dataToSent);
        $.ajax({
            url:"http://localhost:8080/api/Client/save",
            type:"POST",
            data: dataToSent,
            contentType: "application/json",
            datatype:"JSON",
            success:function(respuesta){
                //Acá se puede validar la respuesta.
                $("#div1").empty();
                $("#email").val("");
                $("#password").val("");
                $("#name").val("");
                $("#age").val("");
                traerInformacionCliente();
                alert("nuevo elemento agregado");
            }
        });
    } else {
        alert("Ingese los datos requeridos");
    }
}