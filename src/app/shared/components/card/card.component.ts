import { Component, OnInit } from '@angular/core';

@Component({
    selector: 'app-card',
    templateUrl: './card.component.html',
    styleUrls: ['./card.component.scss']
})
export class CardComponent implements OnInit {
    private settings: Array<object> = [
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
    numbers: any = [
        [0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0],
    ];

    constructor() {}

    ngOnInit(): void {
        console.log('[Card] Initialized');
    }

    async build() {
        let rowIndex = 0;
        let colIndex = 0;

        // do {
        //     do {
        //         this.numbers[row][col] = 12;
        //         col++;
        //     } while (col < this.numbers[row].length);

        //     col = 0;
        //     row++;
        // } while (row < this.numbers.length);
    }

}
