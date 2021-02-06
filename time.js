const doSomething = () => console.log("test");

const measureTime = () => {
	// ein Kommentar
	console.time("Start");
	doSomething();
	console.timeEnd("Start");
} 

measureTime();
