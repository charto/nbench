class Mandelbrot {
public:
	static double run(unsigned int size) {
		unsigned int insideCount = 0;

		for(unsigned int py = 0; py < size; ++py) {
			for(unsigned int px = 0; px < size; ++px) {
				double x = (static_cast<double>(px) - size / 2) / size * 4;
				double y = (static_cast<double>(py) - size / 2) / size * 4;

				double real = 0, real2 = 0;
				double imag = 0, imag2 = 0;
				unsigned int iter = 256;

				while(--iter && real2 + imag2 < 4) {
					imag = real * imag * 2 + y;
					real = real2 - imag2 + x;

					real2 = real * real;
					imag2 = imag * imag;
				}

				if(!iter) ++insideCount;
			}
		}

		return(static_cast<double>(insideCount) / (size * size) * 16);
	}
};

#include "nbind/nbind.h"

NBIND_CLASS(Mandelbrot) {
    method(run);
}
