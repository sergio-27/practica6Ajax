var app = {
    // Application Constructor
    initialize: function () {
        //  document.addEventListener('deviceready', this.onDeviceReady.bind(this), false);
        $("#logBtn").click(getCredentials);
        //ocultamos algunos elementos del signup
        $("#signBtn").hide(true);
        $("#passBox2").hide(true);

    }

};

//funciones de los click
function OnDevReady() {

}

function showField(){
    $("#signBtn").show();
        $("#passBox2").show();
}


function getCredentials() {
    var email = $("#emailBox").val();
    var pass = $("#passBox").val();
    console.log(email);

    var path = 'http://localhost/practicasAjax/phpFiles/phpPractica7/login.php';

    $.ajax({
        url: path,
        dataType: "jsonp",
        jsonp: "callback",
        data: {"email": email, "password": pass},
        complete: function () {
            
            
        },
        success: function (data) {
            if(data !== null){
                $("#accesForm").hide(true);
                
                alert("Bienvenido");
                //mostramos la pantalla principal
                
            }else{
                alert("Datos incorrectos, intentelo de nuevo.");
            }
            
            
        }
    });

}





app.initialize();