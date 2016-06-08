<?php
$servername = "localhost";
$username = "root";
$password = "sof2rulz";
$dbname = "main";

// Create connection
$conn = mysqli_connect($servername, $username, $password, $dbname);

// Check connection
if (!$conn) {
    die("Connection failed: " . mysqli_connect_error());
}

$sql = "SELECT * FROM log";
$result = mysqli_query($conn, $sql);

if (mysqli_num_rows($result) > 0)
{
    // output data of each row
    while($row = mysqli_fetch_assoc($result))
    {
        echo "ip: " . $row["ip"]. " -Hits: " . $row["hits"]. "<br>";
    }
}
else
{
    echo "0 results";
}

mysqli_close($conn);
?>