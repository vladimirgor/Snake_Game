//
// matrix class
//
function Matrix(containerId, rows, cols)
{
	// container id 
	this.containerId = containerId;
	
	// rows quantity
	this.rows = rows;
	
	// columns quantity
	this.cols = cols;
	
//##############################################	
	// net creation
	this.create = function()
	{

		var n = this.rows * this.cols;
		
		$('div').eq(0).html('');

		for (var i = 0; i < n; i++)
		{

				$().add($('<div class = "cell">')).appendTo($('#' + this.containerId));
			
		}				
	}
 		
	this.create();

//####################################################
	// cell value get
	
	this.getCell = function(row, col)
	{

		// Function accepts cell coordinates
		// and returns true, if cell is painted,
		// or false, if cell is not painted.
		
		// cell number calculation
		var ind = ( row -1 ) * this.cols + (col-1);
		//getting cell with  ind number
		var cond = [];
		
		className = $('div').eq(ind + 1).attr('class');	
		
		cond[0] =
		//is cell painted?
		( className == "cell on" || className == "cell fruit" || className == "cell poison" || className == "cell tail")
		? 
			true   // yes, cell is painted
		:
			false;  // no, cell is not painted
			
		cond[1] = className.substr(5);
		
		return cond;
		
	}
//###################################################
	// cell value set up
	this.setCell = function(row, col, val, kind)
	{
		var ind = (row - 1) * this.cols + col - 1;

		if( val )
			
			$('div').eq(ind + 1).attr('class','cell ' + kind);

		else
			
			$('div').eq(ind + 1).attr('class','cell');
		
	}	

//####################################################		
	this.createFruits_Poisons = function(head, tail, quantity) {
	// matr - matrix to place fruits and poisons
	// n - quntity of rows == quantity of cols
	//head - snake head cell coordinates array
	//tail - snake tail cells coordinates array
	//fruits_poisons_quant - quantity of fruits == quantity of poisons to create
		var array =[];
		array.push(head);
		var z = [];
		var y =[];
		var k = true;
		array = array.concat(tail);
//		alert('89-' + array.valueOf());
		
		for ( var i = 0; i < 2*quantity; i++){
			
			do {
				
				z[0] = Math.ceil(Math.random()*this.cols);
				z[1] = Math.ceil(Math.random()*this.cols);
			}
			
			while (  lookforInarray(array, z) );
//			var x = lookforInarray(array, z)
//			alert ('102-' + x);	
			if ( k ) {
				
				k = false; this.setCell(z[0], z[1],true,'fruit');				
			} else {
				
				k = true; this.setCell(z[0], z[1],true,'poison');				
			}
			y = z.slice(0);
			array.push(y);
//			alert('111-' + array.valueOf());
		}
	
	}
}
	//#######################################################	
	lookforInarray = function(array_r, elem_r) {
	//array - the array to be checked
	//elem - the element to be looked for in the array
	// return : true if the elem if found in the array; 
	//			false on the cotrary.
		var found = false;
//		alert ('127 - ' + array_r.length)
		for ( var i = 0; i < array_r.length; i++) {
//			alert ('129-' + array_r.valueOf());
//			alert ('130-' + elem_r.valueOf());
			
			if ( array_r[i][0] === elem_r[0] && array_r[i][1] === elem_r[1]) {
				
				found = true; break;
				 
			}
			
		}
		return found;						
	}
	

//###############################################
	showScore = function(inf) {
		
		$('#score').html(inf);
		
	}
//#################################################
	sendRecord = function ( record ){
		
		if ( createXHR() ) {
			
			addRecord(record);
		}
	
	}	
//#######################################	
		function addRecord(input) {
			
			
			xhr.open('GET','add.php?input=' + input);
			
			xhr.send();
			
			xhr.onreadystatechange = function() {
				if (xhr.readyState == 4 &&
					xhr.status == 200 ) {
				
				}				
			}	
		}	
//#############################################
		function getRecords() {
			
			
			xhr.open('GET','get.php');
			
			xhr.send();
			
			xhr.onreadystatechange = function() {
				if (xhr.readyState == 4 &&
					xhr.status == 200 ) {
				if 	(  xhr.responseText.length != 2 )	
				processResult(xhr.responseText);
				
				}				
			}
		}
//##########################################	
	function createXHR() {
		if ( window.XMLHttpRequest) { // Mozilla, Safari,...
			xhr = new XMLHttpRequest();
		}
		else if ( window.ActiveXObject) { // IE
			try {
				xhr = new ActiveXObject("Msxml2.XMLHTTP");
			}
			catch (e) {
				try {
					xhr = new ActiveXObject("Microsoft.XMLHTTP");
				}
				catch (e) {}
			}
		}
		
		if ( xhr ) return true;	else return false;			
	}
