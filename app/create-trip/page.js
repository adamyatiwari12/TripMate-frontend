import React from 'react'
import Chatbox from '../components/create-trip/Chatbox';

const createTrip = () => {
  return (
    <div className= "grid grid-cols-1 md:grid-cols-2 gap-5 p-10">
      <div>
        <Chatbox />
      </div>
      <div>
        Map and Trip
      </div>
    </div>
  )
}

export default createTrip
