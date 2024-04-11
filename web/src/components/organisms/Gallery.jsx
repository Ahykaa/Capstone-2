import Image from 'next/image'
import React from 'react'

const Gallery = ({ images }) => {
  if (!images) {
    return null
  }

  return (
    <>
      {images.map((imageUrl, index) => (
        <div
          key={index}
          className='rounded-lg overflow-hidden border border-gray-300 max-w-[150px]'
        >
          <Image
            src={imageUrl}
            alt={`Image ${index + 1}`}
            width={120}
            height={120}
          />
        </div>
      ))}
    </>
  )
}

export default Gallery
