<template>
    <div class="p-6">
        <h1 class="text-2xl font-bold mb-4">Revenue Dashboard</h1>
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <!-- <div class="bg-white shadow rounded-lg p-4">
                <div class="flex items-center justify-between">
                    <h2 class="text-lg font-semibold text-gray-700">Total Revenue</h2>
                    <p class="mt-2 text-3xl font-bold text-gray-900">$12,345</p>
                </div>
                <div class="bg-white shadow rounded-lg p-4">
                    <h2 class="text-lg font-semibold text-gray-700">Monthly Revenue</h2>
                    <p class="mt-2 text-3xl font-bold text-gray-900">$1,234</p>
                </div>
                <div class="bg-white shadow rounded-lg p-4">
                    <h2 class="text-lg font-semibold text-gray-700">Yearly Revenue</h2>
                    <p class="mt-2 text-3xl font-bold text-gray-900">$12,345</p>
                </div>

            </div> -->
        </div>
        <UButton @click="open = true">
            Create Revenue
        </UButton>

        <UModal v-model:open="open">
            <template #content>
                <UCard>
                    <template #header>
                        <div class="flex justify-between items-center">
                            <h3 class="font-semibold text-lg">
                                Create Revenue
                            </h3>

                            <UButton color="neutral" variant="ghost" icon="i-lucide-x" @click="open = false" />
                        </div>
                    </template>

                    <UForm :state="form" @submit="submit">
                        <div class="space-y-4">

                            <UFormField label="Customer Name">
                                <UInput v-model="form.customer_name" />
                            </UFormField>

                            <UFormField label="Amount">
                                <UInput v-model="form.amount" type="number" />
                            </UFormField>

                            <!-- <UFormField label="Seller ID">
                                <UInput v-model="form.seller_id" />
                            </UFormField> -->
                            <img v-if="form.image" :src="form.image" class="w-40 h-40 object-cover mt-4" />
                            <!-- Image -->
                            <UInput v-model="form.image" type="file" accept="image/*" @change="onFileChange"
                                placeholder="Profile Image URL" />
                            <UFormField label="Note">
                                <UTextarea v-model="form.note" />
                            </UFormField>
                            <UFormField label="Revenue Type">
                                <USelect v-model="form.type_revenue" :items="typeOptions" value-key="value"
                                    label-key="label" />
                            </UFormField>

                            <div class="flex justify-end gap-2">
                                <UButton color="neutral" variant="outline" @click="open = false">
                                    Cancel
                                </UButton>

                                <UButton type="submit" :loading="loading">
                                    Save
                                </UButton>
                            </div>

                        </div>
                    </UForm>
                </UCard>
            </template>
        </UModal>
        <h4>Revenue List</h4>
        <!-- <p>{{ authToken }}</p> -->
        <div v-for="reven in revenueList" :key="reven.id" class="border rounded-lg p-4 mb-4 shadow-sm">
            <h3 class="font-bold">
                {{ reven.customer_name }}
            </h3>

            <p>
                Amount: ${{ reven.amount }}
            </p>

            <p>
                Type: {{ reven.type_revenue }}
            </p>

            <p>
                Status: {{ reven.status }}
            </p>

            <UBadge :color="reven.approve ? 'success' : 'warning'">
                {{ reven.approve ? 'Approved' : 'Pending' }}
            </UBadge>

            <img v-if="reven.image" :src="getImagePath(reven.image)" class="w-24 h-24 object-cover rounded mt-2">
        </div>
    </div>
</template>
<script setup lang="ts">
import { TypeRevenue } from '~/model/renenue/renenue.dto';
import { currentUserData, getCurrentUserService } from '~/services/authService';
import { createRevenueService, getRevenueService, revenueData } from '~/services/revenueService';
const authToken = useAuthToken()
const revenueList = revenueData
const currentUser = computed(() => currentUserData.value)
const { toBase64, toRawBase64 } = useBase64()

const open = ref(false)

const form = reactive({
    type_revenue: TypeRevenue.SELL,
    image: '',
    // seller: '',
    customer_name: '',
    amount: 0,
    payment_method: 'cash',
    bank_transaction: '',
    note: ''
})

const resetForm = () => {
    Object.assign(form, {
        type_revenue: TypeRevenue.SELL,
        image: '',
        // seller: currentUser.value?.id || '',
        customer_name: '',
        amount: 0,
        payment_method: 'cash',
        bank_transaction: '',
        note: ''
    })
}

const loading = ref(false)
const typeOptions = [
    { label: 'Sell', value: TypeRevenue.SELL },
    { label: 'Loan', value: TypeRevenue.LOAN },
    { label: 'Member Fee', value: TypeRevenue.MAMBER_FEE },
    { label: 'Return', value: TypeRevenue.RETURN },
    { label: 'Other', value: TypeRevenue.OTHER }
]
const submit = async () => {
    try {
        loading.value = true

        // form.seller = String(currentUser.value?.id) || ''

        if (!form.customer_name) {
            return alert('Customer name is required')
        }

        if (!form.amount || form.amount <= 0) {
            return alert('Amount must be greater than 0')
        }

        await createRevenueService(
            authToken.value as string,
            form
        )

        await getRevenueService(
            authToken.value as string
        )

        open.value = false

        resetForm()
    } catch (error) {
        console.error(error)
    } finally {
        loading.value = false
    }
}
const onFileChange = async (event: Event) => {
    const target = event.target as HTMLInputElement

    if (!target.files?.length) return

    const file = target.files[0]
    if (!file) return

    // Full Base64 (with data:image/png;base64,)
    form.image = await toBase64(file)

    // Or raw Base64 only

    console.log("image:", form.image)
}
onMounted(async () => {
    // Fetch revenue data from API and update the dashboard
    await getRevenueService(authToken.value as string)
    await getCurrentUserService(authToken.value as string)

})
</script>