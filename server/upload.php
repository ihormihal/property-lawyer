<?php
$uploaddir = "uploads/";
$uploadfile = $uploaddir . basename($_FILES["file"]["name"]);
if (move_uploaded_file($_FILES['file']['tmp_name'], $uploadfile)) {
    echo 'server/'.$uploadfile;
} else {
    echo "Error!";
}
?>