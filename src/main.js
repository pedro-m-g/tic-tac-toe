import BoardView from "./components/BoardView";
import CoinTossDialog from "./components/CoinTossDialog";
import SetupDialog from "./components/SetupDialog";
import GameOverDialog from "./components/GameOVerDialog";
import GameController from "./controller/GameController";

document.addEventListener('DOMContentLoaded', () => {
    const controller = new GameController({
        setupDialog: new SetupDialog(),
        coinTossDialog: new CoinTossDialog(),
        boardView: new BoardView(),
        gameOverDialog: new GameOverDialog()
    });

    controller.start();
});