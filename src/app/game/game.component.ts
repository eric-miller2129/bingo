import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { VoiceService } from '../_core/services/voice.service';
import { ActivatedRoute } from '@angular/router';
import { GameFacade } from '../_core/facades/game.facade';
import { WebsocketService } from '../_core/services/websocket.service';

@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
})
export class GameComponent implements OnInit {
    private slug = this.route.snapshot.params.slug;

    constructor(
        private toaster: ToastrService,
        private voice: VoiceService,
        public gFacade: GameFacade,
        private route: ActivatedRoute,
        private wsService: WebsocketService
    ) {
        this.gFacade.setGame(this.slug);
        this.wsService.join(this.slug);
    }

    ngOnInit(): void {
        // this.socket.on('joined', user => {
        //     this.toaster.info(`${user.name} joined the game`, null, {
        //         progressAnimation: 'decreasing',
        //         positionClass: 'toast-bottom-right'
        //     });
        // });
        // this.socket.on('userLeft', user => {
        //     console.log(`${user.name} left!`);
        //     this.toaster.error(`${user.name} left the game`, null, {
        //         progressAnimation: 'decreasing',
        //         positionClass: 'toast-bottom-right'
        //     });
        // });
    }

    callNumber(calledNumber: number) {
        // this.gService.addBall({ letter: 'G', number: calledNumber, dateAdded: new Date() }, this.slug);
        this.voice.speak(`B ${calledNumber}`);
    }

}
