# Mural.co technical interview test

Let's play tic-tac-toe.

This test serves as a basis for the technical evaluation of a candidate.

### Skillset

Here's a typical breakdown of how much time should be spent on each skill we are probing for.

|Skill|Time|
|-----|----|
|1. Design patterns & Data structures|50%| 
|2. Unit testing|25%|
|3. React|15%|
|4. HTML/CSS & Web semantics|10%|

### Tasks

#### 1. Design patterns/algorithms

 - [ ] Implement a move encoder with chess notation 123,abc
 
 Every time a move is played, we should keep track of the move in the following format:
 
 ```
 [piece][col][row][marker] where 
 piece: (X, O), 
 col: (a-c), 
 row: (1-3), 
 marker: (!) if the move is a game winner.
         (#) if the game is a draw 
 ```
 
 For instance, the if `X` plays the top-left square, then the move should be:
 
 `Xa3`
 
 We should then display the list as a pair of move and counter-move, as such:
 
 - Xa3 Ob2
 - Xa1 Oa2
 - Xc2 Ob3
 - Xb1 Oc1
 - Xc3#

#### 5. React

Implement the rendering logic 

 - Rendering elements
 - Game state/reset
 - User interactions
 - Async components
 
 - [ ] Implement AI thinking behavior
 
 We want to improve the user feedback for our tic-tac-toe AI. 
 The AI should look like it is thinking hard so the users feels it is more clever than it actually is.

 We should add an articifial delay (850ms) before the AI plays its move, during which the player cannot play.

#### 3. Unit testing

##### 1. Add one simple unit test

 - [ ] You can only play in a empty square
 
 Implement the test case at `game > .playAt > fails when playing on a non-empty square` in _src/lib.test.js_

##### 2. Add one complex unit test

 - [ ] Winning end-game test (programatic/property-based testing)
 
 Implement the test cases at `game > .calculateWinner` in _src/lib.test.js_

#### 4. HTML/CSS & Web semantics

 - [ ] Implement the UI design
 
 [[/public/mockup.png|HTML Mockup]]
 
Proper usage of HTML landmarks, i.e.:

 - <img alt /> attributes for images
 - <p />
 - <section />
