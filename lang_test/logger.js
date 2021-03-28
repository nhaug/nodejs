// da es eine Klasse ist, wird diese groß geschrieben.
// Die klasse stellt uns Methoden zur Verfügung um mit Instanzen der Klasse zu arbeiten.
const EventEmitter = require('events')

const url = 'http://mylogger.io/log';

// bei JS können klassen von anderen abgeleitet werden
class Logger extends EventEmitter {
    // Funktionen die in einer Klasse Stehen sind Methoden
    log(msg) {
        console.log(msg);
    
        // Raise an event (to emit an event)
        // emit - making a noise, produce a signal!
        this.emit('messageLogged', {id: 1, url: url});
    }
}

module.exports = Logger;
