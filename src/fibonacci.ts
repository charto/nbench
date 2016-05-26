let run: typeof Fibonacci.run;

export class Fibonacci {
	static run(n: number): number {
		return(n < 2 ? n : run(n - 1) + run(n - 2));
	}
}

run = Fibonacci.run;
