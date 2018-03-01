<?php

$dbhost = 'localhost';
$dbuser = 'root';
$dbpass = '';
$database = 'practicanotas';

$conn = mysqli_connect($dbhost, $dbuser, $dbpass, $database) or die("Error");

//echo 'Connected successfully <br>';
$sql = 'select * from notas';

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

