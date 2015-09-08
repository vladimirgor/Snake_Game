//#######################################
		function processResult(response)	{
			
			var json = eval( '(' +response+ ')');
			
			$('input').val('');
			$('.res_table').html('');			
			
			$.each(json, function (i,e){
				
				if ( parseInt(e.score) > 0 && i <= 9){
					
					$('.res_table').append($('<tr class ="row'+i+'">'))
					$('.row'+i).append($('<td id = "tnumber">').html(i+1));
					$('.row'+i).append($('<td id = "tname">').html(e.name));
					$('.row'+i).append($('<td id = "tscore">').html(e.score));
					
				}			
			});	
		}