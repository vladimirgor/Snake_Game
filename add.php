<?php
$record = $_GET['input'];
$f = fopen('results.txt', 'a+');
fwrite($f, $record . "\n");
fclose($f);