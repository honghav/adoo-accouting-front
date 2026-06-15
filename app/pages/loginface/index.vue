<template>
    <div class="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
        <div class="max-w-md w-full space-y-8">
            <div>
                <h2 class="mt-6 text-center text-3xl font-extrabold text-gray-900">
                    Face Login
                </h2>
                <p class="mt-2 text-center text-sm text-gray-600">
                    Or
                    <NuxtLink to="/login" class="font-medium text-indigo-600 hover:text-indigo-500">
                        use email and password
                    </NuxtLink>
                </p>
            </div>

            <div class="bg-white shadow rounded-lg p-6">
                <FaceCapture @face-captured="handleFaceVerification" />

                <div v-if="verifying" class="mt-4 text-center">
                    <div class="inline-flex items-center">
                        <svg class="animate-spin h-5 w-5 text-indigo-600" xmlns="http://www.w3.org/2000/svg" fill="none"
                            viewBox="0 0 24 24">
                            <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4">
                            </circle>
                            <path class="opacity-75" fill="currentColor"
                                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z">
                            </path>
                        </svg>
                        <span class="ml-2 text-sm text-gray-600">Verifying face...</span>
                    </div>
                </div>

                <div v-if="verificationResult" :class="verificationResult.verified ? 'bg-green-50' : 'bg-red-50'"
                    class="mt-4 rounded-md p-4">
                    <div class="flex">
                        <div class="ml-3">
                            <h3 class="text-sm font-medium"
                                :class="verificationResult.verified ? 'text-green-800' : 'text-red-800'">
                                {{ verificationResult.verified ? 'Verification Successful!' : 'Verification Failed' }}
                            </h3>
                            <div class="mt-2 text-sm"
                                :class="verificationResult.verified ? 'text-green-700' : 'text-red-700'">
                                <p>{{ verificationResult.message }}</p>
                                <p v-if="verificationResult.confidence" class="text-xs mt-1">
                                    Confidence: {{ Math.round(verificationResult.confidence * 100) }}%
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
const { $api } = useNuxtApp()
// remove unused useAuth import to fix "Cannot find name 'useAuth'" error

const verifying = ref(false)
const verificationResult = ref<any>(null)

const handleFaceVerification = async (data: { descriptor: number[], image: string }) => {
    verifying.value = true
    verificationResult.value = null

    // try {
    //     const response = await $api('/face/login', {
    //         method: 'POST',
    //         body: {
    //             faceDescriptor: data.descriptor,
    //             threshold: 0.6
    //         }
    //     })

    //     verificationResult.value = {
    //         verified: true,
    //         message: `Welcome back, ${response.user.name}!`,
    //         confidence: response.confidence
    //     }

    //     // Store auth token
    //     const token = useCookie('auth_token')
    //     token.value = response.access_token

    //     // Redirect to dashboard
    //     setTimeout(() => {
    //         navigateTo('/dashboard')
    //     }, 2000)

    // } catch (error: any) {
    //     verificationResult.value = {
    //         verified: false,
    //         message: error.response?.data?.message || 'Face verification failed. Please try again.',
    //         confidence: error.response?.data?.confidence
    //     }
    // } finally {
    //     verifying.value = false
    // }
}
</script>