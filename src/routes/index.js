import React, { useEffect, useState, createContext, useContext } from 'react';
import BeforeLogin from './auth.routes';

const Routes = (props) => {
  const { linking } = props;


  return (
      <BeforeLogin linking={linking} />
  )
}


export default Routes;