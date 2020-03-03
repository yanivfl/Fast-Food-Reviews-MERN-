import React from 'react';
import './Marker.scss';

export default function Marker(props){
    const { color, name, key,icon } = props;
    return (
      // <div className="marker"
      //   style={{ backgroundColor: color, cursor: 'pointer'}}
      //   title={name}
      //   image= {<image className="avatar" src={icon} style={{  width: "30px", height: "30px"}}/>}
      // /> 
      <div>
        <div className="pin bounce"
             style={{ backgroundColor: color, cursor: 'pointer' }}
             title={name}/>
        <div className="pulse"/>
    </div>  
    );
  };