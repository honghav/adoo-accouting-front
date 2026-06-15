<template>
    <div class="max-w-4xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
        <div class="bg-white shadow rounded-lg overflow-hidden">
            <div class="px-4 py-5 sm:px-6">
                <h1 class="text-2xl font-semibold text-gray-900">Face Registration</h1>
                <p class="mt-1 text-sm text-gray-600">
                    Register your face for secure login verification
                </p>
                <p>{{ user?.name }}</p>
            </div>

            <div class="border-t border-gray-200 px-4 py-5 sm:p-6">
                <FaceCapture @face-captured="handleFaceCapture" />

                <div v-if="faceDescriptor" class="mt-6">
                    <div class="bg-gray-50 rounded-lg p-4">
                        <h3 class="text-sm font-medium text-gray-900">Face Registration Details</h3>
                        <div class="mt-2 text-sm text-gray-600">
                            <p>Face descriptor generated successfully!</p>
                            <p class="text-xs text-gray-500 mt-1">Descriptor length: {{ faceDescriptor.length }}</p>
                        </div>

                        <div class="mt-4">
                            <label class="block text-sm font-medium text-gray-700">Face Name/Label</label>
                            <input v-model="faceName" type="text"
                                class="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
                                placeholder="e.g., John's Face" />
                        </div>

                        <button @click="registerFace" :disabled="registering"
                            class="mt-4 w-full inline-flex justify-center items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700">
                            {{ registering ? 'Registering...' : 'Register Face' }}
                        </button>
                    </div>
                </div>

                <!-- Success/Error Messages -->
                <div v-if="message" :class="messageClass" class="mt-4 rounded-md p-4">
                    <div class="flex">
                        <div class="ml-3">
                            <p class="text-sm font-medium">{{ message }}</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { currentUserData } from '~/services/authService'

// definePageMeta({
//     middleware: 'auth'
// })
const authToken = useAuthToken()
const user = computed(() => currentUserData.value)

const faceDescriptor = ref<number[] | null>(null)
const capturedImage = ref<string | null>(null)
const faceName = ref('')
const registering = ref(false)
const message = ref('')
const messageClass = ref('')

const handleFaceCapture = (data: { descriptor: number[], image: string }) => {
    faceDescriptor.value = data.descriptor
    capturedImage.value = data.image
    faceName.value = `${user.value?.name}'s Face`
}
const registerFace = async () => {
    if (!faceDescriptor.value || !faceName.value) return

    registering.value = true
    message.value = ''
    try {
        const body = {
            userId: crypto.randomUUID(),
            name: faceName.value,
            faceDescriptor: faceDescriptor.value,
            faceImageUrl: capturedImage.value
        }
        const response = await apiFetch('face/register', 'POST', body, authToken.value as string)


        // $api('/face/register', {
        //     method: 'POST',
        //     body: {
        //         userId: user.value?.id,
        //         name: faceName.value,
        //         faceDescriptor: faceDescriptor.value,
        //         faceImageUrl: capturedImage.value
        //     }
        // })

        message.value = 'Face registered successfully! Waiting for admin approval.'
        messageClass.value = 'bg-green-50 text-green-800'

        // Reset form
        faceDescriptor.value = null
        faceName.value = ''

    } catch (error: any) {
        message.value = error.response?.data?.message || 'Failed to register face'
        messageClass.value = 'bg-red-50 text-red-800'
    } finally {
        registering.value = false
    }
}
</script>