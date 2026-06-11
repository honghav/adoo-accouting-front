<template>
    <div class="flex items-center justify-center min-h-screen bg-pink-50">
        <div class="max-w-md w-full bg-white rounded-xl shadow-lg p-6 text-center">

            <!-- User Avatar -->
            <img :src="currentUser?.image" alt="User Avatar"
                class="w-24 h-24 rounded-full mx-auto border-4 border-pink-300 shadow-md" />

            <!-- Greeting -->
            <h1 class="text-2xl font-bold text-pink-600 mt-4">
                🎀 Welcome, {{ currentUser?.name }}! 🎀
            </h1>
            <p class="text-gray-500">{{ currentUser?.email }}</p>

            <!-- Role & Position -->
            <div class="mt-4 space-y-2">
                <p class="bg-pink-100 text-pink-700 rounded-lg py-2">
                    Role: <strong>{{ currentUser?.role }}</strong>
                </p>
                <p class="bg-purple-100 text-purple-700 rounded-lg py-2">
                    Position: <strong>{{ currentUser?.position }}</strong>
                </p>
                <p class="bg-green-100 text-green-700 rounded-lg py-2">
                    Status: <strong>{{ currentUser?.status }}</strong>
                </p>
            </div>
            <!-- Upload image  -->
            <!-- <input type="file" accept="image/*" @change="onFileChange" />

            <img v-if="image" :src="image" class="w-40 h-40 object-cover mt-4" /> -->
            <!-- Created & Updated -->
            <!-- <div class="mt-6 text-sm text-gray-400">
                <p>Created at: {{ formatDate(currentUser?.createdAt) }}</p>
                <p>Last updated: {{ formatDate(currentUser?.updatedAt) }}</p>
            </div> -->
            <!-- 
            <UButton @click="uploadImage" variant="outline" color="primary" size="md" class="mt-6">
                Upload Image
            </UButton> -->
        </div>
    </div>
</template>

<script setup lang="ts">
import type { UserDTO } from '~/model/auth/User.dto';
import { currentUserData, getCurrentUserService } from '~/services/authService';

const authToken = useAuthToken()
const currentUser = computed(() => currentUserData.value)
const { toBase64, toRawBase64 } = useBase64()

const image = ref('')

const onFileChange = async (event: Event) => {
    const target = event.target as HTMLInputElement

    if (!target.files?.length) return

    const file = target.files[0]
    if (!file) return

    // Full Base64 (with data:image/png;base64,)
    image.value = await toBase64(file)

    // Or raw Base64 only
    // image.value = await toRawBase64(file)

    console.log("image:", image.value)
}

function uploadImage() {
    alert('Uploading image...')
    console.log('Uploading image:', image.value)
}
watch(
    authToken,
    async (newToken) => {
        await getCurrentUserService(newToken as string)
    },
    { immediate: true }
)
onMounted(async () => {
})
</script>