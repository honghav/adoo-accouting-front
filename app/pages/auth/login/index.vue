    <template>
        <div class="max-w-md mx-auto p-6 bg-white rounded shadow">
            <h2 class="text-xl font-semibold mb-4">Login</h2>
            <form @submit.prevent="handleSubmit" class="space-y-4">
                <!-- Email -->
                <UInput v-model="form.email" type="email" placeholder="Email Address" />
                <!-- Password -->
                <UInput v-model="form.password" type="password" placeholder="Password" />
                <!-- Submit -->
                <UButton type="submit" block :loading="loginLoading">Login</UButton>
                <NuxtLink to="/auth/register" class="text-sm text-blue-500 hover:underline">Don't have an account?
                    Register</NuxtLink>
            </form>
        </div>
    </template>

<script setup lang="ts">
import { ref } from 'vue'
import type { LoginDTO } from '~/model/auth/login.dto'
import { authLoginService } from '~/services/authService'


const loginLoading = ref(false)
const form = ref<LoginDTO>({
    email: '',
    password: '',
})


const handleSubmit = async () => {

    try {
        loginLoading.value = true
        const payload: LoginDTO = {
            email: form.value.email,
            password: form.value.password,
        }
        await authLoginService(payload)
        // console.log('Form submitted:', payload)
    } catch (error) {
        loginLoading.value = true
        console.error('Error submitting form:', error)
    } finally {
        loginLoading.value = false
    }

    // You can send form.value to your API here
}
</script>
