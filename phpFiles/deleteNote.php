<?php

$dbhost = 'localhost';
$dbuser = 'root';
$dbpass = '';
$database = 'practicanotas';

$conn = mysqli_connect($dbhost, $dbuser, $dbpass, $database) or die("Error");

$noteId = $_REQUEST['noteid'];

$deleteQuery = "DELETE FROM notas WHERE noteid = '$noteId'";

if (mysqli_query($conn, $deleteQuery)) {
    echo "Nota elimnada";
} else {
    echo "Error: " . $deleteQuery . "<br>" . mysqli_error($conn);
}

$resposta2 = '{"noteid": '.$noteId.'}';

if (isset($_GET['callback'])) {
    echo $_GET['callback'] . '(' . $resposta2 . ')';
} else {
    echo ($resposta2);
} 
