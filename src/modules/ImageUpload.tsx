import { useDisclosure } from '@nextui-org/react'
import { useEffect, useState } from 'react'
import { Modal, ModalContent } from '@nextui-org/react'
export const ImageUpload: React.FC = () => {
  const [images, setImages] = useState<string[]>([])
  const [imagesActive, setImageActive] = useState<string>(images[0])
  const [uploadProgress, setUploadProgress] = useState<number>(0)
  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault()
    const files = e.dataTransfer.files
    if (files.length > 0) {
      handleImageChange(files)
    }
  }
  useEffect(() => {
    if (uploadProgress === 100) {
      setTimeout(() => {
        setUploadProgress(0)
      }, 800)
    }
  }, [uploadProgress])
  const handleImageChange = (files: FileList | null) => {
    if (!files) return

    const newImages: string[] = []

    for (let i = 0; i < files.length; i++) {
      const file = files[i]
      const reader = new FileReader()
      reader.onprogress = (e: ProgressEvent<FileReader>) => {
        if (e.lengthComputable) {
          const progress = (e.loaded / e.total) * 100
          setUploadProgress(progress)
        }
      }
      reader.onload = () => {
        if (reader.readyState === 2) {
          newImages.push(reader.result as string)
          if (newImages.length === files.length) {
            setImages(newImages)
          }
        }
      }
      reader.readAsDataURL(file)
    }
  }
  const { isOpen, onOpen, onOpenChange } = useDisclosure()
  return (
    <>
      <div
        onDrop={handleDrop}
        onDragOver={(e) => e.preventDefault()}
        className='flex items-center justify-center w-full'
      >
        <label
          htmlFor='dropzone-file'
          className='flex flex-col items-center justify-center w-full h-32 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 dark:hover:bg-bray-800 dark:bg-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500 dark:hover:bg-gray-600'
        >
          <div className='flex flex-col items-center justify-center pt-5 pb-6'>
            <svg
              className='w-8 h-8 mb-4 text-gray-500 dark:text-gray-400'
              aria-hidden='true'
              xmlns='http://www.w3.org/2000/svg'
              fill='none'
              viewBox='0 0 20 16'
            >
              <path
                stroke='currentColor'
                strokeLinecap='round'
                strokeLinejoin='round'
                strokeWidth={2}
                d='M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2'
              />
            </svg>
            <p className='mb-2 text-sm text-gray-500 dark:text-gray-400'>
              <span className='font-semibold'>Nhấn vào</span> hoặc thả ảnh vào đây.
            </p>
            <p className='text-xs text-gray-500 dark:text-gray-400'>SVG, PNG, JPG hoặc GIF (MAX. 800x400px)</p>
          </div>
          <input
            multiple
            accept='image/*'
            onChange={(e) => handleImageChange(e.target.files)}
            id='dropzone-file'
            type='file'
            className='hidden'
          />
        </label>
      </div>

      <div>
        <div className='mt-2 flex gap-4 flex-wrap'>
          {images.map((image, index) => (
            <div
              key={index}
              onClick={() => {
                onOpen()
                setImageActive(image)
              }}
              className='cursor-pointer hover:shadow-md transition-all border w-20 h-20 border-gray-300 rounded-md overflow-hidden'
            >
              <img src={image} alt={`Preview ${index}`} className='w-full h-full object-cover' />
            </div>
          ))}
        </div>
        <div
          className={`${uploadProgress > 0 ? 'opacity-100 visible ' : 'opacity-0 invisible'
            }  w-full h-2 rounded-lg overflow-hidden bg-slate-100 relative mt-2`}
        >
          <div
            className={`bg-green-500 absolute ${uploadProgress > 0 ? 'transition-width ' : ''}  top-0 left-0 h-full`}
            style={{ width: `${uploadProgress}%` }}
          ></div>
        </div>
      </div>
      <Modal size='3xl' isOpen={isOpen} backdrop='blur' onOpenChange={onOpenChange}>
        <ModalContent>
          {() => (
            <div className='grid gap-2 p-2'>
              <div className='h-[400px] w-full'>
                <img className='h-full object-cover w-full rounded-lg' src={imagesActive || images[0]} />
              </div>
              <div className='grid grid-cols-4 md:grid-cols-6 gap-2 flex-wrap'>
                {images
                  .filter((item) => item !== imagesActive || item !== '')
                  .map((item, index) => (
                    <div
                      onClick={() => setImageActive(item)}
                      className='w-[100px] h-[100px] border rounded-lg hover:shadow-lg transition-all cursor-pointer'
                      key={index}
                    >
                      <img className='h-full object-cover w-full rounded-lg' src={item} />
                    </div>
                  ))}
              </div>
            </div>
          )}
        </ModalContent>
      </Modal>
    </>
  )
}
