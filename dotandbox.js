function generateLineCoordinates() {
	//create letter block, A0-A4,H0-H4, also creating the numeric line position
	var A = [];
	var B = [];
	var C = [];
	var D = [];
	var E = [];
	var F = [];
	var G = [];
	var H = [];
	var start = 0;
	var end = 10;
	var h = 1;

	//create lines
	for (var i = 0; i <5; i++) {
		A[i] = [start,0,end,100,'v','A'+i,5+i];
		B[i] = [start,100,end,200,'v','B'+i,14+i];
		C[i] = [start,200,end,300,'v','C'+i,23+i];
		D[i] = [start,300,end,400,'v','D'+i,32+i];

		E[i] = [10,start,100,end,'h','E'+i,h];
		F[i] = [110,start,200,end,'h','F'+i,1+h];
		G[i] = [210,start,300,end,'h','G'+i,2+h];
		H[i] = [310,start,400,end,'h','H'+i,3+h];

		h = h+9;
		start = start+100;
		end = end+100;
	}	

	lines = [A[0],A[1],A[2],A[3],A[4],B[0],B[1],B[2],B[3],B[4],C[0],C[1],C[2],C[3],C[4],D[0],D[1],D[2],D[3],D[4],E[0],E[1],E[2],E[3],E[4],F[0],F[1],F[2],F[3],F[4],G[0],G[1],G[2],G[3],G[4],H[0],H[1],H[2],H[3],H[4]];

}

function generateDots(x,y) {
	//add dot to dots array
	dots.push({
	    color: '#000',
	    width: 10,
	    height: 10,
	    top: y,
	    left: x
	});
}

function generateLines(width,height,x,y) {
	//add line to line elements array
		elements.push({
	    color: '#ccc',
	    width: width,
	    height: height,
	    top: y,
	    left: x
	});	
}

function renderLines() {
	//draw all the lines in elements
	elements.forEach(function(element) {
	    context.fillStyle = element.color;
	    context.fillRect(element.left, element.top, element.width, element.height);
	});
}

function renderDots() {
	//draw all the dots in dots
	dots.forEach(function(dot) {
	    context.fillStyle = dot.color;
	    context.fillRect(dot.left, dot.top, dot.width, dot.height);
	});		
}


function checkForBox(line) {
	//check if a box has been completed
	//have its positioning in line[4] and its name in line[5],numeric position in line[6]
	if (line[4] === 'h') {
		completeBoxHorizontal(line[6],line[0],line[1]);
	} else {
		completeBoxVertical(line[6],line[2],line[3]);
	}
}

function drawBox(x,y,position) {
	//if a box has been completed, fill it in
	if (currentPlayer === 1) {
		context.fillStyle = '#00ffff';
	} else if (currentPlayer === 2) {
		context.fillStyle = '#ff00ff';
	}
	if (position === 'above') {
		//draw the box above the line
		context.fillRect(x,y-90,90,90);
		boxCompleted++;
	} else if (position === 'below') {
		context.fillRect(x,y+10,90,90);
		boxCompleted++;		
	} else if (position === 'left') {
		context.fillRect(x-100,y-90,90,90);
		boxCompleted++;		
	} else if (position === 'right') {
		context.fillRect(x,y-90,90,90);		
		boxCompleted++;		
	}
}

function countBoxSegments(segments) {
	//count box segments
	var lineCount = 0;
	for (var i = 0; i < drawnLines.length; i++) {
		if (segments.indexOf(drawnLines[i]) > -1) {
			//this piece is here
			lineCount++;
		}
	};	
	return lineCount;
}


function completeBoxHorizontal(line,x,y) {
	//check if a horizontal line has completed a box
	var horizontalSegmentsAbove = [line-9,line-5,line-4];
	var horizontalSegmentsBelow = [line+9,line+4,line+5];
	var countAbove;
	var countBelow;

	countAbove = countBoxSegments(horizontalSegmentsAbove);
	countBelow = countBoxSegments(horizontalSegmentsBelow);
	if ((countAbove === 3) && (countBelow === 3)) {
		drawBox(x,y,'above');
		drawBox(x,y,'below');
	} else if (countAbove === 3) {
		drawBox(x,y,'above');
	} else if (countBelow === 3) {
		drawBox(x,y,'below');
	} else {
		//no boxes were completed
		boxCompleted = 0;
	}
	
}



