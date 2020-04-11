import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { VoiceService } from '../_core/services/voice.service';
import { ActivatedRoute } from '@angular/router';
import { GameFacade } from '../_core/facades/game.facade';
import { Socket } from 'ngx-socket-io';

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
        private socket: Socket,
    ) {
        this.gFacade.setGame(this.slug);
        this.socket.emit('create_game', this.slug);
    }

    ngOnInit(): void {
        this.socket.on('user_joined', user => {
            this.toaster.info(`${user} joined the game`, null, {
                progressAnimation: 'decreasing',
                positionClass: 'toast-bottom-right'
            });
        });
        this.socket.on('user_left', user => {
            this.toaster.error(`${user} left the game`, null, {
                progressAnimation: 'decreasing',
                positionClass: 'toast-bottom-right'
            });
        });
    }

    callNumber(calledNumber: number) {
        // this.gService.addBall({ letter: 'G', number: calledNumber, dateAdded: new Date() }, this.slug);
        this.voice.speak(`B ${calledNumber}`);
    }

}
