
//
// Snake class
//
function Snake(row, col, course, matr) {
	this.head = [row,col]; // head coordinates 
	this.tail = []; // tail coordinates 
	this.length_tail = 0;
	this.matr = matr;
	this.onOutOfBorder = null;
	this.onEat = null;
	this.course = course;

	pr = true;
	this.target = [];
	var self = this; // this variable remembering

	
	this.create = function() {

		matr.setCell(1, 1, true, 'head');
		
	}
	
	this.move = function() {


		var last_head = self.head.slice(0);

	
		// previous position cleaning
		
		//head cleaning
		matr.setCell(self.head[0], self.head[1], false,'head');
		

		//tail cleaning

	if ( self.length_tail > 0 ) {
		if ( self.length_tail == 1 ) {
		   	matr.setCell(self.tail[0][0], self.tail[0][1], false,'tail');
			self.tail.shift();
		} 
			else 
				if (!pr) 
					{ 	pr = true; } 
				else 
				{ 
					
					matr.setCell(self.tail[0][0], self.tail[0][1], false,'tail');	
					self.tail.shift();
				}		
	}
		
		// movement preparing
		if ( self.course == 'right') {
	
			self.head[1]++; 
		}
		else if ( self.course == 'left') {
						
			self.head[1]--; 
		}	
		else if ( self.course == 'down') {			
			
			self.head[0]++; 
		}	
		else if ( self.course == 'up') {			
			
			self.head[0]--;	
		}	
		else if ( self.course == 'pause') {			
			
			
		}	
		// is the movement directed out of border?
		if (   self.head[0] < 1 || self.head[0] > self.matr.rows 
			|| self.head[1] < 1 || self.head[1] > self.matr.cols  ) {
				
			self.head = self.head.slice(0);	//come back to the init position
//			self.head[1] = INIT_SNAKE_POS_C;
//			self.length_tail = 0;
//			self.course = '';       //unset future direction
			
			if ( typeof self.onOutOfBorder == 'function') 
//				alert ('87-' + INTERVAL);
				self.onOutOfBorder.call(self);	// call event processor
			
			}
		// is the movement directed on target sharp?
		self.target = matr.getCell(self.head[0], self.head[1])
		if ( self.target[0] ) {
			
//			self.course = '';       //unset future direction
			
			if ( typeof self.onEat == 'function') {
				
				if ( self.target[1] == 'fruit' ) pr = false; 

					self.onEat.call(self);		// call event processor
			
			}						
		}
		//movement
		//head moving
		matr.setCell(self.head[0], self.head[1], true, 'head');

		//tail moving
	
		if ( self.length_tail > 0 ) {
					
				if ( self.length_tail == 1 ) {
					
					self.tail.push(last_head.slice(0));
					matr.setCell(self.tail[0][0], self.tail[0][1], true, 'tail');
				
				} else {	
					
					self.tail.push(last_head.slice(0));	
					matr.setCell(self.tail[0][0], self.tail[0][1], true, 'tail');
					for ( var j = 1; j < self.length_tail; j++ ) {
						if ( typeof self.tail[j][0] != 'undefined' ){
							
							matr.setCell(self.tail[j][0], self.tail[j][1], true, 'tail');
						
						}									
					}
				}							
		}

	}
}