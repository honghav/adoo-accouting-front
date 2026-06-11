<template>
    <div class="container mx-auto p-4">
        <h1 class="text-2xl font-bold mb-4">User Profile</h1>
        <div class="bg-white p-6 rounded-lg shadow-md">
            <div class="flex items-center border border-gray-300" v-for="user in currentUser">
                <img :src="user?.image" alt="User Avatar"
                    class="w-24 h-24 rounded-full mr-4 border-4 border-gray-300 shadow-md" />
                <div>
                    <h2 class="text-xl font-semibold">{{ user?.name }}</h2>
                    <p class="text-gray-500">{{ user?.email }}</p>
                    <p class="text-gray-500">Role: {{ user?.role }}</p>
                    <p class="text-gray-500">Position: {{ user?.position }}</p>
                    <p class="text-gray-500">Status: {{ user?.status }}</p>
                </div>
            </div>
        </div>
    </div>


</template>

<script setup lang="ts">
import { getUserListService, userListsData } from '~/services/userService';

const authToken = useAuthToken()
const currentUser = computed(() => userListsData.value)
definePageMeta({
    middleware: ['role'],
    roles: ['hr', 'it']
})
onMounted(async () => {
    await getUserListService(authToken.value as string)
    console.log('Current user data:', currentUser.value)
})
</script>