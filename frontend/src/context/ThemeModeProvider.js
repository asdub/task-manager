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
                    main: '#004137',
                  },
                  secondary: {
                    main: '#355550',
                  },
                  accent: {
                    main: '#f15025',
                  },
                  white: {
                    main: '#FAF9F6',
                  },
                  divider: grey[300],
                  background: {
                    default: '#efefef',
                    paper: '#f7f7f7',
                  },
                  text: {
                    primary: grey[900],
                    secondary: grey[600],
                  },
                }
              : {
                  // palette values dark mode
                  primary: {
                      main: '#3ab795',
                  },
                  secondary: {
                    main: '#3ab795',
                  },
                  divider: grey[900],
                  background: {
                    default: '#282e37',
                    paper: '#222831',
                  },
                  white: {
                    main: '#FDFDFD',
                  },
                  text: {
                    primary: '#fff',
                    secondary: grey[300],
                  },
                }),
          },
          breakpoints: {
            values: {
              xs: 0,
              sm: 600,
              md: 768,
              lg: 1200,
              xl: 1536,
            },
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