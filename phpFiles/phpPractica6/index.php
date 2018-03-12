<?php

header('Content-type:application/javascript');

$dbhost = 'localhost';
//$database = 'practicanotas';
//$dbuser = 'root';
$dbuser = 'id4965540_root';
$database = 'id4965540_practicanotas';
$dbpass = 'ssoo++';

$conn = mysqli_connect($dbhost, $dbuser, $dbpass, $database) or die("Error");

$userid = $_REQUEST['userid'];

//echo 'Connected successfully <br>';
$sql = "select * from notas where userid='$userid'";

$query = mysqli_query($conn, $sql);
$emparray = array();

while ($row = mysqli_fetch_assoc($query)) {
    
    $emparray[] = $row;
}

$resposta2 = json_encode($emparray);

mysqli_free_result($query);
mysqli_close($conn);

if (isset($_GET['callback'])) {
    echo $_GET['callback'] . '(' . $resposta2 . ')';
} else {
    echo ($resposta2);
} 

