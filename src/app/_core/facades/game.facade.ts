import { Injectable } from '@angular/core';
import { GameService } from '../services/game.service';
import { Observable, of } from 'rxjs';
import { Game } from '../models/Game';
import { map, switchMap } from 'rxjs/operators';

@Injectable({
    providedIn: 'root'
})
export class GameFacade {
    public game$: Observable<Game>;

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
                    return of(games[0]);
                })
            );
    }
}
