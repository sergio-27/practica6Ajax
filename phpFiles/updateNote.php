
<?php

$dbhost = 'localhost';
$dbuser = 'root';
$dbpass = '';
$database = 'practicanotas';

//cargamos el archivo html al que queremos acceder cuando se ejecute un update


//cargamos el archivo html con el que queremos trabajar
$html = file_get_contents('C:\xampp\htdocs\practica6Ajax\practica6\www\index.html');

//para ello utilizamo un objeto del tipo DOM
$dom = new DOMDocument();

//cargamos el dom con el archvo especificado
@$dom->loadHTMLFile($html);

//filtramos por nombre de atributo
$inputTag = $dom->getElementsByTagName('input');


$noteId = 0;

for ($i = 0; $i < $inputTag->length; $i++){
    echo 'in';
    $noteId = $inputTag->item($i)->getAttribute('noteid');
}


$conn = mysqli_connect($dbhost, $dbuser, $dbpass, $database) or die("Error");

$noteContentInput = $_REQUEST['noteContent'];
//$noteId = $_REQUEST['noteid'];
//$noteId = 2;
echo 'noteid: '.$noteId;

$updateQuery = "UPDATE notas SET noteContent = '$noteContentInput' WHERE noteid = '$noteId'";


if (mysqli_query($conn, $updateQuery)) {
    echo "New record created successfully";
} else {
    echo "Error: " . $updateQuery . "<br>" . mysqli_error($conn);
}

$resposta2 = '{"noteContent": '.$noteContentInput.'}';

if (isset($_GET['callback'])) {
    echo $_GET['callback'] . '(' . $resposta2 . ')';
} else {
    echo ($resposta2);
} 