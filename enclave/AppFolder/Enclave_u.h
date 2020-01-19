#ifndef ENCLAVE_U_H__
#define ENCLAVE_U_H__

#include <stdint.h>
#include <wchar.h>
#include <stddef.h>
#include <string.h>
#include "sgx_edger8r.h" /* for sgx_status_t etc. */


#include <stdlib.h> /* for size_t */

#define SGX_CAST(type, item) ((type)(item))

#ifdef __cplusplus
extern "C" {
#endif

#ifndef OCALL_PRINT_STRING_DEFINED__
#define OCALL_PRINT_STRING_DEFINED__
void SGX_UBRIDGE(SGX_NOCONVENTION, ocall_print_string, (const char* str));
#endif
#ifndef OCALL_PRINT_INT_DEFINED__
#define OCALL_PRINT_INT_DEFINED__
void SGX_UBRIDGE(SGX_NOCONVENTION, ocall_print_int, (int value));
#endif
#ifndef OCALL_CURRENTTIME_DEFINED__
#define OCALL_CURRENTTIME_DEFINED__
unsigned int SGX_UBRIDGE(SGX_NOCONVENTION, ocall_currentTime, (void));
#endif

sgx_status_t printf_helloworld(sgx_enclave_id_t eid);
sgx_status_t poet(sgx_enclave_id_t eid, int currentTime);

#ifdef __cplusplus
}
#endif /* __cplusplus */

#endif
