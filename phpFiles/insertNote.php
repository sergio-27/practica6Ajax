<?php

$dbhost = 'localhost';
$dbuser = 'root';
$dbpass = '';
$database = 'practicanotas';

$conn = mysqli_connect($dbhost, $dbuser, $dbpass, $database) or die("Error");


//obtenemos los valores del notecontent
$noteContent = $_REQUEST['noteContent'];

$resposta2 = json_encode($noteContent);

//consulta para insertar nota
$insertNoteQuery = "INSERT INTO notas (noteid, noteContent, userid, noteTitle) VALUES (3, '$noteContent', 3, 'hello')";

//ejecutamos la consulta
//mysqli_query($conn, $insertNoteQuery);


if (mysqli_query($conn, $insertNoteQuery)) {
    echo "New record created successfully";
} else {
    echo "Error: " . $insertNoteQuery . "<br>" . mysqli_error($conn);
}

$resposta2 = '{"noteContent": '.$noteContent.'}';

if (isset($_GET['callback'])) {
    echo $_GET['callback'] . '(' . $resposta2 . ')';
} else {
    echo ($resposta2);
} 
