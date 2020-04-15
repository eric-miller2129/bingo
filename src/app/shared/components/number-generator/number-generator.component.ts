import { Ball } from './../../../_core/models/Ball';
import { GameFacade } from './../../../_core/facades/game.facade';
import { SettingsService } from './../../../_core/services/settings.service';
import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { interval, BehaviorSubject } from 'rxjs';
import { take, finalize } from 'rxjs/operators';

@Component({
    selector: 'app-number-generator',
    templateUrl: './number-generator.component.html',
})
export class NumberGeneratorComponent implements OnInit {
    @Output() iHaveChosen: EventEmitter<Ball> = new EventEmitter<Ball>();

    numberSubject: BehaviorSubject<Ball> = new BehaviorSubject<Ball>({ letter: 'B', number: 0 } as Ball);
    number$ = this.numberSubject.asObservable();

    private interval;
    public numbers;

    private gameSettings = this.settings.minMax[this.gFacade.game.gameType];
    private maxNumber = this.gameSettings[this.gameSettings.length - 1].max;

    constructor(
        private settings: SettingsService,
        private gFacade: GameFacade,
    ) { }

    ngOnInit(): void {
    }

    get number(): Ball {
        return this.numberSubject.getValue();
    }

    drawNumber() {
        this.interval = interval(25);
        this.numbers = this.interval.pipe(
            take(50),
            finalize(() => {
                this.numberSubject.next(this.randomNumber(1, this.maxNumber));
                this.iHaveChosen.emit(this.number);
            })
        );

        this.numbers.subscribe(num => {
            this.numberSubject.next(this.randomNumber(1, this.maxNumber));
        });
    }

    private randomNumber(min: number, max: number): Ball{
        const ballNo =  Math.floor(Math.random() * (max - min + 1) + min);
        const type = this.gFacade.game.gameType;
        const letter = this.settings.findLetter(type, ballNo);

        return { letter, number: ballNo };
    }

}
