<?php
	$results = file('results.txt');
//	print_r($results);
	$r =  [];
	foreach($results as $result)
	{
		$arr = explode(':', $result);
		$r[] = ['name' => $arr[0], 'score' =>substr($arr[1],0,-1)];
		
	}

	foreach ( $r as $key => $row ) {
		
		$score[$key] = $row['score'];	
				
	}
	
	array_multisort($score, SORT_DESC, $r);

	echo json_encode($r);
?>