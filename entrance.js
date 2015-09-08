//
// ENTRANCE POINT
//

window.onload = function() {
	INTERVAL = 0;
	FRUITS_POISONS_QUANT = 0;
	R_MATRIX_SIZE = 20;
	C_MATRIX_SIZE = 20;	
	MATRIX = 'matrix1';
	INIT_SNAKE_POS_R = 1;
	INIT_SNAKE_POS_C = 1;
	var KEY_LEFT = 37;
	var KEY_UP = 38;
	var KEY_RIGTH = 39;
	var KEY_DOWN = 40;
	var KEY_PAUSE = 32;
	
	mat = new Matrix(MATRIX, R_MATRIX_SIZE, C_MATRIX_SIZE);
	timer = null;
	showScore('0');
	var snake = new Snake(INIT_SNAKE_POS_R, INIT_SNAKE_POS_C, '', mat);



//##########################################	
//
// interrupting out of border event handler
//
	snake.onOutOfBorder = function() {
		
		clearInterval(timer);
		if ( this.length_tail > 0 )
		sendRecord( LOGIN + ':' + this.length_tail );

		mat.create();
		alert ('You are loser! Out of border.');
		showScore('0');
		fruits = FRUITS_POISONS_QUANT;
		this.tail = [];
		this.length_tail = 0;
		this.head [0] =  INIT_SNAKE_POS_R;
		this.head [1] =  INIT_SNAKE_POS_C;
		this.course = '';
		$('button').prop('disabled',false);
		timer = setInterval(snake.move, INTERVAL);
		
	}
//#############################################
//
// interrupting eat event handler
//
	snake.onEat = function() {

		clearInterval(timer);

		switch ( this.target[1] ) {
			
			case 'fruit' : {
				this.length_tail++; 
				showScore(this.length_tail);
				fruits--;
				if ( fruits == 0 ) {
					mat.createFruits_Poisons(this.head, this.tail, FRUITS_POISONS_QUANT );
					fruits = FRUITS_POISONS_QUANT;
				}			
				timer = setInterval(this.move, INTERVAL);	
			break;}	
			
			case 'tail' : { 
				if ( this.length_tail > 0 )
				sendRecord( LOGIN + ':' + this.length_tail );
				mat.create();
				alert('Game over! Tail has been beaten.');
				showScore('0');
				fruits = FRUITS_POISONS_QUANT;
				this.tail = [];
				this.length_tail = 0;
				this.head [0] =  INIT_SNAKE_POS_R;
				this.head [1] =  INIT_SNAKE_POS_C;
				this.course = '';
				$('button').prop('disabled',false);
				timer = setInterval(this.move, INTERVAL);			
			break;}	
			
			case 'poison' : {

				this.length_tail--;
				
				if ( this.length_tail < 0 ) {
					alert ('Game over! Too much poison has been eaten.');					
					if ( this.length_tail > 0 )
					sendRecord( LOGIN + ':' + this.length_tail );
					mat.create();
					fruits = FRUITS_POISONS_QUANT;				
					showScore('0');
					this.tail = [];
					this.length_tail = 0;
					this.head [0] =  INIT_SNAKE_POS_R;
					this.head [1] =  INIT_SNAKE_POS_C;
					this.course = '';
					$('button').prop('disabled',false);
				
				}	else {
					
					if ( this.length_tail != 0 ){

						mat.setCell(this.tail[0][0], this.tail[0][1], false,'tail');	
						this.tail.shift();
					}
				}

			timer = setInterval(this.move, INTERVAL);
			break;}
			
			default : break;
		}
	}
	
//###################################	
	var fRight = function() {
		snake.course = "right";
	}
//####################################	
	var fLeft = function(){
		snake.course = "left";
	}
//######################################	
	var fUp = function(){
		snake.course = "up";
	}
//#######################################	
	var fDown = function(){
		snake.course = "down";
	}
//#########################################
	var fPause = function(){
		snake.course = "pause";
	}
//############################################	
	document.onkeydown = function(e) {

		switch( e.keyCode) {
			
			case KEY_LEFT:fLeft();
				break;
			case KEY_RIGTH:fRight();
				break;
			case KEY_DOWN:fDown();
				break;
			case KEY_UP:fUp();
				break;
			case KEY_PAUSE:fPause();
				break;	
				
		}
		if ( INTERVAL != 0 ){
			clearInterval(timer);
			timer = setInterval(snake.move, INTERVAL);
		}
	}
	
//#############################################	
	$('#level1').click(function(){
		
		INTERVAL = 400;
		FRUITS_POISONS_QUANT = 1; 
		mat.createFruits_Poisons(snake.head, snake.tail, FRUITS_POISONS_QUANT );
		fruits = FRUITS_POISONS_QUANT;
		$('button').prop('disabled',true);
		$('body').focus();
		
		})
//###############################################		
	$('#level2').click(function(){ 
		
		INTERVAL = 350;
		FRUITS_POISONS_QUANT = 2;
		mat.createFruits_Poisons(snake.head, snake.tail, FRUITS_POISONS_QUANT );
		fruits = FRUITS_POISONS_QUANT;
		$('button').prop('disabled',true);
		$('body').focus();
		})
//###############################################		
	$('#level3').click(function(){
		
		INTERVAL = 300;
		FRUITS_POISONS_QUANT = 3; 
		mat.createFruits_Poisons(snake.head, snake.tail, FRUITS_POISONS_QUANT );
		fruits = FRUITS_POISONS_QUANT;
		$('button').prop('disabled',true);
		$('body').focus();
		})
//################################################		
	$('#level4').click(function(){ 
		
		INTERVAL = 250;
		FRUITS_POISONS_QUANT = 4;
		mat.createFruits_Poisons(snake.head, snake.tail, FRUITS_POISONS_QUANT );
		fruits = FRUITS_POISONS_QUANT;
		$('button').prop('disabled',true);
		$('body').focus();

	 })
//#####################################################
	$('#btnEnter').click(function(){ 
		
		LOGIN = $('input').val();	
		var str = ucFirst(LOGIN);
		LOGIN = str;
		$('#game1').html('Game \'Snake\' for ' + LOGIN + '!');
		$('form').html('');
		$('button').prop('disabled',false);
		snake.create();
				
	 });
	 
//########################################################
	function ucFirst(str) {
		
		if ( !str ) return str;
		return str[0].toUpperCase() + str.slice(1);
		
	}
	 
}
	
	
	
