import React from 'react'
import { Outlet } from 'react-router-dom';
import BSTvisual from './ExperimentComponents/BSTvisual';
import BinarySearch from './ExperimentComponents/binarySearch';


const Experiment = () => {
  return (
    <div>
      <div className="w-[100%] h-[100%] ">
    
                  {/* <Outlet /> */}
                  {/* <BSTvisual /> */}
                  <BinarySearch/>
        
      </div>
    </div>
  );
}

export default Experiment