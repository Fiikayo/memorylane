import { AxiosError } from 'axios'
import { MemoryData } from '../../types/Memory'
import Memory from '../Memory/Memory'

interface Prop {
  memories: MemoryData[] | null
  loading: boolean | null
  error: AxiosError | null
  deleteMemory: (memory: MemoryData) => void
  showEditMemory: (memory: MemoryData) => void
}
const Memories = ({
  memories,
  loading,
  error,
  deleteMemory,
  showEditMemory,
}: Prop) => {
  if (loading) {
    return <div>Loading...</div>
  }

  if (error) {
    return <div>Error:{error.message}</div>
  }

  function renderMemories() {
    if (memories.length === 0) {
      return <p>No memories currently.</p>
    }
    return memories
      .sort((x, y) => new Date(y.timestamp) - new Date(x.timestamp))
      .map((memory) => (
        <Memory
          key={memory.id}
          memory={memory}
          deleteMemory={deleteMemory}
          editMemory={showEditMemory}
        />
      ))
  }

  return <div>{renderMemories()}</div>
}

export default Memories
