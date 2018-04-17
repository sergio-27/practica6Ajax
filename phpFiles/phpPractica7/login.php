<?php
header('Content-type:application/javascript');

$dbhost = 'localhost';
//$dbuser = 'id4965540_root';
$dbuser = 'root';
$dbpass = 'ssoo++';

//$database = 'practicanotas';
$database = 'practicanotas';

$conn = mysqli_connect($dbhost, $dbuser, $dbpass, $database) or die("Error");

$username = $_REQUEST['email'];
$pass = $_REQUEST['password'];

$loginQuery = "select userid from usuarios where username='$username' and password='$pass'";

$result = mysqli_query($conn, $loginQuery);

$row = mysqli_fetch_assoc($result);

$resposta2 = json_encode($row);

mysqli_free_result($result);
mysqli_close($conn);

//echo $username . " hello " . $pass;

if (isset($_GET['callback'])) {
    echo $_GET['callback'] . '(' . $resposta2 . ')';
} else {
    echo ($resposta2);
} 

