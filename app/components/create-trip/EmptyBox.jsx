import { Globe2, Plane ,Landmark} from 'lucide-react'
import React from 'react'

const suggestions = [
    {
        title:'Create New Trip',
        icon: <Globe2 className='text-blue-400 h-5 w-5'/>,
    },
    {
        title:'Inspire me where to go',
        icon: <Plane className='text-green-500 h-5 w-5'/>
    },
    {
        title:'Discover Hidden Gems',
        icon: <Landmark className='text-orange-500 h-5 w-5'/>
    },
    {
        title:'Inspire me where to go',
        icon: <Globe2 className='text-yellow-600 h-5 w-5'/>
    }
]

const EmptyBox = () => {
  return (
    <div className='mt-7'>
      <h2 className='font-bold text-center text-3xl'>Start Planning new <strong className='text-primary'>trip</strong></h2>
      <p className='text-center text-gray-400 mt-2'>Discover personalized travel itineraries, find the best destinations, and plan your dream vacation effortlessly with the power of AI.</p>

    <div className='flex flex-col gap-5'>
        {suggestions.map((item, index) => (
            <div key={index} className='flex items-center gap-2 border rounded-xl p-3 cursor-pointer hover:border-primary hover:text-primary'>
                {item.icon}
                <h2 className='text-lg'>{item.title}</h2>
            </div>
        ))}
    </div>
    </div>
  )
}

export default EmptyBox
