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

#### 1. Unit testing

##### 1. Add one simple unit test

 1. You can only play in a empty square
 2. You can only place a single Ω piece per game 
 3. You can't play when the game has ended
 4. You can't play when the AI is thinking

##### 2. Add one complex unit test

 1. Winning end-game test (programatic/property-based testing)
 
 For a board of M×M size, there are 2+2*M possible solutions
 But how do you test the _rest_?
 
 Q&A: Is this exhaustive?
 
 2. AI should play randomly (requires mocking `random`)

#### 2. Design patterns/algorithms

 1. Implement a new piece behavior
 2. Implement a move recorder (encoding) with chess notation 123,abc
 3. Implement a parametric board size
 4. Q&A to test for the patterns that existed in the codebase

 - AI Implementation (visitor)
 - Creating the board (factory)
 - Pick your AI implementation (strategy)
 - Undo feature (memento)
 - De-duplicating the board state (flyweight)

#### 3. Data structures

 1. Board structure 
 2. Piece definition
 3. Piece behavior
 4. Game state

#### 4. Web semantics

##### Usage of proper tags

 1. Proper usage of HTML landmarks

 - <img alt /> attributes for images
 - <p />
 - <section />

 2. Appropriate usage of ARIA/fallback attributes

#### 5. React

Implement the rendering logic 

 - Rendering elements
 - Game state/reset
 - User interactions
 - Handle error modes
 - Async components (AI thinking…)
 
 1. Implement AI thinking behavior (code)
 2. Implement error messages handling (code)
