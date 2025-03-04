export class GameBase {
    constructor(container) {
        this.container = container;
        this.score = 0;
        this.currentRound = null;
        this.synth = window.speechSynthesis;
    }

    // 初始化游戏界面
    initializeGame() {
        this.container.innerHTML = `
            <div class="game-header">
                <button class="back-button">返回</button>
                <h2>${this.getTitle()}</h2>
                <div class="score">得分: <span id="score">0</span></div>
            </div>
            <div class="game-board" id="game-board"></div>
            <div class="feedback" id="feedback"></div>
        `;

        this.gameBoard = this.container.querySelector('#game-board');
        this.feedback = this.container.querySelector('#feedback');
        this.scoreElement = this.container.querySelector('#score');

        // 返回按钮事件
        this.container.querySelector('.back-button').addEventListener('click', () => {
            if (this.synth.speaking) {
                this.synth.cancel();
            }
            this.onBack();
        });

        this.startNewRound();
    }

    // 开始新回合
    startNewRound() {
        this.feedback.textContent = '';
        this.feedback.className = 'feedback';
        this.gameBoard.innerHTML = '';

        const roundItems = this.generateRoundItems();
        const targetIndex = Math.floor(Math.random() * roundItems.length);
        this.currentRound = roundItems[targetIndex];

        roundItems.forEach(item => {
            const card = document.createElement('div');
            card.className = 'word-card';
            card.textContent = item.text;
            card.addEventListener('click', () => this.handleSelection(card));
            this.gameBoard.appendChild(card);
        });

        setTimeout(() => {
            this.playCurrentItem();
            this.enableCards();
        }, 1000);
    }

    // 处理选择
    handleSelection(card) {
        this.disableCards();

        if (card.textContent === this.currentRound.text) {
            card.classList.add('correct');
            this.feedback.textContent = '正确! 👏';
            this.feedback.className = 'feedback correct';
            this.score++;
            this.scoreElement.textContent = this.score;

            setTimeout(() => {
                this.startNewRound();
            }, 1000);
        } else {
            card.classList.add('wrong');
            this.feedback.textContent = '再试一次!';
            this.feedback.className = 'feedback wrong';

            setTimeout(() => {
                card.classList.remove('wrong');
                this.enableCards();
                this.playCurrentItem();
            }, 1000);
        }
    }

    // 播放当前项目
    playCurrentItem() {
        if (this.synth.speaking) {
            this.synth.cancel();
        }

        const utterance = new SpeechSynthesisUtterance(this.currentRound.text);
        utterance.lang = this.getLanguage();
        utterance.rate = 0.8;
        this.synth.speak(utterance);
    }

    // 启用卡片
    enableCards() {
        const cards = this.gameBoard.querySelectorAll('.word-card');
        cards.forEach(card => {
            card.style.pointerEvents = 'auto';
            card.style.opacity = '1';
        });
    }

    // 禁用卡片
    disableCards() {
        const cards = this.gameBoard.querySelectorAll('.word-card');
        cards.forEach(card => {
            card.style.pointerEvents = 'none';
            card.style.opacity = '0.7';
        });
    }

    // 以下方法需要被子类重写
    getTitle() {
        throw new Error('getTitle must be implemented by subclass');
    }

    getLanguage() {
        throw new Error('getLanguage must be implemented by subclass');
    }

    generateRoundItems() {
        throw new Error('generateRoundItems must be implemented by subclass');
    }

    onBack() {
        throw new Error('onBack must be implemented by subclass');
    }
}
