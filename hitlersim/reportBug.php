<?php
    if( $_POST["bug"] )
    {
        $bug = $_POST['bug'];
        $myFile = "bugs.txt";
        $test = file($myFile);
        $fh = fopen($myFile, 'a+') or die("can't open file");
        $stringData = $bug . "\r\n";
        fwrite($fh, $stringData);
        fclose($fh);
        echo $bug;
    }
?>