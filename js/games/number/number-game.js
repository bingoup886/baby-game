import { GameBase } from '../game-base.js';

export class NumberGame extends GameBase {
    constructor(container, onBack) {
        super(container);
        this._onBack = onBack;
    }

    getTitle() {
        return '点数字';
    }

    getLanguage() {
        return 'zh-CN';
    }

    generateRoundItems() {
        const numbers = [];
        const usedNumbers = new Set();
        
        // 生成9个不重复的随机数字（1-100）
        while (numbers.length < 9) {
            const num = Math.floor(Math.random() * 100) + 1;
            if (!usedNumbers.has(num)) {
                numbers.push({ text: num.toString() });
                usedNumbers.add(num);
            }
        }

        return numbers;
    }

    onBack() {
        this._onBack();
    }
}
