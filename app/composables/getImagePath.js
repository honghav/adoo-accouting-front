import { appConst } from "~/constants/app"

export default function getImagePath(image, path = "") {
  const config = useRuntimeConfig()
  // const roleModuleStore = useRoleModuleStore()

  if (!image || image === "") {
    return appConst.defaultImage
  }

  // Base64 image
  if (image.includes("base64")) {
    return image
  }

  // Determine module folder
  // let module = path || roleModuleStore.current_module

  return `${config.public.baseUrl}/images/${path}/${image}`
}
