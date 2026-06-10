import Swal from "sweetalert2";
import { ref } from "vue";

export const loadingSwal = ref(false);


export default function swalModal(
    title: string = "Are you sure?",
    message: string = "You won't be able to revert this!",
    icon: "error" | "warning" | "success" | "info" | "question" = "success",
): Promise<boolean> {
 
  const { $i18n } = useNuxtApp();
     return Swal.fire({
        html: `
      <div class="w-full ">
        <div class="w-full h-56 rounded-full  flex items-center justify-center  text-8xl ">
         <img
            src="/images/gif/Success.gif"
            alt="loading"
            class="w-56 object-cover">
        </div>
      
        <div class="text-center px-8 pb-8 pt-4">
          <h2 class="text-xl font-bold text-black mb-2">
            ${title}
          </h2>

          <p class="text-gray-500 text-lg mb-6">
            ${typeof message === "string" ? message : JSON.stringify(message)}
          </p>
        </div>
      </div>

    `,
        // icon: icon,
        showCancelButton: true,
        cancelButtonText: $i18n.t('close'),
    confirmButtonText: $i18n.t('order'),
        buttonsStyling: false,
        customClass: {
            confirmButton:
                "bg-primary hover:bg-secondary/20 text-white px-6 py-2 rounded-full mx-2 order-2  ",
            cancelButton:
                "bg-gray-400 hover:bg-gray-500 text-white px-6 py-2 rounded-full mx-2 order-1 ",
        },
    }).then(async res => {
      loadingSwal.value = true;
      const isConfirmed = res.isConfirmed === true;
      // perform actions when confirmed
      if (isConfirmed) {
        // console.error("An error occurred:", message);
        // await delay(6000); // Simulate a delay for the error handling
        navigateTo('/profile?tab=order');
      }
      return isConfirmed;
    }).finally(() => {
        loadingSwal.value = false;
    });
}
