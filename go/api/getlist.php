<?php
	include('../lib/simple_html_dom.php');
    header('Content-Type: application/json');
    header("Cache-Control: no-cache, must-revalidate");
    header("Pragma: no-cache");


    $req = file_get_contents('php://input');
    $req = json_decode($req, true);

    $request = array(
        'search' => '%EC%E0%F1%F1%E0%E6',
        'page' => $req['page'],
        'id_region' => 56,
        'title' => 'on'
    );

    $url = 'http://kiev.ukrgo.com/search.php?search='.$request['search'].'&id_region='.$request['id_region'].'&page='.$request['page'].'&title='.$request['title'];

    $results = [];

    $html = file_get_html($url);
    $main = $html->find('div[style=border: 1px solid #DEDEDE; width: 88%; margin-left: auto;margin-right: auto; margin-top: 10px;]');
    foreach($main[0]->find('table') as $element){
        $item = array('title' => '', 'url' => '', 'description' => '', 'date' => $date, 'image' => false, 'phone' => '', 'ignore' => false);
        $item['title'] = trim($element->find('h3')[0]->plaintext);
        $item['url'] = trim($element->find('a')[0]->href);
        $item['date'] = trim($element->find('td[width=85]')[0]->plaintext);

        //search for image
		if (is_object($element->find('img', 0))) {
            $item['image'] = $element->find('img', 0)->src;
		}

		if(!$item['image']){
			continue;
		}


        $results[] = $item;
    }
    echo json_encode($results);
    return false;

?>