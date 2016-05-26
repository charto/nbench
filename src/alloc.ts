let total = 0;
var fill: typeof Alloc.fill;
var clear: typeof Alloc.clear;

export class Alloc {
	static fill(n: number, ptr: any[]) {
		if(!ptr) {
			total += n;
			ptr = new Array(n);
			for(let i = 0; i < n; ++i) ptr[i] = null;
		} else n = ptr.length;

		if(n > 1) {
			for(let i = 0; i < n; ++i) {
				ptr[i] = fill(~~(n * 3 / 4), ptr[i]);
			}
		}

		return(ptr);
	}

	static clear(skip: number, ptr: any[]) {
		let n = ptr.length;

		for(let i = 0; i < n; ++i) {
			let item = ptr[i];
			if(item == null) continue;

			if(i % skip == 0) {
				clear(1, item);

				total -= item.length;

				ptr[i] = null;
			} else {
				clear(skip, item);
			}
		}
	}

	static run(n: number): number {
		let ptr = fill(n, null);

		for(let i = 0; i < 8; ++i) {
			clear(i + 1, ptr);
			fill(0, ptr);
		}

		clear(1, ptr);

		total -= ptr.length;

		return(total);
	}
}

fill = Alloc.fill;
clear = Alloc.clear;
