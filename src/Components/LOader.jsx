import React from 'react';
import {
  BeatLoader,

} from 'react-spinners';

const Loader = () => {
  return (
    <div className='loader' style={{
      textAlign: "center",
      backgroundColor: "white",
      display: "flex",
      justifyContent: "center",
      width: "100%",
      height: "50vh"
    }}>
      <div style={{ margin: 'auto 0' }}>

        <BeatLoader color="teal" size={30} />
      </div>
    </div>
  );
};

export default Loader;
