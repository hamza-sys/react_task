import React from 'react'
import VidoeTr from './VidoeTr'
import { useDrop } from 'react-dnd'


const Videos = ({ videos }) => {
    const [{ isOver, draggingColor, canDrop }, drop] = useDrop(
    () => ({
      accept: 'tr',
      drop(_item, monitor) {
        return _item
      },
      collect: (monitor) => ({
        isOver: monitor.isOver(),
      }),
    })
  )

  return (
     <tbody ref={drop}>
            {!videos && 'Loading Videos'}
            {videos && videos.map(video => (
                  <VidoeTr key={video.id} video={video} />
            ))}
      </tbody>
  )
}

export default Videos