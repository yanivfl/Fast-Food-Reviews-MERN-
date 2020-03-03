import React from 'react'
import Chip from '@material-ui/core/Chip';
import { useDropzone } from "react-dropzone";
// const centralDivStyle = {
//    minHeight: 100,
//    backgroundColor: '#fbff8a',
//    borderWidth: 2,
//    borderStyle: 'solid',
//    borderColor: '#450d85',
//    textAlign: 'center'
// };


export const renderDropzoneField = (props) =>{
   const {
       input: { onChange },
       disabled
   } = props;

   const { getRootProps, getInputProps } = useDropzone({
       onDrop: files => onChange(files)
   });

   const files = props.input.value;

   if(disabled){
       return null
   }

   return (
       <div>
           <br />
           <div {...getRootProps()} className="review-restaurant-input review-upload-container center" >
               <input {...getInputProps()}/>
               Upload files here!

           </div>
           <br/>
           <div>
               {Object.keys(files).map((key, index) => (
                   <Chip
                       key={index}
                       variant="outlined"
                       color="primary"
                       size="small"
                       label={files[key].name}
                   />
               ))
               }
           </div>
       </div>
   );
};