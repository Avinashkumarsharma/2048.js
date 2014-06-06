2048.js
=======

2048.js implements a customized 2048 puzzel game. This is a canvas implementaion of the game. This js allows
customization of the board in the 2048 game.

Some of the Features include

* Autosave
* Highscore so far
* Customize the board according to need
* Change the color, size and multiplier value etc.
* its just 9kb.

####[Play it!](http://2048.webuda.com/)


Version
======

1.0

Dependencies
======

2048.js doesn't use any other library all it requires are

* HTML5 supported Browser, Prefrebly Chrome or Firefox
* Browser Supporting Canvas
* Thats  it!


HTML ids
======

| ids           | Purpose                                      | 
|:-------------:|:--------------------------------------------:| 
| \__2048__      | The main Game , this will contain the Board. | 
| \__2048__score | This will receive the score updates.         |   
|\__2048__highscore|  This will show the high score so far      |
|\__2048__newgame  | The element to restart a new game          |

Instalation
======
Just include the 2048.min.js or 2048.js , make a new __2048__ object and call its init method
```js
<script>
var game = new __2048__();
game.init();
</script>
```
Example
======
```html
<!DOCTYPE html>
<html>

<head>
<meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
<title>2048|Lets Play the puzzel</title>
<!--<script src = 'sort.js'></script> -->
<style type="text/css">
	body{
		background: #eeeeee;
		font-size: 2em;
		font-family: sans-serif;
		font-weight: bold;
		color: #a0968c;
		overflow: hidden; 
	}
	header {
		color:#aaaaaa;
		text-align: center;
	}
	a {
		text-decoration: none;
		color:#59514a;
		border-radius: 5px; 
		display: block;
		font-size: 0.8em;
		padding:0.2em;
		background: #cccccc;
		text-align: center;
		width:200px;
		margin:auto;
	}
	li {
		display: inline;
		list-style: none;
		margin-right: 1em;
	}
	section {
		text-align: center;
	}
</style>
</head>
<body>
	<section>
		<header>2048.js</header>
	<div id ="__2048__"></div>
	<ul>
		<li>Score:</li>
		<li id ="__2048__score"></li>
		<li>High score:</li>
		<li id ="__2048__highscore"></li><br>
		<li><a href="#" id = "__2048__newgame">New Game</a></li>
		
	</ul>
	</section>
	
	<script src ="2048.min.js"></script>
	<script type="text/javascript">
	var x = new __2048__({Dimension:400});
 	x.init();
	</script> 
</body>

</html>
```
Options
======
```
The game variable can take a single options object describing the 2048 Game board which are optional;
   
   Multiplier: This is specifies the multiplier and their correesponding values;
   example: {Multiplier:
              2: '2', 
							4: '4',
							8: '8',
							16: '16',
							32: '32',
							64: '64',
							128: '128',
							256: '256',
							512: '512',
							1024: '1024',
							2048: '2048'}
	 This is the Default;
	 
	 Tile: The contains a [Multiplier][Background][Font Color] in order
	 example: {Tile:
	          2:['#eee4da','#776e65'], 
					  4:['#ede0c8','#776e65'],
					  8:['#f2b179','#f9f6f2'],
					  16:['#f59563','#f9f6f2'],
					  32:['#f67c5f','#f9f6f2'],
					  64:['#f65e3b','#f9f6f2'],
					  128:['#edcf72','#f9f6f2'],
					  256:['#edcc61','#f9f6f2'],
					  512:['#edc850','#f9f6f2'],
					  1024:['#f9d769','#f9f6f2'],
					  2048:['#f1b43d','#f9f6f2']}
		This is the default Tile option
		
		Background: The Background of the Board
		example:	{Background:#bbada0}
		
    Forground: The color of the placeholder of Tiles
    example: {Forground:#ccc0b3}
    
    Dimension: The size of the Board
    example: {Dimension:400} will make a 400px x 400px Board.
    
    One or more options can be used together.
    example: {Background:#bbada0,Dimension:500 }
```






