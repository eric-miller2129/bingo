import { Component, OnInit, ViewChild } from '@angular/core';
import { SwalComponent } from '@sweetalert2/ngx-sweetalert2';
import { GameFacade } from '../_core/facades/game.facade';
import { ActivatedRoute } from '@angular/router';
import { WebsocketService } from '../_core/services/websocket.service';

@Component({
    selector: 'app-control',
    templateUrl: './control.component.html',
})
export class ControlComponent implements OnInit {
    @ViewChild('name', { static: true }) private name: SwalComponent;

    private slug: string = this.route.snapshot.params.slug;

    constructor(
        private route: ActivatedRoute,
        public gFacade: GameFacade,
        private wsService: WebsocketService,
    ) {
        this.gFacade.setGame(this.slug);
        this.wsService.join(this.slug);
    }

    ngOnInit(): void {
        this.name.fire();

        window.addEventListener('unload', (e) => {
            // this.socket.emit('leftGame', { name: 'Eric' });
        });
    }

    join(name: string) {
        // this.socket.emit('joinGame', { name });
    }

}
