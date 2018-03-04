
var app = {
    // Application Constructor
    initialize: function () {
        getNotes();
        $(document).on('dblclick', 'li', showInput);
        // $('li').click(showInput);
        $('#btnAddNote').click(addNote);
        $(document).on('keypress', 'input', saveTextOnclick);
        $(document).on('click', '#deleteBtn', deleteFromDatabase);
    }
};

app.initialize();

//var count = 0;

var path = "";
var oldValue = "";
var noteId;

function showInput() {

    //obtenemos el total de inputs para evitar que se  pueda modificar mas de uno a la vez
    var totalInput = $("#noteList input").length;

    totalInput = parseInt(totalInput);

    if (totalInput < 1) {

        var noteid = $(this).attr("noteid");
        //guardamos el id de la nota seleccionada para poder eliminar o modificar 
        noteId = noteid;
        console.log(noteid);

        var deleteBtn = '<button id="deleteBtn" class="btn btn-danger btn-sm">Delete</button>';
        var input = '<input id="noteContent" type="text" noteid="' + noteid + '" value="' + $(this).text() + '"/>';

        //oldValue = $(this).val();

        //$(this).text("");

        $(this).append(input);
        $(this).append(deleteBtn);
    }

}
var pathStucom = 'http://localhost/practica6Ajax/phpFiles/index.php';

function getNotes() {

    var pathHome = 'http://localhost:8080/practica6Ajax/phpFiles/index.php';

    $.ajax({
        dataType: 'jsonp',
        //sirve para poder realizar consultas entre servidores
        jsonp: 'callback',
        url: pathHome,
        success: function (data) {

            for (var k = 0; k < data.length; k++) {
                var content = "";

                content = data[k].noteContent;

                var noteItem = $('<li id="userNote" class="list-group-item" userid="' + data[k].userid + '" noteid="' + data[k].noteid + '">' + content + '</li>');

                if (content !== "")
                    $("#noteList").append(noteItem);
            }
        }
    });
}

//funcion para añadir nota
function addNote() {

    var pathHome = 'http://localhost:8080/practica6Ajax/phpFiles/insertNote.php';

    var newText = prompt('Write some text. Then click add to add note.');

    if (newText !== null) {

        var nodoNota = $('<li class="list-group-item" userid="" noteid="">' + newText + '</li>');

        $("#noteList").append(nodoNota);

        //consulta ajax para añadir usuario a base de datos
        $.ajax({
            url: pathHome,
            dataType: "jsonp",
            jsonp: "callback",
            data: {"noteContent": newText},
            succes: function () {

            }
        });

    }

}

function deleteFromDatabase() {
    
    var pathHome = 'http://localhost:8080/practica6Ajax/phpFiles/deleteNote.php';
    
    $.ajax({
        url: pathHome,
        dataType: "jsonp",
        jsonp: "callback",
        data: {"noteid": noteId},
        succes: function(){
              alert("Nota eliminada");
        }
    });
    
    //elimnamos el input y el boton
    $("#noteContent").remove();
    $(this).remove();
   
    
}

var newText = '';

//funcion para detectar cuando se pulsa enter y guardar el texto editado
function saveTextOnclick(e) {

    var pathHome = 'http://localhost:8080/practica6Ajax/phpFiles/updateNote.php';

    var code = (e.keyCode ? e.keyCode : e.which);
    if (code === 13) { //Enter keycode
        newText = $(this).val();
        //alert(newText);


        //obtener id usuario e id nota para pasarlso 
        $.ajax({
            url: pathHome,
            dataType: "jsonp",
            jsonp: "callback",
            data: {"noteContent": newText, "noteid": noteId},
            succes: function () {

            }
        });

        

    }


}

