class Fibonacci {
public:
	static unsigned int run(unsigned int n) {
		return(n < 2 ? n : run(n - 1) + run(n - 2));
	}
};

#include "nbind/nbind.h"

NBIND_CLASS(Fibonacci) {
	method(run);
}
