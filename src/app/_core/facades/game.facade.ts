import { Injectable } from '@angular/core';
import { GameService } from '../services/game.service';
import { Observable, of, BehaviorSubject } from 'rxjs';
import { Game } from '../models/Game';
import { map, switchMap } from 'rxjs/operators';
import { Ball } from '../models/Ball';

@Injectable({
    providedIn: 'root'
})
export class GameFacade {
    public game$: Observable<Game>;
    private gameSub: BehaviorSubject<Game> = new BehaviorSubject<Game>({} as Game);
    public numbers$: Observable<Ball[]>;

    constructor(
        private service: GameService
    ) { }

    setGame(slug: string){
        this.game$ = this.service.setGame(slug)
            .pipe(
                map(actions => actions.map(a => {
                    const data = a.payload.doc.data() as Game;
                    const id = a.payload.doc.id;

                    return { id, ...data };
                })),
                switchMap(games => {
                    this.gameSub.next(games[0]);
                    this.getNumbers();

                    return of(games[0]);
                })
            );
    }

    get game() {
        return this.gameSub.getValue();
    }

    addNumber(ball: Ball, id: string) {
        return this.service.addNumber(id, ball);
    }

    getNumbers() {
        this.numbers$ = this.service.getNumbers(this.game.id).valueChanges();
    }
}
