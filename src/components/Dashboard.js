import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';
import CreateFolderButton from './CreateFolderButton';
import { useFolder } from '../hooks/useFolder';
import Folder from './Folder';
import File from './File';
import { Link, useLocation, useParams} from 'react-router-dom';
import FolderBreadCrumb from './FolderBreadCrumb';
import UploadFileButton from './UploadFileButton';

export default function Dashboard() {
  
  const {folderId} =useParams()
  const {state}=useLocation()
  const {folder,childFolders,childFiles}=useFolder(folderId)
  // console.log(childFolders)

  return (
    <>
      <Navbar bg="light" variant="light">
        <Container>
          <Navbar.Brand href="/">
            My Drive
          </Navbar.Brand>
          <Navbar.Toggle />
        <Navbar.Collapse className="justify-content-end">
          <Navbar.Text>
           <Link to='/profile'>
           Profile
           </Link>
            {/* <a href="/profile">Profile</a> */}
          </Navbar.Text>
        </Navbar.Collapse>
        </Container>
      </Navbar>
      <Container fluid>
      <div className='d-flex align-items-center'>
        <FolderBreadCrumb currFolder={folder}/>
        <UploadFileButton currFolder={folder}/>
        <CreateFolderButton currFolder={folder}/>
      </div>
        {childFolders.length>0 && (
          <div className='d-flex flex-wrap'>
            {childFolders.map((childfolder,index)=>(
              <div 
              key={index}
              style={{maxWidth: "150px"}}
              className="p-2">
                <Folder folder={childfolder}></Folder>
              </div>
            ))}
          </div>
        )}
        {childFolders.length>0 && childFiles.length>0 && <hr/>}
        {childFiles.length>0 && (
          <div className='d-flex flex-wrap'>
            {childFiles.map((childfile,index)=>(
              <div 
              key={index}
              style={{maxWidth: "150px"}}
              className="p-2">
                <File file={childfile}></File>
              </div>
            ))}
          </div>
        )}
      </Container>
    </>
  );
}
