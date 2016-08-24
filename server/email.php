<?php
if (!mail() {
   echo "Reschedule for later try or panic appropriately!";
}

error_reporting(E_ALL | E_STRICT);
ini_set('display_errors', 1);

// basic settings section
$sendto = 'ihor.mihal@gmail.com';
$sendfrom = 'no-reply@property-lawyer.com.ua';
$user = 'Landing';
$subject = 'Property Lower Landing';

function clean_var($variable) {$variable = strip_tags(stripslashes(trim(rtrim($variable))));return $variable;}


$msg = "Name: " . clean_var($_REQUEST['name']) . "\n";
$msg .= "Phone: " . clean_var($_REQUEST['phone']) . "\n";

$packages = array(
	'package-1' => 'Проверка (2800 грн)',
	'package-2' => 'Проверка + сопровождение (5000 грн)',
	'package-3' => 'Проверка + сопровождение + выезд на сделку (13000 грн)'
);

if(!empty($_REQUEST['package'])){
	if(in_array($_REQUEST['package'], $packages)){
		$package_id = $_REQUEST['package'];
		$msg .= "Package: " . $packages[$package_id] . "\n";
	}
}


function mail_utf8($to, $from_user, $from_email, $subject = '(No subject)', $message = ''){
	$from_user = "=?UTF-8?B?".base64_encode($from_user)."?=";
	$subject = "=?UTF-8?B?".base64_encode($subject)."?=";
	$headers = "From: $from_user <$from_email>\r\n" . "MIME-Version: 1.0" . "\r\n" . "Content-type: text/html; charset=UTF-8" . "\r\n";

	return mail($to, $subject, $message, $headers);
}

if(mail_utf8($sendto, $user, $sendfrom, $subject, $msg)){
	header("Location: http://property-lawyer.com.ua/thank-you.html");
}else{
	print_r(error_get_last());
	phpinfo();
	//header("Location: http://property-lawyer.com.ua/error.html");
}

?>