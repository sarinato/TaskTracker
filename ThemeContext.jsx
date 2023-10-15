import React, {createContext, useState} from 'react';

export const ThemeContext = createContext();

export const ThemeProvider = ({children}) => {

  const [language, setLanguage] = useState(0)

  return (
    <AuthContext.Provider
      value={{        
        language,
        setLanguage,      
      }}>
        
      {children}

    </AuthContext.Provider>
  );
};
