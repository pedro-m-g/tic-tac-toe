# Tic Tac Toe

This project implements a classic Tic Tac Toe game as a web app. It uses webpack for assets bundling.

## How To
### Install dependencies
```sh
npm install
```

### Run the app
```sh
npm run serve
```

### Test the app
```sh
npm test
```

## Architecture
| File | Description |
|------|-------------|
| `package.json` | NPM Project Definition |
| `webpack.config.js` | Webpack Configuration |
| `src/main.js` | App entry point |
| `src/index.html` | HTML with automatic app scripts injection |
| `src/domain/` | Domain objects for the app |
| `src/services/` | Functions implementing business logic |
| `public/` | Output directory for production builds |

## Testing
This project uses `Jest` as test runner. To create a test for a file `component.js`, create a new file named `component.test.js` in the same directory as `component.js`. Here is an example of an existing test, for reference:

```js
import Board from './Board';
import calculateNextGameState from '../services/calculateNextGameState';
import GameState from './GameState';

describe('calculateNextGameState', () => {
    test('should return PLAYING state when the board is completely empty', () => {
        const board = new Board();
        const transition = calculateNextGameState(board);
        expect(transition.state).toBe(GameState.PLAYING);
    });
});
```

You can find more info about Jest API at [Jest Docs](https://jestjs.io/docs/getting-started).