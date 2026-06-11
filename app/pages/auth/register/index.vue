    <template>
        <div class="max-w-md mx-auto p-6 bg-white rounded shadow">
            <h2 class="text-xl font-semibold mb-4">Register</h2>
            <form @submit.prevent="handleSubmit" class="space-y-4">
                <img v-if="form.image" :src="form.image" class="w-40 h-40 object-cover mt-4" />
                <!-- Image -->
                <UInput v-model="form.image" type="file" accept="image/*" @change="onFileChange"
                    placeholder="Profile Image URL" />
                <!-- Name -->
                <UInput v-model="form.name" placeholder="Full Name" />

                <!-- Email -->
                <UInput v-model="form.email" type="email" placeholder="Email Address" />

                <!-- Password -->
                <UInput v-model="form.password" type="password" placeholder="Password" />


                <!-- Role -->
                <!-- <USelect v-model="form.role" :options="roleOptions" placeholder="Select Role" /> -->

                <!-- Position -->
                <!-- <USelect v-model="form.position" :options="positionOptions" placeholder="Select Position" /> -->
                <br>
                <USelect v-model="form.role" :items="roleOptions" placeholder="Select role" />

                <USelect v-model="form.position" :items="positionOptions" placeholder="Select position" />
                <!-- Submit -->
                <UButton type="submit" block :loading="registerLoading">Register</UButton>
                <NuxtLink to="/auth/login" class="text-sm text-blue-500 hover:underline text-center">Already have an
                    account? Login
                </NuxtLink>
            </form>
        </div>
    </template>

<script setup lang="ts">
import { ref } from 'vue'
import { UserRole, UserPosition } from '~/model/auth/authEmun'
import type { RegisterDTO } from '~/model/auth/register.dto'
import { authRegisterService } from '~/services/authService'

const { toBase64, toRawBase64 } = useBase64()

const registerLoading = ref(false)
const form = ref<RegisterDTO>({
    name: '',
    email: '',
    password: '',
    image: '',
    role: UserRole.ACCOUNTING,
    position: UserPosition.INTERN,
})

const roleOptions = Object.values(UserRole).map(role => ({
    label: role.charAt(0).toUpperCase() + role.slice(1),
    value: role
}))
const onFileChange = async (event: Event) => {
    const target = event.target as HTMLInputElement

    if (!target.files?.length) return

    const file = target.files[0]
    if (!file) return

    // Full Base64 (with data:image/png;base64,)
    form.value.image = await toBase64(file)

    // Or raw Base64 only
    // form.value.image = await toRawBase64(file)

    console.log("image:", form.value.image)
}


const positionOptions = Object.values(UserPosition).map(position => ({
    label: position
        .split('_')
        .map(word => word.charAt(0).toUpperCase() + word.slice(1))
        .join(' '),
    value: position
}))
const handleSubmit = async () => {
    try {
        registerLoading.value = true
        const payload: RegisterDTO = {
            name: form.value.name,
            email: form.value.email,
            password: form.value.password,
            image: form.value.image,
            role: form.value.role,
            position: form.value.position
        }
        await authRegisterService(payload)
        // console.log('Form submitted:', payload)
    } catch (message) {
        registerLoading.value = false
        console.error('Error submitting form:', message)
        alert(`Registration failed: ${message}`)
    } finally {
        registerLoading.value = false
    }
}
</script>
