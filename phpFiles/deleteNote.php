<?php

header('Content-type:application/javascript');

$dbhost = 'localhost';
//$database = 'practicanotas';
//$dbuser = 'root';
$dbuser = 'id4965540_root';
$database = 'id4965540_practicanotas';
$dbpass = 'ssoo++';

$conn = mysqli_connect($dbhost, $dbuser, $dbpass, $database) or die("Error");

$noteId = $_REQUEST['noteid'];

$deleteQuery = "DELETE FROM notas WHERE noteid = '$noteId'";

if (mysqli_query($conn, $deleteQuery)) {
    echo "Nota elimnada";
} else {
    echo "Error: " . $deleteQuery . "<br>" . mysqli_error($conn);
}

$resposta2 = '{"noteid": '.$noteId.'}';

mysqli_close($conn);

if (isset($_GET['callback'])) {
    echo $_GET['callback'] . '(' . $resposta2 . ')';
} else {
    echo ($resposta2);
} 
