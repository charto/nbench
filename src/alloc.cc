#include <vector>

class Alloc {
public:
	static void *fill(unsigned int n, std::vector<void *> *ptr) {
		if(!ptr) {
			total += n;

			ptr = new std::vector<void *>();
			ptr->reserve(n);
			for(unsigned int i = 0; i < n; ++i) ptr->push_back(0);
		} else n = ptr->size();

		if(n > 1) {
			for(unsigned int i = 0; i < n; ++i) {
				ptr->at(i) = fill(n * 3 / 4, reinterpret_cast<std::vector<void *> *>(ptr->at(i)));
			}
		}

		return(ptr);
	}

	static void clear(unsigned int skip, std::vector<void *> *ptr) {
		unsigned int n = ptr->size();

		for(unsigned int i = 0; i < n; ++i) {
			auto *item = reinterpret_cast<std::vector<void *> *>(ptr->at(i));
			if(item == nullptr) continue;

			if(i % skip == 0) {
				clear(1, item);

				total -= item->size();
				delete item;

				ptr->at(i) = nullptr;
			} else {
				clear(skip, item);
			}
		}
	}

	static unsigned int run(unsigned int n) {
		auto *ptr = reinterpret_cast<std::vector<void *> *>(fill(n, nullptr));

		for(unsigned int i = 0; i < 8; ++i) {
			clear(i + 1, ptr);
			fill(0, ptr);
		}

		clear(1, ptr);

		total -= ptr->size();
		delete ptr;

		return(total);
	}

	static unsigned int total;
};

unsigned int Alloc::total = 0;

#include "nbind/nbind.h"

NBIND_CLASS(Alloc) {
	method(run);
}
