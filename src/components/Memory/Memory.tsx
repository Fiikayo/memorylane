import { PencilSquareIcon, TrashIcon } from '@heroicons/react/24/outline'
import { MemoryData } from '../../types/Memory'

interface Props {
  memory: MemoryData
  deleteMemory: (memory: MemoryData) => void
  editMemory: (memory: MemoryData) => void
}

const Memory = ({ memory, deleteMemory, editMemory }: Props) => {
  const { id, name, image, description, timestamp } = memory
  const dateString = new Date(timestamp).toDateString()

  async function handleDelete() {
    deleteMemory(memory)
  }

  async function handleEdit() {
    editMemory(memory)
  }

  return (
    <div className='memory my-2 p-6 bg-white rounded-xl shadow-md max-w-xl mx-auto'>
      <div className='grid grid-cols-3'>
        <div className='col-span-1'>
          <img
            className='w-28 h-28 rounded-full bg-slate-500 text-xs'
            src={image}
            alt='memory image'
          />
        </div>
        <div className='col-span-2'>
          <div>
            <h2 className='text-3xl mb-2 '>{name}</h2>
            <h3 className='text-l mb-2'>{dateString}</h3>
            <p className='text-sm'>{description}</p>
          </div>
          <div className='float-right'>
            <PencilSquareIcon
              onClick={handleEdit}
              className='h-5 w-5 inline-block hover:cursor-pointer text-gray-400 hover:text-gray-800'
            />
            <TrashIcon
              onClick={handleDelete}
              className='h-5 w-5 inline-block hover:cursor-pointer text-gray-400 hover:text-gray-800'
            />
          </div>
        </div>
      </div>
    </div>
  )
}

export default Memory
