import * as faceapi from 'face-api.js'

export const useFace = () => {
  const loadModels = async () => {
    const MODEL_URL = '/models'

    await Promise.all([
      faceapi.nets.tinyFaceDetector.loadFromUri(
        MODEL_URL
      ),
      faceapi.nets.faceLandmark68Net.loadFromUri(
        MODEL_URL
      ),
      faceapi.nets.faceRecognitionNet.loadFromUri(
        MODEL_URL
      ),
    ])
  }

  const getDescriptor = async (
    video: HTMLVideoElement
  ) => {
    const detection =
      await faceapi
        .detectSingleFace(
          video,
          new faceapi.TinyFaceDetectorOptions()
        )
        .withFaceLandmarks()
        .withFaceDescriptor()

    if (!detection)
      throw new Error(
        'Face not detected'
      )

    return Array.from(
      detection.descriptor
    )
  }

  return {
    loadModels,
    getDescriptor,
  }
}