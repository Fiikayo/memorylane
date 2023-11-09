import useFetchMemories from '../../hooks/useFetchMemories'
import Memory from '../Memory/Memory'

const Memories = () => {
  const { data, loading, error } = useFetchMemories()

  //   if (loading) {
  //     return <div>Loading...</div>
  //   }

  //   if (error) {
  //     return <div>Error:{error.message}</div>
  //   }

  const memories = [
    { id: 1, name: 'Hello World', description: 'something here' },
    { id: 2, name: 'Hello World #2', description: 'something here' },
  ]

  function renderMemories() {
    return memories.map((memory) => (
      <Memory
        key={memory.id}
        title={memory.name}
        description={memory.description}
        image='#'
        timestamp='#'
      />
    ))
  }

  return <div>{renderMemories()}</div>
}

export default Memories
