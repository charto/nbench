import * as path from 'path';
import * as nbind from 'nbind';
import * as js from './js';

var asmjs = nbind.init(path.resolve(__dirname, '../build/asmjs'));
var native = nbind.init(path.resolve(__dirname, '../build/native'));

interface Platform {
	name: string;
	lib: any;
}

interface Test {
	name: string;
	key: string;
	arg: number;
}

var platformList: Platform[] = [
	{
		name: 'JavaScript',
		lib: js
	}, {
		name: 'asm.js',
		lib: asmjs
	}, {
		name: 'Native addon',
		lib: native
	}
];

var testList: Test[] = [
	{
		name: 'Simple function calls: Recursive 35th Fibonacci number',
		key: 'Fibonacci',
		arg: 35
	}, {
		name: 'Loops and arithmetics: Mandelbrot set area sampled from 1024^2 pixels',
		key: 'Mandelbrot',
		arg: 1024
	}, {
		name: 'Memory allocation',
		key: 'Alloc',
		arg: 14
	},
];

function bench(func: any, arg: any) {
	var sampleCount = 32;
	var sampleList: number[] = [];

	for(var sampleNum = 0; sampleNum < sampleCount; ++sampleNum) {
		var startTime = new Date().getTime();
		var result = func(arg);
		var duration = new Date().getTime() - startTime;

		sampleList.push(duration);
	}

	var totalDuration = 0;

	sampleList.sort();

	// Throw away the 25% best and worst times keeping 50% of all samples.

	for(var sampleNum = sampleCount / 4; sampleNum < sampleCount * 3 / 4; ++sampleNum) {
		totalDuration += sampleList[sampleNum];
	}

	return(Math.round(totalDuration / (sampleCount / 2)));
}

testList.forEach((test: Test) => {
	console.log(test.name);
	platformList.forEach((platform: Platform) => {
		var duration = bench(platform.lib[test.key].run, test.arg);

		console.log('\t' + platform.name);
		console.log('\t\t' + Math.round(100000 / duration) / 100 + ' Hz');
	});
});
