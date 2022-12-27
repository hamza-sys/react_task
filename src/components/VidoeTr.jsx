import React from 'react'
import { useDrag } from 'react-dnd'

const VidoeTr = ({ video }) => {
   const [{ isDragging }, drag] = useDrag(
    () => ({
      type: 'tr',
      collect: (monitor) => ({
        isDragging: monitor.isDragging(),
      }),
    }),
  )
  return (
    
      isDragging ? (
      <tr ref={drag} />
      ) : (
           <tr className='cursor-pointer border' ref={drag}>
                    <td style={{width: '300px', maxWidth: '300px'}} className='flex items-center'>
                      <img className='w-32 h-9'  src={video.photo} alt='' />
                      <p>{video.title}</p>
                    </td>
                    <td style={{ color: '#9BFF00' }} className="text-center font-thin">{video.username}</td>
                    <td className="text-center">{video.like}</td>
    </tr>
    )
   
  )
}

export default VidoeTr