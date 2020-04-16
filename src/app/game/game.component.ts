import { GameService } from './../_core/services/game.service';
import { Ball } from './../_core/models/Ball';
import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { VoiceService } from '../_core/services/voice.service';
import { ActivatedRoute, Router } from '@angular/router';
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
        private gService: GameService,
        private route: ActivatedRoute,
        private socket: Socket,
        private router: Router,
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

    callNumber(calledNumber: Ball) {
        const ball = { ...calledNumber, dateAdded: new Date() };

        this.gFacade.addNumber(ball, this.gFacade.game.id);
        // this.voice.speak(`B ${calledNumber}`);
        this.socket.emit('number_called', { ball, slug: this.slug });
    }

    async newGame() {
        const slug = await this.gService.randomString();

        this.gService.createGame({
            name: this.gFacade.game.name,
            email: this.gFacade.game.email,
            gameType: this.gFacade.game.gameType,
            prizes: this.gFacade.game.prizes,
            slug
        }).then(() => {
            this.socket.emit('new_game', { previous: this.slug, new: slug });
            this.slug = slug;
            this.gFacade.setGame(slug);
            this.socket.emit('create_game', slug);
            this.router.navigate(['/game', slug]);
        });
    }

}
