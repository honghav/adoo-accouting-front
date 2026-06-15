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

                            <UFormField label="Seller ID">
                                <UInput v-model="form.seller_id" />
                            </UFormField>

                            <UFormField label="Note">
                                <UTextarea v-model="form.note" />
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
        <div class="border border-gray-300 p-4 w-fit" v-for="reven in revenueList">
            <h3>{{ reven.customer_name }}</h3>
            <p>{{ reven.amount }}</p>
            <p>{{ reven.approve }}</p>
            <p>{{ reven.status }}</p>
        </div>
    </div>
</template>
<script setup lang="ts">
import { createRevenueService, getRevenueService, revenueData } from '~/services/revenueService';
const authToken = useAuthToken()
const revenueList = revenueData

const open = ref(false)

const form = reactive({
    type_revenue: 'sell',
    seller_id: '',
    customer_name: '',
    amount: 0,
    payment_method: 'cash',
    bank_transaction: '',
    note: ''
})

const loading = ref(false)

const submit = async () => {
    try {
        loading.value = true

        await createRevenueService(authToken.value as string, form)


    } finally {
        loading.value = false
    }
}
onMounted(async () => {
    // Fetch revenue data from API and update the dashboard
    await getRevenueService(authToken.value as string)
})
</script>