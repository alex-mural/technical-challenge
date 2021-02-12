# Mural.co technical interview test

Let's play tic-tac-toe.

## Goals

This test should serve as a basis for the technical evaluation of a candidate

### Skillset

Here's a typical breakdown of how much time should be spent on each skill we are probing for.

|Skill|Time|
|-----|----|
|Unit testing|25%|
|Design patterns|25%|
|Data structures|20%|
|Web semantics|15%|
|React|15%|

#### Unit testing

##### Add one simple unit test

 - You can only play in a empty square
 - You can only place a single Ω piece per game 
 - You can't play when the game has ended
 - You can't play when the AI is thinking

##### Add one complex unit test

 - Winning end-game test (programatic/property-based testing)
 
 For a board of M×M size, there are 2+2*M possible solutions
 But how do you test the _rest_?
 
 Q&A: Is this exhaustive?
 
 - AI should play randomly (requires mocking `random`)

#### Design patterns/algorithms

 - Implement a new piece behavior
 - Q&A to test for the patterns that existed in the codebase

##### Visitor pattern?

 - AI Implementation?
 - Hot spot pattern?

##### Factory pattern?

 - Creating the board

##### Strategy pattern?

 - Pick your AI implementation

##### Memento pattern?

 - Undo feature
 
##### Flyweight pattern

 - De-duplicating the board state

#### Data structures

 - Board structure 
 - Piece definition
 - Piece behavior
 - Game state
 - Move recorder (encoding) with chess notation 123,abc

#### Web semantics

##### Usage of proper tags

 - <img alt /> attributes for images
 - <p />
 - <section />

##### Appropriate usage of ARIA/fallback attributes

???

#### React

Implement the rendering logic 

 - Rendering elements
 - Game state/reset
 - User interactions
 - Handle error modes
 - Async components (AI thinking…)
