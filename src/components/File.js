import React from 'react'

export default function File({file}) {
  return (
    <a href={file.url} target="_blank" className='btn btn-outline-primary text-truncate w-100'>
      {file.name}
    </a>
  )
}
