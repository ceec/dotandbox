//setting up the canvas
		var elem = document.getElementById('myCanvas'),
		    elemLeft = elem.offsetLeft,
		    elemTop = elem.offsetTop,
		    context = elem.getContext('2d'),
		    elements = [];

		//game variables
		dots = [];
		currentPlayer = 1; 
		playerOneScore = 0;
		playerTwoScore = 0;		
		drawnLines = [];
		boxCompleted = 0;
		lines = [];
		totalBoxes = 0;

		//create all lines
		generateLineCoordinates();

		//Look for when a line is clicked on
		elem.addEventListener('click', function(event) {
			var x = event.pageX - elemLeft;
			var y = event.pageY - elemTop;
			findLine(x,y);

			var winner;
			if (totalBoxes === 16) {
				console.log(totalBoxes);
				//display winner
				if (playerOneScore > playerTwoScore) {
					winner = 'Winner Player One!';
				} else if (playerTwoScore > playerOneScore) {
					winner = 'Winner Player Two!';
				} else {
					winner = "It's a tie!";
				}
				$('#winner-container').html(winner+'<br><button id="new-game" class="btn btn-primary">New Game</button>');
			}
		}, false);


		$('body').on('click','#new-game',function() {
			//reload the page
			location.reload();
		});
		
		//creating the gameboard
		//draw the lines
		for (var y = 0; y <= 400; y =y+100) {
			for (var x = 0; x <= 400; x = x+100) {
				//create all horizontal lines
				generateLines(100,10,x,y)
				//create all vertical lines
				generateLines(10,100,x,y)
			};
		};
		renderLines();

		//draw all dots
		for (var y = 0; y <= 500; y =y+100) {
			for (var x = 0; x <= 500; x = x+100) {
				generateDots(x,y);		
			};
		};
		renderDots();