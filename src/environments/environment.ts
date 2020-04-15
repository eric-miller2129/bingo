// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
    production: false,
    url: 'https://localhost:4200',
    socketUrl: 'http://localhost:4444',
    firebase: {
        apiKey: 'AIzaSyALHFEVo8yoFmIKyy-HNoxYpKOY4LG2vFY',
        authDomain: 'bingo-682f7.firebaseapp.com',
        databaseURL: 'https://bingo-682f7.firebaseio.com',
        projectId: 'bingo-682f7',
        storageBucket: 'bingo-682f7.appspot.com',
        messagingSenderId: '281507149604',
        appId: '1:281507149604:web:d202fb64b4ba4dc927a5b1',
        measurementId: 'G-VTH1R7VKCR'
    }
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
import 'zone.js/dist/zone-error';  // Included with Angular CLI.
