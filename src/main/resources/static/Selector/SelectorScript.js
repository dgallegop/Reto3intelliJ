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