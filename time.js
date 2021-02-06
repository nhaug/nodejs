const doSomething = () => console.log("test");

const measureTime = () => {
	console.time("Start");
	doSomething();
	console.timeEnd("Start");
} 

measureTime();