function completeBoxVertical(line,x,y) {
	//check if a vertical line has completed a box
	var left = [line-1,line-5,line+4];
	var right = [line+1,line+5,line-4];
	var countLeft;
	var countRight;

	//check for edges
	if ((line === 9) || (line === 18) || (line === 27) || (line === 36)) {
		//only have to check left of here
		countLeft = countBoxSegments(left);
	} else if ((line === 5) || (line === 14) || (line === 23) || (line === 32)) {
		//only have to check right of here
		countRight = countBoxSegments(right);
	} else {
		countLeft = countBoxSegments(left);
		countRight = countBoxSegments(right);
	}

	if ((countLeft === 3) && (countRight === 3)) {
		drawBox(x,y,'left');
		drawBox(x,y,'right');
	} else if (countLeft === 3) {
		drawBox(x,y,'left');
	} else if (countRight === 3) {
		drawBox(x,y,'right');
	} else {
		//no boxes were completed
		boxCompleted = 0;
	}
	
}


function validateHorizontal(point) {
	//check if the point clicked is a valid horizontal line
	if ((point >10 && point< 100) || (point>110 && point<200) || (point>210 && point<300) || (point>310 && point<400)) {
		return true;
	} else {
		return false;
	}
}

function validateVertical(point) {
	//check if the point clicked is a valid vertical line
	if ((point >=0 && point<= 10) || (point>=100 && point<=110) || (point>=200 && point<=210) || (point>=300 && point<=310) || (point>=400 && point<=410)) {
		return true;
	} else {
		return false;
	}

}
 

function inLine(coord,x,y) {
	if ((coord[2] >= x && coord[0] <= x) && (coord[3] >= y && coord[1] <= y) ) {
		return true;
	} else {
		return false;
	}
}


function findLine(x,y) {
	//check if they clicked on a line
	if ((validateHorizontal(x) && validateVertical(y)) || (validateVertical(x) && validateHorizontal(y))) {
		for (var i = 0; i < lines.length; i++) {
			if(inLine(lines[i],x,y)) {
				//check for horizontal/vertical
				context.fillStyle = '#000';
				if (lines[i][4] == 'h') {
					context.fillRect(lines[i][0],lines[i][1],100,10);				
				} else {
					context.fillRect(lines[i][0],lines[i][1],10,100);				
				}

				//add filled in line to array
				drawnLines.push(lines[i][6]);
				//check for completed box
				checkForBox(lines[i]);
				//remove from available lines array
				lines.splice(i, 1);
				//update player
				player(currentPlayer);

			}
		}
	} 
}


function player(player) {
	//switching between players
	if (boxCompleted === 0) {
		//a box was not completed
		var friendlyPlayer;
		var playerClass;
		if (player === 1) {
			currentPlayer = 2;
			friendlyPlayer = 'Two';
			playerClass = 'player-two'
		} else {
			currentPlayer = 1;
			friendlyPlayer = 'One';
			playerClass = 'player-one';
		}		
	} else {
		//a box was completed
		if (player === 1) {
			playerOneScore = playerOneScore + boxCompleted;
			currentPlayer = 1;
			friendlyPlayer = 'One';
			playerClass = 'player-one';			
		} else {
			playerTwoScore = playerTwoScore + boxCompleted;
			currentPlayer = 2;
			friendlyPlayer = 'Two';
			playerClass = 'player-two'			
		}

	}
	//update the current player
	$('#player-id').html(friendlyPlayer).removeClass().addClass(playerClass);
	//update the score
	$('#player-one-score').html(playerOneScore);
	$('#player-two-score').html(playerTwoScore);
	totalBoxes = totalBoxes + boxCompleted;
	boxCompleted = 0;
}