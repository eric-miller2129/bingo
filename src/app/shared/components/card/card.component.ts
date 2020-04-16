import { GameFacade } from './../../../_core/facades/game.facade';
import { SettingsService } from './../../../_core/services/settings.service';
import { Component, OnInit } from '@angular/core';

@Component({
    selector: 'app-card',
    templateUrl: './card.component.html',
    styleUrls: ['./card.component.scss']
})
export class CardComponent implements OnInit {
    private gameSettings = this.settings.minMax[this.gFacade.game.gameType];
    private maxNumber = this.gameSettings[this.gameSettings.length - 1].max;
    private numbersOnCard = [];

    numbers: any = new Array(
        [0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0],
    );

    constructor(
        private settings: SettingsService,
        private gFacade: GameFacade,
    ) {}

    ngOnInit(): void {
        console.log('[Card] Initialized');
    }

    async build() {
        // tslint:disable-next-line: prefer-for-of
        for (let r = 0; r < this.numbers.length; r++) {
            // tslint:disable-next-line: prefer-for-of
            for (let c = 0; c < this.numbers[r].length; c++) {
                if (r === 2 && c === 2) {
                    this.numbers[2][2] = 'FREE';
                } else {
                    this.numbers[r][c] = this.randomNumber(this.gameSettings[c].min, this.gameSettings[c].max);
                }
            }
        }
    }

    private randomNumber(min: number, max: number){
        const rolledNumber = Math.floor(Math.random() * (max - min + 1) + min);

        if (this.numbersOnCard.includes(rolledNumber)) {
            console.log('[Card Component] Hit duplicate', rolledNumber);
            return this.randomNumber(min, max);
        }
        this.numbersOnCard.push(rolledNumber);

        return rolledNumber;
    }

}
