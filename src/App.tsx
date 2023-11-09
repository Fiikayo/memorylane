import { CubeIcon } from '@heroicons/react/20/solid'
import './App.css'
import Memories from './components/Memories/Memories'
import AddMemory from './components/AddMemory/AddMemory'
import { useState } from 'react'

function App() {
  const [isAddSectionVisible, setAddSectionVisible] = useState(false)

  function handleNewMemoryButtonClick() {
    setAddSectionVisible(true)
  }
  return (
    <div>
      <div className='mx-auto max-w-7xl sm:px-6 lg:px-8 mt-32'>
        <div className='overflow-hidden rounded-lg bg-white shadow '>
          <div className='px-4 py-5 sm:p-6'>
            <div className='flex items-center'>
              <CubeIcon className='h-16 w-16 inline-block' />
              <h1 className='text-4xl font-semibold text-gray-900 mb-4 ml-4 mt-4'>
                Memory lane
              </h1>
            </div>
            <div>
              {/** main section div */}
              <div>{isAddSectionVisible && <AddMemory />}</div>
            </div>
            <div>
              <div className='flex flex-row justify-between'>
                <div>sort</div>
                <div>
                  <div
                    onClick={handleNewMemoryButtonClick}
                    className='border-solid border rounded-md border-black px-3 py-1 text-sm hover:shadow-md cursor-pointer'
                  >
                    + New Memory
                  </div>
                </div>
              </div>
              <Memories />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default App
