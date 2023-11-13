import { CubeIcon } from '@heroicons/react/20/solid'
import './App.css'
import Memories from './components/Memories/Memories'
import AddMemory from './components/AddMemory/AddMemory'
import { useState } from 'react'
import useFetchMemories from './hooks/useFetchMemories'
import { MemoryData } from './types/Memory'
import axios from 'axios'
import EditMemory from './components/EditMemory/EditMemory'
import { BASEURL } from './constants/endpoints'

function App() {
  const [isAddSectionVisible, setAddSectionVisible] = useState<boolean>(false)
  const [isEditSectionVisible, setEditSectionVisible] = useState<boolean>(false)
  const [currentMemoryToEdit, setCurrentMemoryToEdit] =
    useState<MemoryData | null>(null)
  const { memoryList, loading, error, setMemoryList } = useFetchMemories()

  function handleNewMemoryButtonClick() {
    setAddSectionVisible(true)
  }

  async function addToMemories(memory: MemoryData) {
    setMemoryList([...memoryList, memory])
    setAddSectionVisible(false)
  }

  async function deleteMemory(memory: MemoryData) {
    try {
      await axios.delete(`${BASEURL}/memories/${memory.id}`)
      if (memoryList) {
        setMemoryList(
          memoryList.filter((current: MemoryData) => current.id !== memory.id)
        )
      }
    } catch (error) {
      console.log(error)
    }
  }

  async function editMemory(memory: MemoryData) {
    setMemoryList((prevState) =>
      prevState?.map((current) =>
        current.id === memory.id ? { ...memory } : current
      )
    )
    setEditSectionVisible(false)
  }

  function showEditMemory(memory: MemoryData) {
    setCurrentMemoryToEdit(memory)
    setEditSectionVisible(true)
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
              <div>
                {isAddSectionVisible && (
                  <AddMemory addToMemories={addToMemories} />
                )}
              </div>
              <div>
                {isEditSectionVisible && (
                  <EditMemory
                    memory={currentMemoryToEdit}
                    editMemory={editMemory}
                  />
                )}
              </div>
            </div>
            <div>
              <div className='flex flex-row justify-end'>
                <div>
                  <div
                    onClick={handleNewMemoryButtonClick}
                    className='border-solid border rounded-md border-black px-3 py-1 text-sm hover:shadow-md cursor-pointer'
                  >
                    + New Memory
                  </div>
                </div>
              </div>
              <Memories
                memories={memoryList}
                loading={loading}
                error={error}
                deleteMemory={deleteMemory}
                showEditMemory={showEditMemory}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default App
