import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { interval, BehaviorSubject } from 'rxjs';
import { take, finalize } from 'rxjs/operators';

@Component({
    selector: 'app-number-generator',
    templateUrl: './number-generator.component.html',
})
export class NumberGeneratorComponent implements OnInit {
    @Output() iHaveChosen: EventEmitter<number> = new EventEmitter<number>();

    numberSubject: BehaviorSubject<number> = new BehaviorSubject<number>(0);
    number$ = this.numberSubject.asObservable();

    private interval;
    public numbers;

    constructor() { }

    ngOnInit(): void {
    }

    get number(): number {
        return this.numberSubject.getValue();
    }

    drawNumber() {
        this.interval = interval(25);
        this.numbers = this.interval.pipe(
            take(50),
            finalize(() => {
                this.numberSubject.next(this.randomNumber(1, 100));
                this.iHaveChosen.emit(this.number);
            })
        );

        this.numbers.subscribe(num => {
            this.numberSubject.next(this.randomNumber(1, 100));
        });
    }

    private randomNumber(min: number, max: number){
        return Math.floor(Math.random() * max) + min;
    }

}
