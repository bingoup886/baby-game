import { WordGame } from './games/word/word-game.js';
import { NumberGame } from './games/number/number-game.js';
import { AnimalGame } from './games/animal/animal-game.js';

document.addEventListener('DOMContentLoaded', function() {
    // DOM 元素
    const gameSelection = document.getElementById('game-selection');
    const gamePage = document.getElementById('game-page');
    let currentGame = null;

    // 返回主菜单函数
    function backToMenu() {
        gamePage.style.display = 'none';
        gameSelection.style.display = 'block';
    }

    // 游戏卡片点击事件
    document.querySelectorAll('.game-card').forEach(card => {
        card.addEventListener('click', () => {
            const gameType = card.getAttribute('data-game');
            startGame(gameType);
        });
    });

    // 开始游戏
    function startGame(gameType) {
        gameSelection.style.display = 'none';
        gamePage.style.display = 'block';

        // 根据游戏类型创建相应的游戏实例
        switch (gameType) {
            case 'word':
                currentGame = new WordGame(gamePage, backToMenu);
                break;
            case 'number':
                currentGame = new NumberGame(gamePage, backToMenu);
                break;
            case 'animal':
                currentGame = new AnimalGame(gamePage, backToMenu);
                break;
            default:
                console.error('Unknown game type:', gameType);
                return;
        }

        currentGame.initializeGame();
    }
});
