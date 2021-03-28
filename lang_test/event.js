// da es eine Klasse ist, wird diese groß geschrieben.
// Die klasse stellt uns Methoden zur Verfügung um mit Instanzen der Klasse zu arbeiten.
const Logger = require('./logger');
const logger = new Logger();

logger.on('messageLogged', (arg) => {
    console.log(arg);
})

logger.log('Message');