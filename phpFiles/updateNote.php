
<?php

$dbhost = 'localhost';
$dbuser = 'root';
$dbpass = '';
$database = 'practicanotas';

$conn = mysqli_connect($dbhost, $dbuser, $dbpass, $database) or die("Error");

$noteContentInput = $_REQUEST['noteContent'];
$noteId = $_REQUEST['noteid'];
//$noteId = 2;
echo 'noteid: '.$noteId;

$updateQuery = "UPDATE notas SET noteContent = '$noteContentInput' WHERE noteid = '$noteId'";


if (mysqli_query($conn, $updateQuery)) {
    echo "Nota actualizada";
} else {
    echo "Error: " . $updateQuery . "<br>" . mysqli_error($conn);
}

$resposta2 = '{"noteContent" : '.$noteContentInput.', "noteid" : '.$noteId.'}';

if (isset($_GET['callback'])) {
    echo $_GET['callback'] . '(' . $resposta2 . ')';
} else {
    echo ($resposta2);
} 