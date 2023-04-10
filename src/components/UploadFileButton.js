import React from 'react'
import { database, storage } from '../firebase'
import { useAuth } from '../context/AuthContext'
import { ROOT_FOLDER } from '../hooks/useFolder'

export default function UploadFileButton({currFolder}) {

  const {currUser}=useAuth()

  function handleUpload(e){
     const file=e.target.files[0]

     if(currFolder==null || file==null) return

     const filePath = 
        currFolder===ROOT_FOLDER
            ? `${currFolder.path.map((x) => x.name).join("/")}/${file.name}`
            : `${currFolder.path.map((x) => x.name).join("/")}/${currFolder.name}/${file.name}`

    // console.log(filePath)
    const uploadTask=storage
        .ref(`/files/${currUser.uid}/${filePath}`)
        .put(file)          
    
    uploadTask.on("state_changed",snapshot=>{

    },()=>{

    },()=>{
        uploadTask.snapshot.ref.getDownloadURL().then(url=>{
            database.files.add({
                url: url,
                name: file.name,
                createdAt: database.currTimeStamp(),
                folder: currFolder.id,
                userId: currUser.uid
            })
        })
    })    


  }
    
  return (
    <label className='btn btn-outline-success m-0 mr-2'>
        upload file 
        <input type='file' onChange={handleUpload} style={{opacity: 0,position: 'absolute', left: '-9999px'}}/>
    </label>
  )
}
