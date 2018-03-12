<?php

header('Content-type:application/javascript');

$dbhost = 'localhost';
//$database = 'practicanotas';
//$dbuser = 'root';
$dbuser = 'id4965540_root';
$database = 'id4965540_practicanotas';
$dbpass = 'ssoo++';

$conn = mysqli_connect($dbhost, $dbuser, $dbpass, $database) or die("Error");


//consulta para obtener el id mas grande registrado en la base de datos
$maxQuery = mysqli_query($conn, "SELECT MAX(noteid) FROM notas");


$row = mysqli_fetch_row($maxQuery);

$maxId = $row[0];

$newId = $maxId + 1;

$userid = $_REQUEST['userid'];

//obtenemos los valores del notecontent
$noteContent = $_REQUEST['noteContent'];

//$resposta2 = json_encode($noteContent);

//consulta para insertar nota
$insertNoteQuery = "INSERT INTO notas (noteid, noteContent, userid, noteTitle) VALUES ('$newId', '$noteContent', '$userid', 'hello')";

//ejecutamos la consulta
//mysqli_query($conn, $insertNoteQuery);


if (!mysqli_query($conn, $insertNoteQuery)) {
    echo "Error: " . $insertNoteQuery . "<br>" . mysqli_error($conn);
}

$resposta2 = '[{"noteid" : "' . $newId . '", "noteContent" : "' . $noteContent . '" , "userid" : "' . $userid . '", "noteTitle" : "hello"}]';

mysqli_free_result($maxQuery);
mysqli_close($conn);

if (isset($_GET['callback'])) {
    echo $_GET['callback'] . '(' . $resposta2 . ')';
} else {
    echo ($resposta2);
} 
