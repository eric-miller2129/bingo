import { Injectable } from "@angular/core";

@Injectable({
    providedIn: 'root'
})
export class SettingsService {
    public balls = ['B', 'I', 'N', 'G', 'O'];
    public minMax = {
        standard: [
            {
                min: 1,
                max: 15
            },
            {
                min: 16,
                max: 30,
            },
            {
                min: 31,
                max: 45,
            },
            {
                min: 46,
                max: 60,
            },
            {
                min: 61,
                max: 75
            }
        ],
        ball100: [
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
        ]
    };

    findLetter(gameType, calledNumber) {
        const bIndex = this.minMax[gameType].findIndex(b => calledNumber >= b.min && calledNumber <= b.max);

        return this.balls[bIndex];
    }
}
