import axios, { AxiosError } from 'axios'
import { MouseEvent, useEffect, useState } from 'react'
import { MemoryData } from '../../types/Memory'
import { BASEURL } from '../../constants/endpoints'
import useUploadImages from '../../hooks/useUploadImages'
import ImageRequestBody from '../../types/ImageRequestBody'

interface Props {
  memory: MemoryData
  editMemory: (memory: MemoryData) => void
}
const EditMemory = ({ memory, editMemory }: Props) => {
  const [name, setName] = useState<string>('')
  const [description, setDescription] = useState<string>('')
  const [successMessage, setSuccessMessage] = useState<string | null>(null)
  const [errorMessage, setErrorMessage] = useState<string | null>(null)
  const [featuredImage, setFeaturedImage] = useState<string | null>(null)
  const [selectedImage, setSelectedImage] = useState<string | null>(null)
  const { error, uploadedImage, success, uploadImage } = useUploadImages()

  useEffect(() => {
    setName(memory.name)
    setDescription(memory.description)
    setFeaturedImage(memory.image)
  }, [])

  async function handleSubmit(event) {
    event.preventDefault()

    const date = new Date(Date.now())
    const memoryObject: MemoryData = {
      id: memory.id,
      name: name,
      description: description,
      timestamp: date,
      image: featuredImage,
    }

    try {
      const { data } = await axios.put(
        `${BASEURL}/memories/${memory.id}`,
        memory
      )
      setSuccessMessage('Memory Successfully updated')
      setErrorMessage(null)
      editMemory(memoryObject)
    } catch (error) {
      console.log(error.response.data.error)
      setSuccessMessage(null)
    }
  }

  useEffect(() => {
    if (uploadedImage) {
      setFeaturedImage(uploadedImage)
    }
  }, [uploadedImage])

  useEffect(() => {
    setSuccessMessage(success)
  }, [success])

  useEffect(() => {
    setErrorMessage(error)
  }, [success, error])

  async function handleUpload(event: MouseEvent<HTMLDivElement, MouseEvent>) {
    event.preventDefault()

    const img: ImageRequestBody = {
      featuredImage: selectedImage,
    }
    uploadImage(img)
  }
  return (
    <form onSubmit={handleSubmit}>
      <div className='my-2 p-6 bg-white rounded-xl shadow-md max-w-xl mx-auto'>
        <div className='grid grid-cols-3'>
          <div className='col-span-1'>
            <div>
              {featuredImage && (
                <div className=''>
                  <img
                    className='w-28 h-28 rounded-full bg-slate-500 text-xs'
                    src={featuredImage}
                    alt='memory image'
                  />
                </div>
              )}
              <div>
                <input
                  type='file'
                  className='text-xs mb-2'
                  accept='image/*'
                  name='featuredImage'
                  onChange={(e) => setSelectedImage(e.target.files[0])}
                />
                <div
                  onClick={(e) => handleUpload(e)}
                  className='border text-xs hover:cursor-pointer hover:bg-opacity-90 max-w-fit p-2 rounded-lg bg-blue-600 text-white'
                >
                  Upload
                </div>
              </div>
            </div>
          </div>
          <div className='col-span-2'>
            <div>
              <input
                type='text'
                value={name}
                placeholder='Memory Title'
                className='mb-2 border-b bg-opacity-50 p-1 pl-2 bg-gray-50 focus:border-b-2 focus:border-blue-600  focus:outline-none'
                onChange={(e) => setName(e.target.value)}
              />
              <textarea
                value={description}
                rows={3}
                cols={40}
                placeholder='Memory Description here'
                className='text-xs font-light mb-2 border-b bg-opacity-50 p-1 pl-2 bg-gray-50 focus:border-b-2 focus:border-blue-600  focus:outline-none'
                onChange={(e) => setDescription(e.target.value)}
              ></textarea>
            </div>
            <div>
              {successMessage && (
                <p className='text-green-600 text-xs mb-2'>{successMessage}</p>
              )}
            </div>
            <div>
              {errorMessage && (
                <p className='text-red-600 text-xs mb-2'>{errorMessage}</p>
              )}
            </div>
            <div>
              <button
                type='submit'
                className='text-white float-right bg-blue-600 rounded-lg py-1 px-2 text-xs hover:bg-opacity-90'
              >
                Save Memory
              </button>
            </div>
          </div>
        </div>
      </div>
    </form>
  )
}

export default EditMemory
