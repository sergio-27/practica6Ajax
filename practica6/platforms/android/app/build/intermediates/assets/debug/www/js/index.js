
var app = {
    // Application Constructor
    initialize: function () {
        getNotes();
        $(document).on('dblclick', 'li', showInput);
        // $('li').click(showInput);
        $('#btnAddNote').click(addNote);
        $(document).on('keypress', 'input', saveTextOnclick);
        $(document).on('click', '#deleteBtn', deleteFromDatabase);
        $(document).on('click', '#cancelBtn', cancelFunction);
        $("#updateBtn").click(updatePage);
        $("#loginBtn").click(checkUserLogin);
        $("#signUpBtn").click(signUpUser);
        $("#btnClose").click(function (){
            $("#signUpDialog").css('display', 'none');
        });

    }
};

app.initialize();

//var count = 0;

var path = "";
var oldValue = "";
var noteId;
var loginSuccess = false;



function checkUserLogin() {
    //comprobar si el login es correcto

    if (loginSuccess) {
        //si es correcto configuramos el atributo href al valor correcto para que muestre la lista
        $("#panelTitleHRef").attr("href", "#noteContentPanel");
        
        
    } else {
        //si el login no es correcto o no esta registrado se muestra alerta y se deja el valor de href tal y como esta
        $("#panelTitleHRef").attr("href", "");
        
    }

}

function showInput() {

    //obtenemos el total de inputs para evitar que se  pueda modificar mas de uno a la vez
    var totalInput = $("#noteList input").length;

    totalInput = parseInt(totalInput);

    if (totalInput < 1) {

        var noteid = $(this).attr("noteid");
        //guardamos el id de la nota seleccionada para poder eliminar o modificar 
        noteId = noteid;
        console.log(noteid);

        var cancelBtn = '<button id="cancelBtn" class="btn btn-warning btn-sm">Cancel</button>';
        var deleteBtn = '<button id="deleteBtn" class="btn btn-danger btn-sm">Delete</button>';
        var input = '<input id="noteContent" type="text" noteid="' + noteid + '" value="' + $(this).text() + '"/>';

        //oldValue = $(this).val();

        //$(this).text("");

        $(this).append(input);
        $(this).append(deleteBtn);
        $(this).append(cancelBtn);
    }

}


function updatePage() {
    location.reload();
}

function cancelFunction() {
    $("#noteContent").remove();
    $("#deleteBtn").remove();
    $(this).remove();
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

//funcion para añadir usuario
function signUpUser(){
    $("#signUpDialog").css('display', 'block');
    
    
    
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
        complete: function () {
            alert("Nota eliminada");
            $("#noteList").listview('refresh');
        }
    });

    //elimnamos el input y el boton
    $("#noteContent").remove();
    $(this).remove();
    $("#cancelBtn").remove();


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
            complete: function () {
                $("#noteList").listview('refresh');
            }
        });

        $("#noteContent").remove();
        $("#deleteBtn").remove();
        $("#cancelBtn").remove();

    }


}

