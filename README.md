# Blockchain-PoET-SGX-Dev
This Project devloped an energy efficient alternative to Bitcoin's Proof Of Work.

The machine running this code must have CPU support for Intel Software Guard Extensions, as well as having SGX enabled in BIOS.

This project uses Javascript (Node.JS) for it's blockchain implementation, while also using C++ to develop an SGX application which provides the blockchain consensus algorithm with a pseudo random wait timer.

This code was developed inline with my Master's Thesis from DCU in Electronic and Computer Engineering.

[See Written Paper Here](/poet-consensus-sgx.pdf)

Some other consensus algorithms and tests that were developed during the project have not been added to this repository.

For installation guide, see https://github.com/intel/linux-sgx