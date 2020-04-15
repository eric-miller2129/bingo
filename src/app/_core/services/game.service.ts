import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Game } from '../models/Game';
import { AngularFirestoreCollection } from '@angular/fire/firestore/public_api';
import { Ball } from '../models/Ball';
import { BehaviorSubject } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
    providedIn: 'root'
})
export class GameService {
    private collection: AngularFirestoreCollection = this.afStore.collection<Game[]>('games');

    constructor(
        private afStore: AngularFirestore,
    ) { }

    createGame(data: Game) {
        return this.collection.add(data);
    }

    setGame(slug: string) {
        return this.afStore
                .collection<Game>('games', ref => ref.where('slug', '==', slug))
                .snapshotChanges();
    }
    addNumber(id: string, ball: Ball) {
        return this.afStore
                .doc(`balls/${id}`)
                .collection('called')
                .add(ball);
    }

    getNumbers(id: string) {
        return this.afStore
                .doc(`balls/${id}`)
                .collection<Ball>('called', ref => ref.orderBy('dateAdded', 'desc'));
    }

    public randomString() {
        const chars = '0123456789abcdefghijklmnopqrstuvwxyz';
        const length = Math.floor(Math.random() * 6) + 4;

        let result = '';

        for (let i = length; i > 0; --i) {
            result += chars[Math.floor(Math.random() * chars.length)];
        }

        return result;
    }
}
