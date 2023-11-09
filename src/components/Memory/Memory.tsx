type Props = {
  title: string
  image: string
  description: string
  timestamp: string
}

const Memory = ({ title, image, description, timestamp }: Props) => {
  return (
    <div className='memory my-2 p-6 bg-white rounded-xl shadow-md max-w-xl mx-auto'>
      <div className='grid grid-cols-3'>
        <div className='col-span-1'>
          <img className='w-20 h-20 rounded-full' src='' alt='memory image' />
        </div>
        <div className='col-span-2'>
          <div>
            <h2 className='text-3xl mb-2 '>{title}</h2>
            <h3 className='text-xl mb-2'>{timestamp}</h3>
            <p>{description}</p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Memory
