# XOX Game

## Overview
A web-based Tic-Tac-Toe game where you play as Cat Bus against the AI opponent (Totoro). Features a scoreboard to track your matches against the AI.

## Features
- Single-player gameplay against AI
- Real-time score tracking
- Themed characters (Cat Bus vs Totoro)
- Responsive design
- Victory/Draw animations with modal display

## Project Structure
```
xox-game
├── src
│   ├── index.html          # Main HTML file for the game
│   ├── js
│   │   ├── main.js         # Initializes the game and handles interactions
│   │   ├── game.js         # Contains the Game class and game logic
│   │   ├── player.js       # Represents a human player
│   │   ├── ai.js           # Represents the AI player
│   │   └── scoreboard.js    # Manages the scoreboard
│   ├── css
│   │   └── styles.css      # Styles for the game
│   └── tests
│       └── game.test.js    # Unit tests for the game logic
├── package.json            # npm configuration file
└── README.md               # Project documentation
```

## Getting Started
1. Clone the repository
2. Run `npm install`
3. Open `src/index.html` in your browser

## How to Play
1. You play as Cat Bus (O)
2. Click any empty cell to make your move
3. Totoro (AI) will respond with its move
4. Get three in a row to win
5. Use "Start New Game" button to reset the board

## Contributing
Issues and pull requests are welcome.