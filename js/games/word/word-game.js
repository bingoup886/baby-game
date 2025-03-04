import { GameBase } from '../game-base.js';

export class WordGame extends GameBase {
    constructor(container, onBack) {
        super(container);
        this._onBack = onBack;
        this.words = [
            { text: 'apple', translation: '苹果' },
            { text: 'banana', translation: '香蕉' },
            { text: 'cat', translation: '猫' },
            { text: 'dog', translation: '狗' },
            { text: 'elephant', translation: '大象' },
            { text: 'fish', translation: '鱼' },
            { text: 'giraffe', translation: '长颈鹿' },
            { text: 'house', translation: '房子' },
            { text: 'ice cream', translation: '冰淇淋' },
            { text: 'juice', translation: '果汁' },
            { text: 'kite', translation: '风筝' },
            { text: 'lion', translation: '狮子' },
            { text: 'monkey', translation: '猴子' },
            { text: 'nose', translation: '鼻子' },
            { text: 'orange', translation: '橙子' },
            { text: 'pig', translation: '猪' },
            { text: 'queen', translation: '女王' },
            { text: 'rabbit', translation: '兔子' },
            { text: 'sun', translation: '太阳' },
            { text: 'tree', translation: '树' }
        ];
    }

    getTitle() {
        return '点单词';
    }

    getLanguage() {
        return 'en-US';
    }

    generateRoundItems() {
        const roundWords = [];
        const availableWords = [...this.words];

        for (let i = 0; i < 9 && availableWords.length > 0; i++) {
            const randomIndex = Math.floor(Math.random() * availableWords.length);
            roundWords.push(availableWords.splice(randomIndex, 1)[0]);
        }

        return roundWords;
    }

    onBack() {
        this._onBack();
    }
}
