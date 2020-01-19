#include "Enclave_u.h"
#include <errno.h>

typedef struct ms_poet_t {
	int ms_currentTime;
} ms_poet_t;

typedef struct ms_ocall_print_string_t {
	const char* ms_str;
} ms_ocall_print_string_t;

typedef struct ms_ocall_print_int_t {
	int ms_value;
} ms_ocall_print_int_t;

typedef struct ms_ocall_currentTime_t {
	unsigned int ms_retval;
} ms_ocall_currentTime_t;

static sgx_status_t SGX_CDECL Enclave_ocall_print_string(void* pms)
{
	ms_ocall_print_string_t* ms = SGX_CAST(ms_ocall_print_string_t*, pms);
	ocall_print_string(ms->ms_str);

	return SGX_SUCCESS;
}

static sgx_status_t SGX_CDECL Enclave_ocall_print_int(void* pms)
{
	ms_ocall_print_int_t* ms = SGX_CAST(ms_ocall_print_int_t*, pms);
	ocall_print_int(ms->ms_value);

	return SGX_SUCCESS;
}

static sgx_status_t SGX_CDECL Enclave_ocall_currentTime(void* pms)
{
	ms_ocall_currentTime_t* ms = SGX_CAST(ms_ocall_currentTime_t*, pms);
	ms->ms_retval = ocall_currentTime();

	return SGX_SUCCESS;
}

static const struct {
	size_t nr_ocall;
	void * table[3];
} ocall_table_Enclave = {
	3,
	{
		(void*)Enclave_ocall_print_string,
		(void*)Enclave_ocall_print_int,
		(void*)Enclave_ocall_currentTime,
	}
};
sgx_status_t printf_helloworld(sgx_enclave_id_t eid)
{
	sgx_status_t status;
	status = sgx_ecall(eid, 0, &ocall_table_Enclave, NULL);
	return status;
}

sgx_status_t poet(sgx_enclave_id_t eid, int currentTime)
{
	sgx_status_t status;
	ms_poet_t ms;
	ms.ms_currentTime = currentTime;
	status = sgx_ecall(eid, 1, &ocall_table_Enclave, &ms);
	return status;
}

