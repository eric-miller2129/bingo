import { Injectable } from '@angular/core';

@Injectable({
    providedIn: 'root'
})
export class VoiceService {
    private synthesis;
    private voice;
    private utterance;

    private hasVoice: boolean;

    constructor() {
        if ('speechSynthesis' in window) {
            this.hasVoice = true;

            this.synthesis = window.speechSynthesis;
            this.voice = this.synthesis.getVoices().find(v => v.lang === 'en');
        }
    }

    speak(whatToSay) {
        // tslint:disable-next-line:curly
        if (!this.hasVoice) return;

        this.utterance = new SpeechSynthesisUtterance(whatToSay.toString());
        this.utterance.voice = this.voice;
        this.utterance.rate = 0.7;

        this.synthesis.speak(this.utterance);
    }
}
