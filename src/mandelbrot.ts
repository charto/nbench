export class Mandelbrot {
	static run(size: number) {
		let insideCount = 0;

		for(let py = 0; py < size; ++py) {
			for(let px = 0; px < size; ++px) {
				let x = (px - size / 2) / size * 4;
				let y = (py - size / 2) / size * 4;

				let real = 0, real2 = 0;
				let imag = 0, imag2 = 0;
				let iter = 256;

				while(--iter && real2 + imag2 < 4) {
					imag = real * imag * 2 + y;
					real = real2 - imag2 + x;

					real2 = real * real;
					imag2 = imag * imag;
				}

				if(!iter) ++insideCount;
			}
		}

		return(insideCount / (size * size) * 16);
	}
}
