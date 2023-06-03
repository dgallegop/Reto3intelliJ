
//Parte superior
function mostrarDetalle() {
    var id = localStorage.getItem("id");
    var tipo = localStorage.getItem("tipo");
    var array = localStorage.getItem('nombres');
    array = JSON.parse(array);

    $.ajax({
        url:"http://localhost:8080/api/"+tipo+"/"+id,
        type:"GET",
        datatype:"JSON",
        success:function(respuesta){
            //Acá se puede validar la respuesta.
            $("#div1").empty();
            console.log(respuesta);
            imprimirInformacion(respuesta, array, id);
            formatoActualizar(respuesta, array,id);
        }
    });
}
//Parte superior

function imprimirInformacion(items, Nombres, id) {
    var myTable = "<table>";
    myTable += "<tr>";
    for (i= 0; i < Nombres.length; i++) {
        myTable += "<th>"+Nombres[i]+"</th>";
    }
    myTable += "</tr>";
    myTable += "<tr>";
    
    for (const x in items) {
        if(x != "messages"&& x != "reservations" && x != "cars" && x != "gama" && x != "car" && x != "client" && x != "score" && x != "reservation") {
            myTable += "<td>"+items[x]+"</td>";

        } else if (x == "gama") {
            myTable += "<td>"+items[x].name+"</td>";
        }
        console.log(x)
    }
    myTable += "<td> <button onclick ='borrarElemento("+id+")'>Borrar </button>";
    myTable += "</tr>";

    myTable += "</table>";
    $("#div1").append(myTable);
}

//Funcionalidad perfecta
function borrarElemento(idElemento) {
    var nombre = localStorage.getItem("nombreID");
    var id = localStorage.getItem("id");
    var tipo = localStorage.getItem("tipo");
    var url = localStorage.getItem("urlRegresar");
    let myData = {
        nombre: idElemento
    };
    let dataToSent = JSON.stringify(myData);
    $.ajax({
        url:"http://localhost:8080/api/"+tipo+"/"+id,
        type:"DELETE",
        data: dataToSent,
        contentType: "application/json",
        datatype:"JSON",
        success:function(respuesta){
            //Acá se puede validar la respuesta.
            $("#div1").empty();
            mostrarDetalle();
            alert("Se ha eliminado")
            location.href=url;
        }
    });
}

//parte Inferior
function crearJson() {
    var id = localStorage.getItem("id");
    var tipo = localStorage.getItem("tipo");

    $.ajax({
        url:"http://localhost:8080/api/"+tipo+"/"+id,
        type:"GET",
        datatype:"JSON",
        success:function(respuesta){
            //Acá se puede validar la respuesta.
            var nombre = localStorage.getItem("nombreID");

            let myData = {};
            myData[nombre] = id;
            for (const x in respuesta) {
                if(x != "messages"&& x != "reservations" && x != nombre && x != "gama" && x != "score" && x != "status" ) {
                    var valorObtenido = x;
                    myData[valorObtenido] = $("#"+x+"").val()
                }
            }
            editarInformacion(myData);
        }
    });
}
function editarInformacion(data) {
    var tipo = localStorage.getItem("tipo");
    let dataToSent = JSON.stringify(data);
    console.log(dataToSent);
    $.ajax({
        url:"http://localhost:8080/api/"+tipo+"/update",
        type:"PUT",
        data: dataToSent,
        contentType: "application/json",
        datatype:"JSON",
        success:function(respuesta){
            //Acá se puede validar la respuesta.
            $("#div1").empty();
            $("#div2").empty();
            mostrarDetalle();
            alert("Se ha actualizado");
        }
    });

}

function formatoActualizar(items,Nombres,id) {
    var nombre = localStorage.getItem("nombreID");
    var myTable = "<table>";
    myTable += "<tr>";
    for (i= 0; i < Nombres.length; i++) {
        myTable += "<th>"+Nombres[i]+"</th>";
    }
    myTable += "</tr>";

    myTable += "<tr>";
    myTable += "<td>"+id+"</td>";
    for (const x in items) {
        if(x != "messages"&& x != "reservations" && x != nombre && x != "gama" && x != "cars" && x != "car" && x != "client" && x != "score"&& x != "reservation") {
            if(isString(items[x])) {
                console.log("Los strings son "+items[x]);
                myTable += "<td> <input type="+'text'+" id="+x+" placeholder="+items[x]+"> </td>"
            } else {
                console.log("Los number son "+items[x]);
                myTable += "<td> <input type="+'number'+" id="+x+" placeholder="+items[x]+"> </td>"
            }
        }else if (x == "gama") {
            myTable += "<td>"+items[x].name+"</td>";
        }
    }

    myTable += "</tr>";

    myTable += "</table>";
    $("#div2").append(myTable);
}
function isString(x) {
    return Object.prototype.toString.call(x) === '[object String]';
}
function volver() {
    var url = localStorage.getItem("urlRegresar");
    location.href=url;
}