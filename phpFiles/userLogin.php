<?php

$dbhost = 'localhost';
$dbuser = 'root';
$dbpass = '';
$database = 'practicanotas';

$conn = mysqli_connect($dbhost, $dbuser, $dbpass, $database) or die("Error");

$username = $_REQUEST['username'];
$pass = $_REQUEST['password'];

$loginQuery = "select userid from usuarios where username='$username' and password='$pass'";

echo $username." ".$pass;


$resposta2 = '{"userid": 1}';


if (isset($_GET['callback'])) {
    echo $_GET['callback'] . '(' . $resposta2 . ')';
} else {
    echo ($resposta2);
} 

