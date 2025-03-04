document.addEventListener('DOMContentLoaded', function() {
    // 游戏数据
    const gameData = {
        word: {
            title: '点单词',
            words: [
                { text: 'apple', audio: 'apple', translation: '苹果' },
                { text: 'banana', audio: 'banana', translation: '香蕉' },
                { text: 'cat', audio: 'cat', translation: '猫' },
                { text: 'dog', audio: 'dog', translation: '狗' },
                { text: 'elephant', audio: 'elephant', translation: '大象' },
                { text: 'fish', audio: 'fish', translation: '鱼' },
                { text: 'giraffe', audio: 'giraffe', translation: '长颈鹿' },
                { text: 'house', audio: 'house', translation: '房子' },
                { text: 'ice cream', audio: 'ice cream', translation: '冰淇淋' },
                { text: 'juice', audio: 'juice', translation: '果汁' },
                { text: 'kite', audio: 'kite', translation: '风筝' },
                { text: 'lion', audio: 'lion', translation: '狮子' },
                { text: 'monkey', audio: 'monkey', translation: '猴子' },
                { text: 'nose', audio: 'nose', translation: '鼻子' },
                { text: 'orange', audio: 'orange', translation: '橙子' },
                { text: 'pig', audio: 'pig', translation: '猪' },
                { text: 'queen', audio: 'queen', translation: '女王' },
                { text: 'rabbit', audio: 'rabbit', translation: '兔子' },
                { text: 'sun', audio: 'sun', translation: '太阳' },
                { text: 'tree', audio: 'tree', translation: '树' }
            ]
        },
        number: {
            title: '点数字',
            words: [] // 将来实现
        },
        animal: {
            title: '点动物',
            words: [] // 将来实现
        }
    };

    // 游戏状态
    let currentGame = null;
    let currentRound = null;
    let score = 0;
    
    // DOM 元素
    const gameSelection = document.getElementById('game-selection');
    const gamePage = document.getElementById('game-page');
    const gameTitle = document.getElementById('game-title');
    const gameBoard = document.getElementById('game-board');
    const feedback = document.getElementById('feedback');
    const scoreElement = document.getElementById('score');
    
    // 初始化语音合成
    const synth = window.speechSynthesis;
    
    // 游戏卡片点击事件
    document.querySelectorAll('.game-card').forEach(card => {
        card.addEventListener('click', () => {
            const gameType = card.getAttribute('data-game');
            startGame(gameType);
        });
    });
    
    // 返回按钮事件
    document.querySelector('.back-button').addEventListener('click', () => {
        gamePage.style.display = 'none';
        gameSelection.style.display = 'block';
        if (synth.speaking) {
            synth.cancel();
        }
    });
    
    // 开始游戏
    function startGame(gameType) {
        currentGame = gameType;
        score = 0;
        scoreElement.textContent = '0';
        
        // 切换界面
        gameSelection.style.display = 'none';
        gamePage.style.display = 'block';
        
        // 设置游戏标题
        gameTitle.textContent = gameData[gameType].title;
        
        // 开始第一轮
        startNewRound();
    }
    
    // 开始新回合
    function startNewRound() {
        // 清空反馈
        feedback.textContent = '';
        feedback.className = 'feedback';
        
        // 清空游戏板
        gameBoard.innerHTML = '';
        
        // 从词库中随机选择9个单词
        const allWords = [...gameData[currentGame].words];
        const roundWords = [];
        
        for (let i = 0; i < 9 && allWords.length > 0; i++) {
            const randomIndex = Math.floor(Math.random() * allWords.length);
            roundWords.push(allWords.splice(randomIndex, 1)[0]);
        }
        
        // 随机选择一个作为当前回合的目标单词
        const targetIndex = Math.floor(Math.random() * roundWords.length);
        currentRound = roundWords[targetIndex];
        
        // 创建单词卡片
        roundWords.forEach(word => {
            const wordCard = document.createElement('div');
            wordCard.className = 'word-card';
            wordCard.textContent = word.text;
            wordCard.addEventListener('click', () => handleWordSelection(wordCard));
            gameBoard.appendChild(wordCard);
        });

        // 延迟一秒后播放单词
        setTimeout(() => {
            playCurrentWord();
            enableWordCards();
        }, 1000);
    }
    
    // 播放当前单词
    function playCurrentWord() {
        if (synth.speaking) {
            synth.cancel();
        }
        
        const utterance = new SpeechSynthesisUtterance(currentRound.text);
        utterance.lang = 'en-US';
        utterance.rate = 0.8;
        synth.speak(utterance);
    }
    
    // 处理单词选择
    function handleWordSelection(wordCard) {
        // 禁用所有卡片
        disableWordCards();
        
        if (wordCard.textContent === currentRound.text) {
            // 正确答案
            wordCard.classList.add('correct');
            feedback.textContent = '正确! 👏';
            feedback.className = 'feedback correct';
            score++;
            scoreElement.textContent = score;
            
            // 1秒后进入下一轮
            setTimeout(() => {
                startNewRound();
            }, 1000);
        } else {
            // 错误答案
            wordCard.classList.add('wrong');
            feedback.textContent = '再试一次!';
            feedback.className = 'feedback wrong';
            
            // 1秒后允许重试
            setTimeout(() => {
                wordCard.classList.remove('wrong');
                enableWordCards();
                playCurrentWord();
            }, 1000);
        }
    }
    
    // 启用单词卡片
    function enableWordCards() {
        const cards = document.querySelectorAll('.word-card');
        cards.forEach(card => {
            card.style.pointerEvents = 'auto';
            card.style.opacity = '1';
        });
    }
    
    // 禁用单词卡片
    function disableWordCards() {
        const cards = document.querySelectorAll('.word-card');
        cards.forEach(card => {
            card.style.pointerEvents = 'none';
            card.style.opacity = '0.7';
        });
    }
});
