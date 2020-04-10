import { Injectable } from '@angular/core';

import * as io from 'socket.io-client';

@Injectable({
    providedIn: 'root'
})
export class WebsocketService {
    private url = 'http://192.168.86.30:4444';
    private socket;

    constructor() {
        this.socket = io(this.url);
    }

    create(slug) {
        this.socket.emit('create_game', slug);
    }

    join(slug) {
        this.socket.emit('join_game', slug);
    }
}
