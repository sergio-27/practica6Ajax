<?php

$dbhost = 'localhost';
$dbuser = 'root';
$dbpass = '';
$database = 'practicanotas';

$conn = mysqli_connect($dbhost, $dbuser, $dbpass, $database) or die("Error");


//consulta para obtener el id mas grande registrado en la base de datos
$maxQuery = mysqli_query($conn, "SELECT MAX(noteid) FROM notas");


$row = mysqli_fetch_row($maxQuery);

$maxId = $row[0];

$newId = $maxId + 1;

//obtenemos los valores del notecontent
$noteContent = $_REQUEST['noteContent'];

$resposta2 = json_encode($noteContent);

//consulta para insertar nota
$insertNoteQuery = "INSERT INTO notas (noteid, noteContent, userid, noteTitle) VALUES ('$newId', '$noteContent', 4, 'hello')";

//ejecutamos la consulta
//mysqli_query($conn, $insertNoteQuery);


if (mysqli_query($conn, $insertNoteQuery)) {
    echo "New record created successfully ";
} else {
    echo "Error: " . $insertNoteQuery . "<br>" . mysqli_error($conn);
}

$resposta2 = '{"noteContent": ' . $noteContent . '}';

if (isset($_GET['callback'])) {
    echo $_GET['callback'] . '(' . $resposta2 . ')';
} else {
    echo ($resposta2);
} 
