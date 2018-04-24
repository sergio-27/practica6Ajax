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
        
         $("#ratePhoto").click(hideSectionsOnRate);
        $("#uploadPhoto").click();
        $("#seePhoto").click();        
        

    }

};

var urlWebHost = "https://stucomspace.000webhostapp.com/PracticaCamara/login.php";
var urlStucom = "http://localhost/practicasAjax/phpFiles/phpPractica7/login.php";

//funciones de los click
function OnDevReady() {

}

function hideSectionsOnRate(){
    if ($("#uploadPhotoDiv").is(":visible")){
        $("#uploadPhotoDiv").hide();
    }
    
     if ($("#seePhotoDiv").is(":visible")){
        $("#seePhotoDiv").hide();
    }
}



function showField(){
    $("#signBtn").show();
    $("#passBox2").show();
}

function getCredentials() {
    var email = $("#emailBox").val();
    var pass = $("#passBox").val();
    
    //console.log(email);

   
    $.ajax({
        url: urlWebHost,
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