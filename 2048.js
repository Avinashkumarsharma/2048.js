//The 2048 Game, Part of the Project Reinventing the Wheel.
/*
author : theNoob
blog: http://thenoobat.blogspot.com 
*/

(function() {
	//Game Variables
var options, canvas, cx, board ,SIZE, DIRECTION,DIMENSION,
	available, requestIdAppear,SPAWN, requestId, 
	currentTile, score, highscore;
	window.requestAnimationFrame =    window.requestAnimationFrame 
								   || window.mozRequestAnimationFrame 
								   || window.webkitRequestAnimationFrame 
								   || window.msRequestAnimationFrame;
	//Utility functions
var roundRect = function (x, y, w, h, r) {
  if (w < 2 * r) r = w / 2;
  if (h < 2 * r) r = h / 2;
  this.beginPath();
  this.moveTo(x+r, y);
  this.arcTo(x+w, y,   x+w, y+h, r);
  this.arcTo(x+w, y+h, x,   y+h, r);
  this.arcTo(x,   y+h, x,   y,   r);
  this.arcTo(x,   y,   x+w, y,   r);
  this.closePath();
  cx.lineWidth = 3;
  return this;
};
var merge = function(object1, object2) {
	for(key in object1) {
		if(object2 && object2[key]) 
			object1[key] = object2[key]
	}
	return object1;
};

var sort = function (direction, grid) {
	var a = grid;
	var len = a.length;
	for(var i = 0; i< len; i++) {
		for(var j = 0; j < len - i - 1; j++) {
			switch(direction) {
				case 'L':
					  if(a[j+1].y < a[j].y || (a[j].y == a[j+1].y && a[j+1].x < a[j].x )) {
					  	var temp = a[j];
					  	a[j] = a[j+1];
					  	a[j+1] = temp;
					  }
				break;
				case 'R':
					  if(a[j+1].y < a[j].y || (a[j].y == a[j+1].y && a[j+1].x > a[j].x )) {
					  	var temp = a[j];
					  	a[j] = a[j+1];
					  	a[j+1] = temp;
					  }
				break;
				case 'D':
					  if(a[j+1].x < a[j].x || (a[j].x == a[j+1].x && a[j+1].y > a[j].y )) {
					  	var temp = a[j];
					  	a[j] = a[j+1];
					  	a[j+1] = temp;
					  }
				break;
				case 'U':
					  if(a[j+1].x < a[j].x || (a[j].x == a[j+1].x && a[j+1].y < a[j].y )) {
					  	var temp = a[j];
					  	a[j] = a[j+1];
					  	a[j+1] = temp;
					  }
				break;

			}
			
		}
	}
	return a;
};


var __2048__ = function (settings) { //Main Game Function 
	var option = {};
	//Game Initializations
	option['Multiplier'] = {2: '2', 
							4: '4',
							8: '8',
							16: '16',
							32: '32',
							64: '64',
							128: '128',
							256: '256',
							512: '512',
							1024: '1024',
							2048: '2048'
							};
	option['Tile'] = {2:['#eee4da','#776e65'], 
					  4:['#ede0c8','#776e65'],
					  8:['#f2b179','#f9f6f2'],
					  16:['#f59563','#f9f6f2'],
					  32:['#f67c5f','#f9f6f2'],
					  64:['#f65e3b','#f9f6f2'],
					  128:['#edcf72','#f9f6f2'],
					  256:['#edcc61','#f9f6f2'],
					  512:['#edc850','#f9f6f2'],
					  1024:['#f9d769','#f9f6f2'],
					  2048:['#f1b43d','#f9f6f2']};
	option['Background'] = "#bbada0";
	option['Forground'] =  "#ccc0b3";
	option['Size']=4;
	option['Dimension'] =500;

	//mergin the new setting with the defaults

	if(settings) {
		for(key in option) {
			if(settings[key] && settings)
				option[key] = settings[key];
		}
	}
	options = option; // Making local global

};

window.__2048__ = __2048__; // making the object Global
//Initializing the Game

var init = function () {
	SIZE = options['Size'];
	DIRECTION = '';
	DIMENSION = options['Dimension'];
	SPAWN = false;
	score = 0;
	board = [];
	available = [];
	//var newgame;
	if(newgame = document.getElementById('__2048__newgame') );
	   newgame.addEventListener('click', newGame, false);
	canvas = document.createElement('canvas');
	if(!(canvas.getContext)) {
		alert('canvas not supported by browser, Update it !');
		return;
	}
	CanvasRenderingContext2D.prototype.roundRect = roundRect; 
	canvas.id = "canvas";
	canvas.width = canvas.height = options['Dimension'];
	cx = canvas.getContext("2d");
	drawBoard();
	//Restoring thr game if saved
	if(!localStorage) {
		alert('Sorry you have to play without saving, or you can update browser');
	}
	if(localStorage['boardRestore']) {
		restoreGame();
	}
	else
		newGame();
	document.addEventListener('keydown', update, false);
};

__2048__.prototype.init = init; //Adding to the main object __2048__

var drawBoard = function () {
	var Size = options['Dimension'];
	cx.fillStyle = options['Background'];
	var radius = (6/500) *canvas.width;
	cx.clearRect(0, 0, canvas.width, canvas.height);
	cx.roundRect(0, 0, canvas.width, canvas.height, radius).fill();
	var tileSize = (107/500) * Size;
	var margin = (15/500) * Size;
	cx.fillStyle = options['Forground'];
	_x = 0;
	_y = 0;
	for(i =0 ; i < options['Size']; i++){
		for(j = 0; j < options['Size']; j++) {
			cx.roundRect(_x + margin  , _y + margin , tileSize, tileSize, radius/2).fill();
			_x += margin + tileSize;
		}
		_y += margin + tileSize;
		_x = 0;
	}
	document.getElementById('__2048__').appendChild(canvas);
};

var Tile = function(o) {
	var attrib = {
		'background': '#eee4da',
		'color': '#776e65',
		'digit': 2,
		'x': 4,
		'y': 4,
		'dx':4,
		'dy':4,
	};
	attrib = merge(attrib, o);
	this.background = attrib.background;
	this.color = attrib.color;
	this.digit = attrib.digit;
	this.x = attrib.x;
	this.y = attrib.y;
	this.size = (107/500) * options['Dimension'];
	this.radius = (3/107) * this.size;
	this._x = (this.size) * (this.x -1) + options['Dimension']* (15/500)  * this.x;
	this._y = (this.size) * (this.y -1) + options['Dimension']* (15/500)  * this.y;
	this.content = options['Multiplier'][this.digit]
	this.dx = this.x;
	this.dy = this.y;
	this.merge = false;
	this.drawTile = drawTile;
	this.clearTile = clearTile;
	this.appear = appear;
	this.updatePosition = updatePosition;
};

var drawTile = function() {
	var x = this._x;
	var y = this._y;
	var color = options['Tile'][this.digit][1];
	background = options['Tile'][this.digit][0];
	cx.fillStyle = background;
	cx.roundRect(x, y , this.size, this.size, this.radius).fill();
	cx.fillStyle = color;
	var fSize = (60 -((this.content +  '').length-1)*10) * (this.size/107);
	cx.font = 'normal 800 '+fSize+'px Clear sans, Myriad Pro, sans-serif';
	var metrics = cx.measureText(this.content);
	_x = x + this.size/2 - metrics.width/2; 
	_y = y + this.size/2 + 1/3*fSize;
	cx.fillText(this.content, _x , _y);
	return this;
};

var clearTile = function () {
	t = new Tile({x:this.x, y:this.y});
	cx.fillStyle = options['Background'];
	x = this._x;
	y = this._y;
	cx.fillRect(this._x - (9/500) * options['Dimension'], 
				this._y - (9/500) * options['Dimension'], 
				this.size + (20/500) * options['Dimension'], 
				this.size + (20/500) * options['Dimension']);
};

var findAvailable = function (grid) {
	var b = grid, map = {}, key = '', a=[];
	for(var i in b) {
		key = b[i].x + '' + b[i].y;
		map[key] = b[i].digit;
	}
	for(var i = 1; i<= SIZE; i++) {
		for(var j = 1; j<= SIZE; j++) {
			key = j + '' + i;
			if(!map[key])
				a.push({x:j, y:i});
		}
	}
	return a;
	
};

var restoreGame = function() {
	drawBoard();
	available = [];
	var l,b;
	highscore = parseInt(localStorage['highscore']);
	var str = localStorage.getItem('boardRestore');
	var data = str.split('|');
	data.pop();
	for(key in data) {
		l = JSON.parse(data[key]);
		b = new Tile( {x:l.x, y:l.y, digit:l.digit} );
		board.push(b);
		//board.push(merge(t, JSON.parse(data[key])));
	}
	for(key in board) 
		board[key].drawTile();
	available = findAvailable(board);
	score = parseInt(localStorage['score']);
	updateScore();
};

var saveGame =function() {
	var str='',l;
	for(key in board) {
		l = {x:board[key].x, y:board[key].y, digit: board[key].digit}
		str += JSON.stringify(l) + '|';
	}
	localStorage.removeItem('boardRestore');
	localStorage.setItem('boardRestore', str);
	localStorage.setItem('score', score);
};

var updateScore = function(num) {
	document.getElementById('__2048__score').innerHTML = score;
	if(highscore < score) {
		localStorage.setItem('highscore', score);
		highscore = score;
	}
	document.getElementById('__2048__highscore').innerHTML = highscore;
	if(localStorage) saveGame();
	
};
var GameStatus = function (grid) {
	var b = grid, map = {}, key = '', a;
	var L,R,U,D;
	a = findAvailable(b);
	for(var i in b) {
		if(b.digit == 2048)
			return -1; 
	}
	if(a.length)
		return true;
	for(var i in b) {
		key = b[i].x + '' + b[i].y;
		map[key] = b[i].digit;
	}
	for(var i in b) {
		L = (b[i].x - 1) + '' + b[i].y;
		R = (b[i].x + 1) + '' + b[i].y;
		D = b[i].x + '' + (b[i].y + 1);
		U = b[i].x + '' + (b[i].y - 1); 
		if( (map[L] && (map[L] == b[i].digit) ) ||
			(map[R] && (map[R] == b[i].digit) ) ||
			(map[D] && (map[D] == b[i].digit) ) ||
			(map[U] && (map[U] == b[i].digit) ) )
			return true;
	}
	return false;
};

var newGame = function() {
	score = 0;
	drawBoard();
	available = [];
	localStorage.removeItem('boardRestore');
	localStorage.setItem('score',0);
	localStorage.setItem('time', 0);
	//Initially all the slots are available
	for(var i = 1; i <= SIZE; i++) {
		for(var j = 0; j <= SIZE; j++) {
			available.push({x:j, y:i});
		}
	}
	//Game Board is Empty
	board=[];
	spawnNew();
	setTimeout(spawnNew, 400);
	document.addEventListener('keydown', update, false);
	if(!localStorage['highscore']) {
			highscore = 0;
			localStorage.setItem('highscore', highscore);
		}
	updateScore();	
};
window.__2048__.prototype.newGame = newGame;

var spawnNew = function (e) {
	available = findAvailable(board);
	var currentTile;
	if(available.length ==0){
		return false;
	}
	var choice = Math.ceil(Math.random()*available.length-1);
	if(available.length == 1)
	choice = 0; 
	var newTile = available.splice(choice, 1).pop();
	currentTile = new Tile(newTile);
	board.push(currentTile);
	currentTile.size = 10;
	currentTile._x += ((107/500)*options['Dimension'] - currentTile.size)/2;
	currentTile._y += ((107/500)*options['Dimension'] - currentTile.size)/2;
	currentTile.appear();
};

var appear = function() {
	var ref = this;
	var speed = 1.8;
	var size = (107/500) * options['Dimension'];
	this._x -= (this.size*speed - this.size)/2;
	this._y -= (this.size*speed - this.size)/2;
	this.size *= speed;
	if(this.size > size) {
		this.size = size;
		this._x = (this.size) * (this.x -1) + 
						  options['Dimension']*(15/500)  * this.x;
		this._y = (this.size) * (this.y -1) + 
						  options['Dimension']*0.03  * this.y;
		this.drawTile();
		window.cancelAnimationFrame(requestIdAppear);
		requestIdAppear = undefined;
		document.addEventListener('keydown', update, false);
		var g = GameStatus(board);
		if(g == -1) 
		alert('You Won!');
		if(!g)
		alert('Game Over, Try again');
		updateScore();
		return;
	}
	this.drawTile(); 

	requestIdAppear = requestAnimationFrame(function() {
		ref.appear();
	});
};

var moveBoard = function(prev, grid, direction) {
	var b =  sort(direction, grid);
	var GL, GR, GU, GD;
	GR = GD = SIZE;
	GL = GU = 1;
	for(var i in  b) {
			
			switch(direction) {
				case 'R':
				if(prev.y != b[i].y) {
					b[i].dx = GR;
					prev = b[i];
					continue;
				}
				else if(!prev.merge && prev.digit == b[i].digit) {
					b[i].dx = prev.dx
					b[i].merge = true;
					prev = b[i];
					score += b[i].digit*2;
				}
				else {
				b[i].dx = prev.dx - 1;
				prev = b[i];
				}
				break;

				case 'L':
				if(prev.y != b[i].y) {
					b[i].dx = GL;
					prev = b[i];
					continue;
				}
				else if(!prev.merge && prev.digit == b[i].digit) {
					b[i].dx = prev.dx
					b[i].merge = true;
					prev = b[i];
					score += b[i].digit*2;
				}
				else {
				b[i].dx = prev.dx + 1;
				prev = b[i];
				}
				break;

				case 'U':
				if(prev.x != b[i].x) {
					b[i].dy = GU;
					prev = b[i];
					continue;
				}
				else if(!prev.merge && prev.digit == b[i].digit) {
					b[i].dy = prev.dy
					b[i].merge = true;
					prev = b[i];
					score += b[i].digit*2;
				}
				else {
				b[i].dy = prev.dy + 1;
				prev = b[i];
				}
				break;

				case 'D':
				if(prev.x != b[i].x) {
					b[i].dy = GD;
					prev = b[i];
					continue;
				}
				else if(!prev.merge && prev.digit == b[i].digit) {
					b[i].dy = prev.dy
					b[i].merge = true;
					prev = b[i];
					score += b[i].digit*2;
				}
				else {
				b[i].dy = prev.dy - 1;
				prev = b[i];
				}
				break;
			}
			
	}
	board =  b;
	if(GameStatus(board))
		animateMove();
};
var updatePosition = function(index) {
	var speed, _x, _y,_f;
	speed = 0.8;
	_f = (this.size) * (SIZE -1) + DIMENSION * (15/500) * SIZE;
	switch(DIRECTION) {
		case 'R':
		speed = (_f - this._x) * (1 - speed);
		_x = (this.size) * (this.dx -1) + DIMENSION * (15/500) * this.dx;
		if(this.dx == this.x && !this.merge)
			return 1;
		if( (this._x + speed ) >= _x - this.size/2) {
			SPAWN = true;
			this.x = this.dx;
			this._x = _x;
			if(this.merge) {
				SPAWN = true;
				this.merge = false;
				this.digit *= 2;
				this.content = options['Multiplier'][this.digit];  
				board.splice(index -1, 1);
			}
		}
		else {
			this._x += speed;
			SPAWN = true;
			return 0; 
		}
		break;
		
		case 'L':
		_x = (this.size) * (this.dx -1) + DIMENSION * (15/500) * this.dx;
		if(this.dx == this.x && !this.merge)
			return 1;
		if(this._x*speed <= _x + this.size/1.5) {
			SPAWN = true;
			this.x = this.dx;
			this._x = _x;
			if(this.merge) {
				this.merge = false;
				this.digit *= 2;
				this.content = options['Multiplier'][this.digit];  
				board.splice(index -1, 1);
			}
		}
		else {
			this._x *= speed;
			SPAWN = true;
			return 0; 
		}
		break;

		case 'U':
		_y = (this.size) * (this.dy -1) + DIMENSION * (15/500) * this.dy;
		if(this.dy == this.y && !this.merge)
			return 1;
		if(this._y*speed <= _y + this.size/1.5) {
			SPAWN = true;
			this.y = this.dy;
			this._y = _y;
			if(this.merge) {
				this.merge = false;
				this.digit *= 2;
				this.content = options['Multiplier'][this.digit];  
				board.splice(index -1, 1);
			}
		}
		else {
			this._y *= speed;
			SPAWN = true;
			return 0; 
		}
		break;

		case 'D':
		speed = (_f - this._y) * (1 - speed);
		_y = (this.size) * (this.dy -1) + DIMENSION * (15/500) * this.dy;
		if(this.dy == this.y && !this.merge)
			return 1;
		if( (this._y + speed ) >= _y - this.size/2) {
			SPAWN = true;
			this.y = this.dy;
			this._y = _y;
			if(this.merge) {
				this.merge = false;
				this.digit *= 2;
				this.content = options['Multiplier'][this.digit];  
				board.splice(index -1, 1);
			}
		}
		else {
			this._y += speed;
			SPAWN = true;
			return 0; 
		}
		break;


	}
};
var SLIDE;
var animateMove = function() {
	var counter = 0;
	for(var i in board) {
		if(board[i].merge) {
			counter += board[i].updatePosition(i);
			i--;
		}
		else {
			counter += board[i].updatePosition(i);
		}
		
	}
	if(counter == board.length) {
		window.cancelAnimationFrame(SLIDE);
		SLIDE = undefined;
		if(GameStatus(board) && SPAWN) {
			spawnNew();
			SPAWN = false;
		}
		else {
			document.addEventListener('keydown', update, false);
		}
		return;
	}
	drawBoard();
	for(var i in board)
		board[i].drawTile();
	SLIDE = window.requestAnimationFrame(animateMove);
};
var update = function (e) {
	document.removeEventListener('keydown', update, false);
	switch(e.keyCode){
		case 37:
		//console.log('Left');
		DIRECTION = 'L';
		moveBoard({x:0, y:0,digit:0, dx:0, dy:0}, board, 'L');
		break;
		case 38:
		DIRECTION = 'U';
		moveBoard({x:0, y:0,digit:0, dx:0, dy:0}, board, 'U');
		//console.log('Up');
		break;
		case 39:
		//console.log('Right');
		DIRECTION = 'R';
		moveBoard({x:0, y:0,digit:0, dx:0, dy:0}, board, 'R');
		break;
		case 40:
		DIRECTION = 'D';
		moveBoard({x:0, y:0,digit:0, dx:0, dy:0}, board, 'D');
		//console.log('Down');
		break;
	}

};
})();
