<?php
	include('../lib/simple_html_dom.php');
	include('exclution.php');
	header('Content-Type: application/json');
	header("Cache-Control: no-cache, must-revalidate");
	header("Pragma: no-cache");

	$request = file_get_contents('php://input');
	$request = json_decode($request, true);


	$result = array(
		'title' => '',
		'info' => '',
		'image' => '',
		'images' => array(),
		'phones' => array(),
		'ignore' => false
	);

	$html = file_get_html($request['url']);

/*

	//ind short info
	$info_table = null;
	$table_counter = 0;
	foreach($html->find('body',0)->children() as $element){
		if($element->tag == "table"){
			if($table_counter == 3){
				$info_table = $element;
			}
			$table_counter++;
		}
	}
	if($info_table){
		$result['info'] = $info_table->find('table',0)->find('tr',1)->find('div',0)->plaintext;
	}

*/
	$result['text'] = trim($html->find('table', 7)->find('tr',2)->plaintext);

	//search phone
	preg_match_all("/[0-9]{9,12}/", $result['text'], $matches);
	
	//add 0 before
	foreach ($matches[0] as $phone) {
		if(strlen($phone) >= 9){
			$result['phones'][] = '0'.substr($phone, -9);
		}else{
			$result['phones'][] = $phone;
		}
	}

	foreach ($result['phones'] as $phone) {
		//find in lib
		foreach ($exclution as $ph => $reason) {
			if($phone == $ph){
				$result['reason'] = $reason;
				$result['ignore'] = true;
			}
		}
		if(strrpos($phone, '067245') !== false || strrpos($phone, '067249') !== false){
			$result['reason'] = 'Контора';
			$result['ignore'] = true;
		}
	}

	


	echo json_encode($result);
	return false;

?>