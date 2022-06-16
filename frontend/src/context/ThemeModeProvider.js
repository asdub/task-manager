import React, { useEffect, useMemo, useState} from 'react'
import PropTypes from "prop-types";
import { ThemeProvider, createTheme } from '@mui/material/styles';
import { grey } from '@mui/material/colors';

export const ThemeModeContext = React.createContext({
    toggleThemeMode: () => {}
});

const getDesignTokens = (mode) => {
    return {
        palette: {
            mode,
            ...(mode === 'light'
              ? {
                  // palette values light mode
                  primary: {
                      main: '#136f63',
                  },
                  secondary: {
                    main: '#ffba08',
                  },
                  divider: '#3f88c5',
                  text: {
                    primary: grey[900],
                    secondary: grey[800],
                  },
                }
              : {
                  // palette values dark mode
                  primary: {
                      main: '#ffba08',
                  },
                  divider: grey[700],
                  background: {
                    default: grey[800],
                    paper: '#040f16',
                  },
                  text: {
                    primary: '#fff',
                    secondary: grey[300],
                  },
                }),
          },
    }
}

export default function ThemeModeProvider({ children }) {
    const [mode, setMode] = useState("light");

    useEffect(() => {
        const savedMode = localStorage.getItem('themeMode') || 'light';
        setMode(savedMode);
    }, [setMode]);

    useEffect(() => {
        localStorage.setItem("themeMode", mode);
    }, [mode]);

    const themeMode = useMemo(() => {
        return {
            toggleThemeMode: () => {
                setMode((prevMode) => {
                    if (prevMode === "light") {
                        return "dark"
                    }
                    return "light";
                })
            }
        }
    }, [setMode]);

    const theme = useMemo(() => {
        return createTheme(getDesignTokens(mode))
    }, [mode])

  return (
    <ThemeModeContext.Provider value={themeMode}>
        <ThemeProvider theme={theme}>
            {children}
        </ThemeProvider>
    </ThemeModeContext.Provider>
  )
}

ThemeModeProvider.propTypes = {
    children: PropTypes.node
}