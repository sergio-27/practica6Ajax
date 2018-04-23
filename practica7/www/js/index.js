var app = {
    // Application Constructor
    initialize: function () {
        //  document.addEventListener('deviceready', this.onDeviceReady.bind(this), false);
        $("#logBtn").click(getCredentials);
        //ocultamos algunos elementos
        $("#signBtn").hide(true);
        $("#passBox2").hide(true);
        $("#main").hide(true);
        $("#ratePhotoDiv").hide();
        $("#uploadPhotoDiv").hide();
        $("#seePhotoDiv").hide();
        
        

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
    
    //console.log(email);

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
                showImage();
                $("#ratePhotoDiv").show();
                
                alert("Bienvenido");
                //mostramos la pantalla principal
                $("#main").show();
                
            }else{
                alert("Datos incorrectos, intentelo de nuevo o registrese.");
                showField();
            }
            
            
        }
    });
    
    function showImage(){
        var tagImg = $("<img />");
        tagImg.attr("src", "http://localhost/practicasAjax/practica7/www/img/68b9169600.jpg");
        
        $("#divPhoto").append(tagImg);
    }

}





app.initialize();