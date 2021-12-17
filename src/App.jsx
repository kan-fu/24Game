import Brightness4Icon from '@mui/icons-material/Brightness4'
import Brightness7Icon from '@mui/icons-material/Brightness7'
import CssBaseline from '@mui/material/CssBaseline'
import Container from '@mui/material/Container'
import Paper from '@mui/material/Paper'
import Grid from '@mui/material/Grid'
import IconButton from '@mui/material/IconButton'
import Switch from '@mui/material/Switch'

import { useState, useContext, createContext, useMemo } from 'react'
import { createTheme, ThemeProvider, useTheme } from '@mui/material/styles'
import { SwitchTransition, CSSTransition } from 'react-transition-group'

import Game24 from './components/Game24'
import Solver24 from './components/Solver24'
import './App.css'

const ColorModeContext = createContext({ toggleColorMode: () => {} })

const App = () => {
  const theme = useTheme()
  const colorMode = useContext(ColorModeContext)
  const [checked, setChecked] = useState(false)

  return (
    <>
      <CssBaseline />
      <Container
        component='main'
        maxWidth='false'
        sx={{
          // height: '100vh',
          mt: 6,
          width: '100vw',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          transition: 'all 0.5s',
        }}
      >
        <Paper
          elevation={3}
          sx={{
            my: { xs: 3, md: 6 },
            p: { xs: 2, md: 3 },
            maxWidth: '500px',
          }}
        >
          <Grid container justifyContent='space-between'>
            <IconButton
              sx={{ ml: 1 }}
              onClick={colorMode.toggleColorMode}
              color='inherit'
            >
              {theme.palette.mode === 'dark' ? (
                <Brightness7Icon />
              ) : (
                <Brightness4Icon />
              )}
            </IconButton>
            <Switch checked={checked} onChange={() => setChecked(!checked)} />
          </Grid>

          <SwitchTransition>
            <CSSTransition
              key={checked ? 'Goodbye, world!' : 'Hello, world!'}
              addEndListener={(node, done) =>
                node.addEventListener('transitionend', done, false)
              }
              classNames='fade'
            >
              {checked ? <Solver24 /> : <Game24 />}
            </CSSTransition>
          </SwitchTransition>
        </Paper>
      </Container>
    </>
  )
}

const ToggleColorMode = () => {
  const [mode, setMode] = useState('light')
  const colorMode = useMemo(
    () => ({
      toggleColorMode: () => {
        setMode((prevMode) => (prevMode === 'light' ? 'dark' : 'light'))
      },
    }),
    []
  )

  const theme = useMemo(
    () =>
      createTheme({
        palette: {
          mode,
        },
      }),
    [mode]
  )

  return (
    <ColorModeContext.Provider value={colorMode}>
      <ThemeProvider theme={theme}>
        <App />
      </ThemeProvider>
    </ColorModeContext.Provider>
  )
}

export default ToggleColorMode
