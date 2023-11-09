import { useState } from 'react'

const AddMemory = () => {
  const [title, setTitle] = useState<string>('')
  const [description, setDescription] = useState<string>('')
  function handleSubmit(event) {
    event.preventDefault()
    const obj = { title: title, description: description }
    console.log(obj)
  }

  return (
    <form onSubmit={handleSubmit}>
      <div className='my-2 p-6 bg-white rounded-xl shadow-md max-w-xl mx-auto'>
        <div className='grid grid-cols-3'>
          <div className='col-span-1'>
            <div className='w-20 h-20 rounded-full '>
              <input type='file' className='text-xs' accept='image/*' />
            </div>
          </div>
          <div className='col-span-2'>
            <div>
              <input
                type='text'
                value={title}
                placeholder='Memory Title'
                className='mb-2 border-b bg-opacity-50 p-1 pl-2 bg-gray-50 focus:border-b-2 focus:border-blue-600  focus:outline-none'
                onChange={(e) => setTitle(e.target.value)}
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

export default AddMemory
