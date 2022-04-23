import React from 'react';
import { MainPages, FirstTimePages } from './auth.routes';

const Routes = (props) => {
  console.log(props)
  if(props.isOpen){
    return <MainPages />
  }else{
    return <FirstTimePages />
  }
}

export default Routes;