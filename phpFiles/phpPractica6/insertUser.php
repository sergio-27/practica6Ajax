<?php

header('Content-type:application/javascript');

$dbhost = 'localhost';
//$database = 'practicanotas';
//$dbuser = 'root';
$dbuser = 'id4965540_root';
$database = 'id4965540_practicanotas';
$dbpass = 'ssoo++';


$conn = mysqli_connect($dbhost, $dbuser, $dbpass, $database) or die("Error");

//consultamos el id mas greande
$maxQuery = mysqli_query($conn, "SELECT MAX(userid) FROM usuarios");

$row = mysqli_fetch_row($maxQuery);

$maxId = $row[0];

$newId = $maxId + 1;

$username = $_REQUEST['username'];

$pass = $_REQUEST['password'];

$insertUserQuery = "INSERT INTO usuarios (userid, username, password) VALUES ('$newId', '$username', '$pass')";

if (!mysqli_query($conn, $insertUserQuery)) {
    echo "Error: " . $insertUserQuery . "<br>" . mysqli_error($conn);
}

$resposta2 = '[{"userid" : "' . $newId . '", "username" : "' . $username . '"}]';

mysqli_free_result($maxQuery);
mysqli_close($conn);

if (isset($_GET['callback'])) {
    echo $_GET['callback'] . '(' . $resposta2 . ')';
} else {
    echo ($resposta2);
} 
