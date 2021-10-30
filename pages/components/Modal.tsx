import { useState, useRef } from 'react'
import Image from 'next/image'
import { useForm, SubmitHandler } from 'react-hook-form'
import * as yup from 'yup'
import { yupResolver } from '@hookform/resolvers/yup'

import store from '../store/rootstore'
import { Observer, observer } from 'mobx-react-lite'

interface ModalProps {
  closeModal: any
}

const Modal: React.FC<ModalProps> = ({ closeModal }: ModalProps) => {
  const [fileCaptured, setFileCaptured] = useState(false)
  const [imageToUpload, setImageToUpload] = useState(null)
  const [imagePreview, setImagePreview] = useState(null)

  const [videoToUpload, setVideoToUpload] = useState(null)

  const imageInput = useRef(null)
  const videoInput = useRef(null)

  //capture the image and previews
  const captureImage = (event) => {
    event.preventDefault()
    console.log(event.target.files)
    setImageToUpload(event.target.files[0])
    setImagePreview(URL.createObjectURL(event.target.files[0]))
    setFileCaptured(true)
  }

  //coming soon
  //capture video and previews
  const captureVideo = (event) => {
    event.preventDefault()
    console.log(event.target.files)
    setVideoToUpload(event.target.files[0])
    setFileCaptured(true)
  }

  //Closes the modal
  const exitModal = (e) => {
    closeModal(false)

    //this part stops the click from propagating
    if (!e) var e = window.event
    e.cancelBubble = true
    if (e.stopPropagation) e.stopPropagation()
  }

  //react-hook-form and validation via Yup.

  type Inputs = {
    Title: string
    Description: string
  }

  var schema = yup.object().shape({
    Title: yup.string().required().max(100, `Max length - 100 characters.`),
    Description: yup.string().max(500, `Max length - 500 characters.`),
  })

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<Inputs>({
    resolver: yupResolver(schema),
  })

  //This is where we get the form data and
  //we process it for ipfs and bitverse.
  const onSubmit: SubmitHandler<Inputs> = (data) => {
    console.log(data)
    //
    // upload to ipfs
    // then to bitverse!
    //
  }

  function UploadingInterface() {
    if (fileCaptured) {
      if (imageToUpload) {
        return (
          <Observer>
            {() => (
              <div
                id="imagePreviewContainer"
                className="flex flex-col w-full h-full items-center overflow-y-auto"
              >
                <div id="cancel_bt" className="w-full relative">
                  <button
                    className="absolute z-10 top-0 right-0 mt-1 mr-2 p-2 rounded-lg text-white bg-red-500 hover:bg-red-700"
                    onClick={exitModal}
                  >
                    Cancel
                  </button>
                </div>
                {/* preview image and get title and description */}
                {/* <p> Image Captured! </p>
            <p>{imagePreview} </p> */}
                <div
                  id="imageBackground"
                  className="mt-8 flex items-center justify-center w-5/6 h-96 min-h-96 bg-gray-100 rounded-md overflow-hidden relative"
                >
                  <Image
                    className="object-contain"
                    src={imagePreview}
                    unoptimized={true}
                    layout="fill"
                  />
                </div>

                <div id="inputForm" className="mt-4 w-7/12 max-w-lg">
                  <form
                    onSubmit={handleSubmit(onSubmit)}
                    className="flex flex-col"
                  >
                    <label className="select-none">Title:</label>
                    <input
                      {...register('Title')}
                      className="px-1 border shadow-inner rounded-sm focus:outline-none focus:ring-2 focus:border-transparent hover:border-blue-400"
                    />
                    <p className="text-red-500"> {errors.Title?.message} </p>

                    <label className="mt-4 select-none">Description:</label>
                    <textarea
                      {...register('Description')}
                      rows={4}
                      className="px-1 rounded-sm border shadow-inner focus:outline-none focus:ring-2 focus:border-transparent hover:border-blue-400"
                    />
                    <p className="text-red-500">
                      {errors.Description?.message}{' '}
                    </p>

                    <label className="mt-4 select-none">
                      Author's address:
                    </label>
                    <p className="text-blue-500">
                      {store.address ? (
                        store.address
                      ) : (
                        <div className="text-yellow-600">
                          Make sure Metamask is properly linked.
                        </div>
                      )}
                    </p>

                    <input
                      type="submit"
                      className="bg-black text-white rounded-md py-2 mb-8 mt-8 w-4/6 place-self-center"
                    />
                  </form>
                </div>
              </div>
            )}
          </Observer>
        )
      } else if (videoToUpload) {
        return <div>Video Captured!</div>
      }
    } else {
      return (
        <div
          id="contentInputContainer"
          className="flex flex-row w-full h-full items-center select-none"
        >
          {/* use 'multiple' to select multiple files */}
          <input
            id="imageInput"
            className="hidden"
            type="file"
            ref={imageInput}
            onChange={captureImage}
          />
          <div
            id="imageInputDiv"
            className="flex flex-col w-1/2 h-full items-center justify-center cursor-pointer text-white bg-black hover:bg-gray-900"
            onClick={() => imageInput.current.click()}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
              />
            </svg>
            <p>Choose Image</p>
          </div>
          <input
            id="videoInput"
            className="hidden"
            type="file"
            ref={videoInput}
            onChange={captureVideo}
          />
          <div
            id="videoInputDiv"
            className="relative flex flex-col w-1/2 h-full items-center justify-center cursor-pointer hover:bg-gray-200 bg-white"
            // onClick={() => videoInput.current.click()}
            onClick={() => alert('This feature is coming soon 🤞')}
          >
            <button
              className="absolute top-0 right-0 mt-1 mr-2 p-2 rounded-lg text-white 00 bg-red-500 hover:bg-red-700"
              onClick={exitModal}
            >
              Cancel
            </button>

            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z"
              />
            </svg>
            <p>Choose Video</p>
          </div>
        </div>
      )
    }
  }

  return (
    <div
      id="modalBackground"
      className="w-screen h-screen flex items-center justify-center backdrop-filter backdrop-blur-sm fixed"
    >
      <div
        id="modal"
        className="w-4/6 h-3/4 z-20 flex flex-col overflow-hidden items-center justify-center bg-white rounded-lg"
      >
        <UploadingInterface />
      </div>

      {/* TODO:
      - preview file
      - Enter title
      - Enter Description
      - Author address
      - Upload to IPFS
      - Add to Bitverse
      - Upload successful
      ~
      - Show up in My Uploads
      -Show up in Homescreen etc
      */}
    </div>
  )

  function uploadToIpfs() {}
  function addToBitverse() {}
}

export default Modal
