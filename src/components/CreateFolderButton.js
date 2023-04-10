import React, { useState } from 'react'
import { Button, Form, Modal } from 'react-bootstrap'
import { database } from '../firebase'
import { useAuth } from '../context/AuthContext'
import { ROOT_FOLDER } from '../hooks/useFolder'

export default function CreateFolderButton({currFolder}) {

  const [modal,setModal]=useState(false)
  const [name,setName]=useState("")
  const {currUser} =useAuth()

  function openModal(){
     setModal(true)
     setName('')
  }

  function closeModal(){
    setModal(false)
  }

  

  function handleAdd(e){
     e.preventDefault()
     
     if(currFolder==null) return

     const path=[...currFolder.path]
     if(currFolder!=ROOT_FOLDER){
        path.push({name: currFolder.name,id : currFolder.id})
     }


     database.folders.add({
        name: name,
        parentId: currFolder.id,
        userId: currUser.uid,
        path: path,
        createdAt: database.currTimeStamp()
     })
     setName('')
     closeModal()
  }

  return (
    <div>
      <Button onClick={openModal} variant='outline-success'>create folder</Button>
      <Modal show={modal}>
        <Form onSubmit={handleAdd}>
            <Modal.Body>
                <Form.Group>
                    <Form.Label>Folder Name</Form.Label>
                    <Form.Control
                        type='text'
                        required
                        value={name}
                        onChange={(e)=> setName(e.target.value)}
                    />
                </Form.Group>
                <Modal.Footer>
                    <Button onClick={closeModal}>close</Button>
                    <Button type='submit'>add</Button>
                </Modal.Footer>
            </Modal.Body>
        </Form>
      </Modal>
    </div>
  )
}
