import React from 'react'
import { Breadcrumb } from 'react-bootstrap'
import { ROOT_FOLDER } from '../hooks/useFolder'
import { Link } from 'react-router-dom'

export default function FolderBreadCrumb({currFolder}) {

  let path=currFolder===ROOT_FOLDER? [] : [ROOT_FOLDER]
  if(currFolder){
    path=[...path,...currFolder.path]
  }

  return (
    <Breadcrumb
    className='flex-grow-1'
    listprops={{className: "bg-white m-0 pl-0"}}>

    {path.map((folder,index)=>(
        <Breadcrumb.Item className='text-truncate d-inline-block'
        key={index}
        linkAs={Link}
        linkProps={{
            to: {
                pathname: folder.id? `/folder/${folder.id}`: '/',
                // state: {folder: {...folder,path: path.slice(1,index)}}
            }
        }}
        style={{maxWidth:"100px"}}
        >
        {folder.name}
        </Breadcrumb.Item>
    ))}

    {currFolder && 
        <Breadcrumb.Item className='text-truncate d-inline-block'
        style={{maxWidth:"100px"}}
        active>
            {currFolder.name}
        </Breadcrumb.Item>
    }
    </Breadcrumb>
  )
}
