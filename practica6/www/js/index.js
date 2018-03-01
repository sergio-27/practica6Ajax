
var app = {
    // Application Constructor
    initialize: function () {
        getNotes();
        $(document).on('dblclick', 'li', showInput);
        // $('li').click(showInput);
        $('#btnAddNote').click(addNote);
        $(document).on('keypress', 'input', saveTextOnclick);
    }
};

app.initialize();

//var count = 0;

var path = "";

function showInput() {

    // if (count < 1) {
    var input = '<input id="noteContentInput" type="text" value="' + $(this).text() + '"/>';

    $(this).text("");

    $(this).append(input);
    //}

    //count ++;

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
            data: {"noteContent": newText}
        });

    }

}

function makeSelectable() {

}

var newText = '';

//funcion para detectar cuando se pulsa enter y guardar el texto editado
function saveTextOnclick(e) {
    
    var pathHome = 'http://localhost:8080/practica6Ajax/phpFiles/updateNote.php';

    var code = (e.keyCode ? e.keyCode : e.which);
    if (code === 13) { //Enter keycode
        newText = $(this).val();
        //alert(newText);
        $(this).remove();
        
        //obtener id usuario e id nota para pasarlso 
        $.ajax({
           url: pathHome,
           dataType: "jsonp",
           jsonp: "callback",
           data: {"noteContent": newText}
        });
        
    }

}

