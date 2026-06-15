<template>
    <div class="face-capture">
        <div class="relative">
            <video ref="videoRef" :class="{ 'video-preview': true, 'hidden': !cameraActive }" autoplay
                playsinline></video>
            <canvas ref="canvasRef" class="hidden"></canvas>

            <div v-if="!cameraActive" class="camera-placeholder">
                <CameraIcon class="h-12 w-12 text-gray-400" />
                <p class="mt-2 text-sm text-gray-500">Click "Start Camera" to begin</p>
            </div>
        </div>

        <div class="mt-4 flex space-x-3">
            <button v-if="!cameraActive" @click="startCamera"
                class="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700">
                <VideoCameraIcon class="h-5 w-5 mr-2" />
                Start Camera
            </button>

            <button v-else @click="captureFace" :disabled="capturing"
                class="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-green-600 hover:bg-green-700">
                <CameraIcon class="h-5 w-5 mr-2" />
                {{ capturing ? 'Capturing...' : 'Capture Face' }}
            </button>

            <button v-if="cameraActive" @click="stopCamera"
                class="inline-flex items-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50">
                Stop Camera
            </button>
        </div>

        <div v-if="capturedImage" class="mt-4">
            <h4 class="text-sm font-medium text-gray-700 mb-2">Captured Image:</h4>
            <img :src="capturedImage" class="h-32 w-32 object-cover rounded-lg" />
        </div>
    </div>
</template>

<script setup lang="ts">

const emit = defineEmits(['face-captured'])

const videoRef = ref<HTMLVideoElement | null>(null)
const canvasRef = ref<HTMLCanvasElement | null>(null)
const cameraActive = ref(false)
const capturing = ref(false)
const capturedImage = ref<string | null>(null)
let stream: MediaStream | null = null

// Load face-api.js (you need to install face-api.js)
// npm install face-api.js

const startCamera = async () => {
    try {
        stream = await navigator.mediaDevices.getUserMedia({ video: true })
        if (videoRef.value) {
            videoRef.value.srcObject = stream
            cameraActive.value = true
        }
    } catch (error) {
        console.error('Error accessing camera:', error)
        alert('Unable to access camera. Please check permissions.')
    }
}

const stopCamera = () => {
    if (stream) {
        stream.getTracks().forEach(track => track.stop())
        stream = null
    }
    cameraActive.value = false
}

const captureFace = async () => {
    if (!videoRef.value || !canvasRef.value) return

    capturing.value = true

    try {
        const video = videoRef.value
        const canvas = canvasRef.value

        // Set canvas dimensions to match video
        canvas.width = video.videoWidth
        canvas.height = video.videoHeight

        // Draw video frame to canvas
        const ctx = canvas.getContext('2d')
        if (ctx) {
            ctx.drawImage(video, 0, 0, canvas.width, canvas.height)

            // Get image data
            const imageData = canvas.toDataURL('image/jpeg')
            capturedImage.value = imageData

            // In a real implementation, you would:
            // 1. Use face-api.js or similar to detect face and get descriptors
            // 2. Generate face descriptor array (128 numbers)

            // Mock face descriptor (in reality, this comes from face recognition library)
            const mockFaceDescriptor = Array.from({ length: 128 }, () => Math.random())

            emit('face-captured', {
                descriptor: mockFaceDescriptor,
                image: imageData
            })
        }
    } catch (error) {
        console.error('Error capturing face:', error)
    } finally {
        capturing.value = false
    }
}

onUnmounted(() => {
    stopCamera()
})
</script>

<style scoped>
.video-preview {
    width: 100%;
    max-width: 500px;
    border-radius: 8px;
    background: #000;
}

.camera-placeholder {
    width: 100%;
    max-width: 500px;
    height: 300px;
    background: #f3f4f6;
    border-radius: 8px;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
}
</style>