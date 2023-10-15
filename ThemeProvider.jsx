import React, {createContext, useState} from 'react';
import tempData from './tempData'

export const ThemeContext = createContext();

export const ThemeProvider = ({children}) => {

  const [lists, setLists] = useState(tempData)

  return (
    <ThemeContext.Provider
      value={{        
        lists,
        setLists,      
      }}>

      {children}

    </ThemeContext.Provider>
  );
};
