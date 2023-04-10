import { useEffect, useReducer } from "react"
import { database } from "../firebase"
import { useAuth } from "../context/AuthContext"


const ACTIONS={
    FOLDER_SELECT: 'select-folder',
    FOLDER_UPDATE: 'update-folder',
    CHILD_FOLDER_SET: 'set-child-folder',
    CHILD_FILE_SET: 'set-child-file',
}

export const ROOT_FOLDER={
    name: 'Root',
    id: null,
    path: []
}

function reducer(state,{type,payload}){
   switch (type){
      case ACTIONS.FOLDER_SELECT:
        return {
            folderId: payload.folderId,
            folder: payload.folder,
            childFolders: [],
            childFiles: []
        }
      case ACTIONS.FOLDER_UPDATE:
        return {
            ...state,
            folder: payload.folder
        }
      case ACTIONS.CHILD_FOLDER_SET:
        return {
           ...state,
           childFolders: payload.childFolders
        }
      case ACTIONS.CHILD_FILE_SET:
        return {
            ...state,
            childFiles: payload.childFiles
        }            
      default:
        return state  
   }
}

export function useFolder(folderId=null,folder=null){
    const [state,dispatch]=useReducer(reducer,{
       folderId,
       folder,
       childFolders: [],
       childFiles: []
    })
    
    const {currUser}=useAuth()

    useEffect(()=>{
       dispatch({type : ACTIONS.FOLDER_SELECT ,payload: {folderId,folder}})
    },[folderId,folder])

    useEffect(()=>{
        if(folderId==null){
           return dispatch({type: ACTIONS.FOLDER_UPDATE, payload: {folder: ROOT_FOLDER}})
        }

        database.folders.doc(folderId).get().then((doc)=>{
            return dispatch({type: ACTIONS.FOLDER_UPDATE, payload: {folder: database.formatDoc(doc)}})
        }).catch(()=>{
            dispatch({type: ACTIONS.FOLDER_UPDATE, payload: {folder: ROOT_FOLDER}})
        })

    },[folderId])

    useEffect(()=>{
        return database.folders
        .where("parentId","==",folderId)
        .where("userId","==",currUser.uid)
        .orderBy("createdAt")
        .onSnapshot(snapshot=>{
            dispatch({
                type: ACTIONS.CHILD_FOLDER_SET,
                payload: {
                    childFolders: snapshot.docs.map(database.formatDoc)
                }
            })
        })
    },[folderId])
    
    useEffect(()=>{
        return database.files
        .where("folder","==",folderId)
        .where("userId","==",currUser.uid)
        .orderBy("createdAt")
        .onSnapshot(snapshot=>{
            dispatch({
                type: ACTIONS.CHILD_FILE_SET,
                payload: {
                    childFiles: snapshot.docs.map(database.formatDoc)
                }
            })
        })
    },[folderId])

    return state
}