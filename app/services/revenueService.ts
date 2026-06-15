import type { RevenueDTO } from "~/model/renenue/renenue.dto"

export const revenueRes = ref<RevenueDTO[]>([])

export async function getRevenueService(token: string) {
    try{
        const response = await apiFetch('accounting/revenues', 'GET' ,undefined, token)
        revenueRes.value = response
        return revenueRes.value
    }catch(error){
        console.error('Error fetching revenue data:', error)
    }
}
export async function createRevenueService(token: string, payload: any) {
    try{
        const response = await apiFetch('accounting/revenue/create', 'POST', payload, token)
        revenueRes.value = response
        return revenueRes.value
    }catch(error){
        console.error('Error creating revenue:', error)
    }
}

export const revenueData = computed(() => revenueRes.value)
