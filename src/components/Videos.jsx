import React from 'react'
import VidoeTr from './VidoeTr'

const Videos = ({videos}) => {
  return (
     <tbody>
            {!videos && 'Loading Videos'}
            {videos && videos.map(video => (
                  <VidoeTr key={video.id} video={video} />
            ))}
            </tbody>
  )
}

export default Videos