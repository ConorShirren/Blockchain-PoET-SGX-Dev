/*
 * Copyright (C) 2011-2018 Intel Corporation. All rights reserved.
 *
 * Redistribution and use in source and binary forms, with or without
 * modification, are permitted provided that the following conditions
 * are met:
 *
 *   * Redistributions of source code must retain the above copyright
 *     notice, this list of conditions and the following disclaimer.
 *   * Redistributions in binary form must reproduce the above copyright
 *     notice, this list of conditions and the following disclaimer in
 *     the documentation and/or other materials provided with the
 *     distribution.
 *   * Neither the name of Intel Corporation nor the names of its
 *     contributors may be used to endorse or promote products derived
 *     from this software without specific prior written permission.
 *
 * THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS
 * "AS IS" AND ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT
 * LIMITED TO, THE IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS FOR
 * A PARTICULAR PURPOSE ARE DISCLAIMED. IN NO EVENT SHALL THE COPYRIGHT
 * OWNER OR CONTRIBUTORS BE LIABLE FOR ANY DIRECT, INDIRECT, INCIDENTAL,
 * SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT
 * LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES; LOSS OF USE,
 * DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON ANY
 * THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT
 * (INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE
 * OF THIS SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
 *
 */


#include <stdarg.h>
#include <stdio.h>      /* vsnprintf */
//#include <unistd.h>	/* sleep*/
#include "Enclave.h"
#include "Enclave_t.h"  /* print_string */
#include <sgx_trts.h>
/* 
 * printf: 
 *   Invokes OCALL to display the enclave buffer to the terminal.
 */
void printf(const char *fmt, ...)
{
    char buf[BUFSIZ] = {'\0'};
    va_list ap;
    va_start(ap, fmt);
    vsnprintf(buf, BUFSIZ, fmt, ap);
    va_end(ap);
    ocall_print_string(buf);
}

void printff(int value)
{
    ocall_print_int(value);
}


void  poet(int currentTime) {
//	printf("***\n Entered PoET\n***\n");
	unsigned int startTime = currentTime;
//	printf("Start Time: ");
//	printff(startTime);
//	printf("\n");

	unsigned int val;
	
	// Trying myRand() here
	
	static int next = currentTime;
	next = ((next * next) / 100 ) % 10000;
	int min = 1;
	int max = 10;
	int w = abs(next % (max+1-min) + min) ;

	// End of myRand()

//	printf("Random number Using myRandInRange(1,10): ");
//	printff(w);
//	printf("\n");
	unsigned int z = 3; // Random Wait time for testing

//	printf("->	Recieved Current Time\n");
//	printf("->	Generating Wait Timer\n");
//	printf("->	Beginning Timer\n");

        while((val-startTime)!=w) {

		ocall_currentTime(&val);
		//printf("-> waiting");
	};
//	printf("****\n Success -> Time Elapsed \n****\n");
	printf("poet");	
}

void printf_helloworld()
{
   printf("Hello World From Inside A Secure Enclave\n");    

}

