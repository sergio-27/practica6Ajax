<?php

$dbhost = 'localhost';
$dbuser = 'root';
$dbpass = '';
$database = 'practicanotas';

$conn = mysqli_connect($dbhost, $dbuser, $dbpass, $database) or die("Error");

$noteContentInput = $_REQUEST['noteContent'];
$noteId = $_REQUEST['noteid'];

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