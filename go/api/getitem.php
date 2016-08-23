<?php
	include('../lib/simple_html_dom.php');
	header('Content-Type: application/json');
	header("Cache-Control: no-cache, must-revalidate");
	header("Pragma: no-cache");

	$request = file_get_contents('php://input');
	$request = json_decode($request, true);


	$result = array(
		'title' => '',
		'info' => '',
		'images' => array(),
		'phones' => array()
	);

	$html = file_get_html($request['url']);

	$result['title'] = trim($html->find('h1', 0)->plaintext);

	/* find short info */
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
	//$info_table = $html->find('table', 7);
	if($info_table){
		$result['info'] = $info_table->find('table',0)->find('tr',1)->find('div',0)->plaintext;
	}

	/* END find short info */

	/* find images */
	$main_img = $html->find('img[id=main_picture]', 0);
	if (is_object($main_img)){
		$result['images'][] = $main_img->src;
	}
	
	foreach ($html->find('img[class=image_galary]') as $key => $image) {
		if($key > 0){
			$result['images'][] = $image->src;
		}
	}
	/* END find images */

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


	echo json_encode($result);
	return false;

?>