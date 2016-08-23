<?php

header('Access-Control-Allow-Origin: *');
header('Cache-Control: no-cache, must-revalidate');
header('Content-Type: application/json');

$countries = json_decode(file_get_contents('countries.json'),true);

$results = array();

if(!empty($_GET['value'])){
	foreach ($countries as $result) {
		if($result['code'] == $_GET['value']){
			$results[] = array('text' => $result['name'], 'value' => $result['code']);
		}
	}
}

if(!empty($_GET['search'])){
	foreach ($countries as $result) {
		if(stripos($result['name'], $_GET['search']) === 0){
			$results[] = array('text' => $result['name'], 'value' => $result['code']);
		}
	}
}
		
echo json_encode($results);
?>