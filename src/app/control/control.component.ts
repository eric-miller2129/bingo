import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { SwalComponent } from '@sweetalert2/ngx-sweetalert2';
import { GameFacade } from '../_core/facades/game.facade';
import { ActivatedRoute } from '@angular/router';
import { Socket } from 'ngx-socket-io';
import { ControlFacade } from '../_core/facades/control.facade';
import { CardComponent } from '../shared/components/card/card.component';

@Component({
    selector: 'app-control',
    templateUrl: './control.component.html',
})
export class ControlComponent implements OnInit {
    @ViewChild('name', { static: true }) private name: SwalComponent;
    @ViewChild('bingoCard') private card: CardComponent;

    private slug: string = this.route.snapshot.params.slug;

    constructor(
        private route: ActivatedRoute,
        public gFacade: GameFacade,
        public cFacade: ControlFacade,
        private socket: Socket,
    ) {
        this.gFacade.setGame(this.slug);
    }

    ngOnInit(): void {
        this.name.fire();

        window.addEventListener('unload', (e) => {
            this.socket.emit('leave_game', { name: 'Eric', slug: this.slug });
        });
        this.socket.on('number_called', ball => {
            this.cFacade.newBall(ball);
        });
    }

    join(name: string) {
        this.socket.emit('join_game', { name, slug: this.slug });
        this.card.build();
    }

}
