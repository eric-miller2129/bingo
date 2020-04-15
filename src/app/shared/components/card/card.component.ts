import { Component, OnInit } from '@angular/core';

@Component({
    selector: 'app-card',
    templateUrl: './card.component.html',
    styleUrls: ['./card.component.scss']
})
export class CardComponent implements OnInit {
    private settings: Array<any> = [
        {
            min: 1,
            max: 19
        },
        {
            min: 20,
            max: 39
        },
        {
            min: 40,
            max: 59
        },
        {
            min: 60,
            max: 79
        },
        {
            min: 80,
            max: 100
        }
    ];
    numbers: any = new Array(
        [0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0],
    );

    constructor() {}

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
                    this.numbers[r][c] = this.randomNumber(this.settings[c].min, this.settings[c].max);
                }
            }
        }
    }

    private randomNumber(min: number, max: number){
        return Math.floor(Math.random() * (max - min + 1) + min);
    }

}
