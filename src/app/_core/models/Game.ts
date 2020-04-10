import { Ball } from './Ball';
import { Player } from './Player';

export interface Game {
    name: string;
    gameType: string;
    prizes: string;
    slug: string;
    balls: Ball[];
    players: Player[];
}
