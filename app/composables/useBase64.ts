export const useBase64 = () => {
  const toBase64 = (file: File): Promise<string> => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader()

      reader.onload = () => {
        resolve(reader.result as string)
      }

      reader.onerror = (error) => {
        reject(error)
      }

      reader.readAsDataURL(file)
    })
  }

  const toRawBase64 = async (file: File): Promise<string> => {
    const base64 = await toBase64(file)
    return base64.split(',')[1] ?? ''
  }

  return {
    toBase64,
    toRawBase64
  }
}