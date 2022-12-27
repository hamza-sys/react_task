import React from 'react'

const VidoeTr = ({video}) => {
  return (
    <tr className="border">
                    <td style={{width: '300px', maxWidth: '300px'}} className='flex items-center'>
                      <img className='w-32 h-9'  src={video.photo} alt='' />
                      <p>{video.title}</p>
                    </td>
                    <td style={{ color: '#9BFF00' }} className="text-center font-thin">{video.username}</td>
                    <td className="text-center">{video.like}</td>
                </tr>
  )
}

export default VidoeTr