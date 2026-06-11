import type { UserDTO } from "~/model/auth/User.dto";

const userListRes = ref<UserDTO[]>([]);
export const getUserListService = async (token: string) => {
    try {
        const response = await apiFetch('users', 'GET', null, token);
        userListRes.value = response;
        return response;
    }catch (error) {
        console.error('Error fetching user list:', error);
        throw error;
    }
}

export const userListsData = computed(() => userListRes.value)