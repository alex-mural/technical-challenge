# Mural.co technical interview test

Let's play tic-tac-toe!

## Goals

This test should serve as a basis for the technical evaluation of a candidate

## Skillset

Here's a typical breakdown of how much time should be spent on each skill we are probing for.

|Skill|Time|
|-----|----|
|Unit testing|25%|
|Design patterns|25%| (algorithm)
|Data structures|20%| (algorithm)
|Web semantics|15%|
|React|15%|


## Tasks

### A) Unit testing

 1. Add one simple unit test
      1. You can only play in an empty square (~10min)
      2. You can't play when the game has ended
      3. You can only place a single Ω piece per game 
      4. You can't play when the AI is thinking
 2. Add one complex unit test
      1. Winning end-game test (programatic/property-based testing) (~20min)
          - For a board of M×M size, there are 2+2*M possible solutions 
          But how do you test the _rest_?
          - Q&A: Is this exhaustive?
      2. AI should play randomly (requires mocking `random`)
          - seed works

### B) Design patterns/algorithms

 1. Implement a move recorder (encoding) with chess notation 123,abc (~15-30min)
 2. Implement a new piece behavior
 3. Implement a parametric board size
 4. Q&A to test for the patterns that existed in the codebase
      - AI Implementation (visitor)
      - Creating the board (factory)
      - Pick your AI implementation (strategy)
      - Undo feature (memento)
      - De-duplicating the board state (flyweight)

### C) Data structures

 1. Board structure
 2. Piece definition (x)
 3. Piece behavior
 4. Game state (x)

### D) Web semantics

 1. Proper usage of HTML landmarks
    - `<img alt />` attributes for images
    - `<p />`
    - `<section />`
 2. HTML Scaffolding
    - Implement the UI design (~15min)
 3. ARIA/A11y: Implement a11y features usage of ARIA/fallback attributes (~15min)
    - Tab index for all the cells (x)
    - Screen reader feedback for focusing a cell
    - Screen reader feedback for piece placement

### E) React

 1. Implement the rendering logic 
    - Rendering elements
    - Game state/reset
    - User interactions
    - Async components (AI thinking…)
 2. Implement AI thinking behavior (code) (~30min)
 3. Implement error messages handling (code)
