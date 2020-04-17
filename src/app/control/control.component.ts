import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { SwalComponent } from '@sweetalert2/ngx-sweetalert2';

import { GameFacade } from '../_core/facades/game.facade';
import { ActivatedRoute, Router } from '@angular/router';
import { Socket } from 'ngx-socket-io';
import { ControlFacade } from '../_core/facades/control.facade';
import { CardComponent } from '../shared/components/card/card.component';

@Component({
    selector: 'app-control',
    templateUrl: './control.component.html',
})
export class ControlComponent implements OnInit {
    @ViewChild('name', { static: true }) private name: SwalComponent;
    @ViewChild('notConnected', { static: true }) private notConnected: SwalComponent;
    @ViewChild('bingoCard') private card: CardComponent;

    private slug: string = this.route.snapshot.params.slug;
    private userName: string;

    hostConnected = this.socket.fromEvent<boolean>('host_connection');

    gameJoined = false;
    timestamp = new Date().getTime();

    constructor(
        private route: ActivatedRoute,
        public gFacade: GameFacade,
        public cFacade: ControlFacade,
        private socket: Socket,
        private router: Router,
    ) {
        this.gFacade.setGame(this.slug);

        this.socket.emit('initial_join', this.slug);

        this.hostConnected.subscribe(connected => {
            console.log('[Control] Host connected ', connected);
            if (!connected) {
                this.name.dismiss();
                this.notConnected.fire();
                this.gameJoined = false;

            } else if (!this.gameJoined) {
                this.notConnected.dismiss();
                this.name.fire();
            }
        });
    }

    ngOnInit(): void {
        window.addEventListener('unload', (e) => {
            this.socket.emit('leave_game', { name: this.userName, slug: this.slug });
        });
        this.socket.on('number_called', ball => {
            this.cFacade.newBall(ball);
        });

        this.socket.on('new_game', slug => {
            this.slug = slug;
            this.gFacade.setGame(slug);
            this.name.fire();
            this.cFacade.reset();
            this.router.navigate(['/control', slug]);
        });

        this.socket.on('clear_room', () => {
            this.socket.emit('leave_game', { name: this.userName, slug: this.slug });
            this.cFacade.reset();
            this.router.navigate(['/control', this.slug]);
        });

        window.addEventListener('resume', () => {
            console.log('[Control] User resumed session');
            this.socket.emit('leave_game', { name: this.userName, slug: this.slug });
            this.socket.emit('join_game', { name: this.userName, slug: this.slug });
        });

        window.setInterval(this.checkResume, 1000);
    }

    join(name: string) {
        this.userName = name;
        this.socket.emit('join_game', { name, slug: this.slug });
        this.gameJoined = true;
        this.card.build();
    }

    private checkResume() {
        const current = new Date().getTime();
        if (current - this.timestamp > 4000) {
            const event = document.createEvent('Events');
            event.initEvent('resume', true, true);
            document.dispatchEvent(event);
        }
        this.timestamp = current;
    }

}
