2048.js
=======

2048.js is made to implement a customized 2048 puzzel game. This is a canvas implementaion of the game. This js allows
customization of the board in the 2048 game.

Following are some of the Game features:
Change the size of the Borad;
Change the tile color and the background;
Change the tiles content by specifying all the multipliers
Autosave and highscore

To make a new Game:
1. include the 2048.min.js or 2048.js at the end of the body;
2. Declare elements in the Html file with following ids.
   __2048__ = the main Game , this will contain the Board;
   __2048__score = this will receive the score updates;
   __2048__highscore = this will show the high score so far
   __2048__newgame = The element to restart a new game
3. Declare a Game variable and call its init function.
   var game = new __2048__({{Dimension:400}});
   game.init();
   
   OPTIONS
   ========
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
    
    All options are optional.
    
  
    
    
