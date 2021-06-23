/* eslint-disable no-unused-vars */
/* eslint-disable no-whitespace-before-property */
import React from "react"
import Navbar from "./Navbar"

import  { Component } from 'react';

import {  registerPlugin} from "react-filepond";

import "filepond-plugin-image-preview/dist/filepond-plugin-image-preview.css";
import "filepond/dist/filepond.min.css";
import FileTable from './filetable'
import Logs from './logs'
import FileShare from './fileshare';
import firestore from '../../firebase'

import Login from '../authentication/Login'
import { Provider,Consumer } from './context';
// Register the plugins
class Dashboard extends Component {

  constructor(props) {
    super(props);
    this.storageRef = firestore.storage().ref();
    this.databaseRef = firestore.database().ref();
    this . state  = {
      files : [], // is used to store file upload information
      uploadValue :  0 , // Used to view the process. Upload
      filesMetadata : [], // Used to receive metadata from Firebase.
      rows :   [], // draw the DataTable
      messag:''
  }
}

  storageRef = firestore.storage().ref();

  handleProcessing(fieldName, file, metadata, load, error, progress, abort) {
    // handle file upload here
    console.log(" handle file upload here");
    console.log(this.storageRef.child(file.name).fullPath);

    const fileUpload = file;
    
    const task = this.storageRef.child(file.name).put(fileUpload)

    task.on(`state_changed` , (snapshort) => {
        console.log(snapshort.bytesTransferred, snapshort.totalBytes)
        let percentage = (snapshort.bytesTransferred / snapshort.totalBytes) * 100;
        //Process
        this.setState({
            uploadValue:percentage
        })
    } , (error) => {
        //Error
        this.setState({
            messag:`Upload error : ${error.message}`
        })
    } , () => {
        //Success
        this.setState({
            messag:`Upload Success`,
            picture: task.snapshot.downloadURL //เผื่อนำไปใช้ต่อในการแสดงรูปที่ Upload ไป
        })

        //Get metadata
        this.storageRef.child(file.name).getMetadata().then((metadata) => {
          // Metadata now contains the metadata for 'filepond/${file.name}'
          let downloadURL = ''
          this.storageRef.child(file.name).getDownloadURL().then( url =>{
            console.log(url)
            let metadataFile = { 
              name: metadata.name, 
              size: metadata.size, 
              contentType: metadata.contentType, 
              fullPath: metadata.fullPath,
              downloadURL:url
                       
          }

          //Process save metadata
  
          this.databaseRef.push({  metadataFile });
          })
         alert("Uploaded Successfully")

      }).catch(function(error) {
        console.log(error)
      });
    })
}
  handleInit() {
    console.log("FilePond instance has initialised", this.pond);
  }

  render() {
    return (
      <Provider>
          <Consumer>
            {
              value=>{

                const {user,myFiles,logs} =value
                return(
                user ? <div className="App container">


                      <Navbar
                      name={user.displayName}
                      img={user.photoURL}
                      />
                   
                     <FileShare 
                      uid={user.uid}
               
                     />
                       
                        <main>
                          <section>
                            <FileTable
                            uid={user.uid}
                            myFiles={myFiles}
                            />
                          </section>
                          <aside>
                            <Logs
                            myLogs={logs}
                            />
                          </aside>
                        </main>

                      </div> : <Login />
                )
              }
            }
          </Consumer>
      </Provider>
    );
  }
}

export default Dashboard;