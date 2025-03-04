import { GameBase } from '../game-base.js';

export class AnimalGame extends GameBase {
    constructor(container, onBack) {
        super(container);
        this._onBack = onBack;
        // TODO: 将来添加动物数据
        this.animals = [];
    }

    getTitle() {
        return '点动物';
    }

    getLanguage() {
        return 'zh-CN';
    }

    generateRoundItems() {
        // TODO: 实现动物游戏的具体逻辑
        return [];
    }

    onBack() {
        this._onBack();
    }
}
