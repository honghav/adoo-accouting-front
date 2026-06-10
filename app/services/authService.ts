import { apiFetch } from "~/composables/apiFetch";
import type { LoginDTO } from "~/model/auth/login.dto";
import type { RegisterDTO } from "~/model/auth/register.dto";
import { useRuntimeConfig } from '#app';
import type { UserDTO } from "~/model/auth/User.dto";

const getCurrentUserRes = ref<UserDTO | null>(null);
export async function authRegisterService(payload: RegisterDTO) {
const config = useRuntimeConfig();

    try {
        const response = await apiFetch('auth/register', 'POST', payload);
        if (response.access_token) {
        const token = useCookie(config.public.tokenKey, {
            maxAge: 60 * 60 * 24 * 7, // 7 days
            secure: process.env.COOKIE_KEY === 'ODOO-FOOD_TOKEN',

        })
        token.value = response.access_token;
        navigateTo('/dashbord/staff');
    }else{
        throw new Error('Registration failed: No access token received');
    }  
    } catch (error) {
        console.error('Error registering user:', error);
        throw error;
    }
}
export async function authLoginService(payload: LoginDTO) {
const config = useRuntimeConfig();

    try {
        const response =  await apiFetch('auth/login', 'POST', payload);
        if (response.access_token) {
        const token = useCookie(config.public.tokenKey, {
            maxAge: 60 * 60 * 24 * 7, // 7 days
                        secure: process.env.COOKIE_KEY === 'ODOO-FOOD_TOKEN',

        })
        token.value = response.access_token;
        navigateTo('/dashbord/staff');
    }else {
        throw new Error('Login failed: No access token received');
    }
    } catch (error) {
        console.error('Error logging in user:', error);
        throw error;
    }
}

export async function getCurrentUserService(token: string) {
    if (!token) {
        return null;
    }
    try {
        const response = await apiFetch('auth/profile', 'GET',null, token);
        return getCurrentUserRes.value =  response;
    } catch (error) {
        console.error('Error fetching user:', error);
        return null;
    }
}
export const authLogoutService = () => {
    const config = useRuntimeConfig();
  const token = useCookie(config.public.tokenKey)
  token.value = null
          navigateTo('/auth/login');

}

export const currentUserData = computed(() => getCurrentUserRes.value);