import Paper from '@mui/material/Paper'
import Typography from '@mui/material/Typography'
import Button from '@mui/material/Button'
import Grid from '@mui/material/Grid'
import Fab from '@mui/material/Fab'
import Alert from '@mui/material/Alert'

import { useState } from 'react'

import problems from '../data'
import calc from '../calc24'
import { spaceAroundOp, rand } from './helper'

const Game24 = () => {
  const [problemIndex, setProblemIndex] = useState(rand(problems.length))
  // disable states for 4 number buttons
  const [numberStates, setNumberStates] = useState(Array(4).fill(false))
  // disable state for check|undo|reset buttons
  const [buttonState, setButtonState] = useState(false)
  const initAlertMessage = {
    type: 'success',
    content: '',
    display: false,
  }
  const [alertMessage, setAlertMessage] = useState(initAlertMessage)
  const [formula, setFormula] = useState('')

  // deal with dark mode
  const operators = ['+', '-', '×', '/', '(', ')']
  const TARGET = 24
  const problem = problems[problemIndex]

  const flipButtonState = (flipIndex) => {
    setNumberStates(
      numberStates.map((button, index) =>
        index === flipIndex ? !button : button
      )
    )
  }

  const handleNext = () => {
    setProblemIndex(rand(problems.length, problemIndex))
    handleReset()
    setButtonState(false)
  }

  const handleSolution = () => {
    setFormula(calc(problem, 24).replaceAll('*', '×'))
    setNumberStates(Array(4).fill(true))
    setAlertMessage(initAlertMessage)
    setButtonState(true)
  }

  const handleReset = () => {
    setAlertMessage(initAlertMessage)
    setFormula('')
    setNumberStates(Array(4).fill(false))
  }

  const handleUndo = () => {
    const isLastInputNumber = /\d+$/.exec(formula)

    let inputLength = 1
    // If last input is number, also need to undo the button state.
    // number may also has two digits (e.g. 10)
    if (isLastInputNumber) {
      const lastNumber = isLastInputNumber[0]
      inputLength = lastNumber.length
      for (let i = 0; i < problem.length; i++) {
        if (numberStates[i] && problem[i] === Number(lastNumber)) {
          flipButtonState(i)
          break
        }
      }
    }
    setFormula(formula.slice(0, -inputLength))
    setAlertMessage(initAlertMessage)
  }

  const handleOperatorButton = (op) => {
    // exclude the case when both the last input and op are +-*/
    if (/[+\-×/]$/.test(formula) && /[+\-×/]/.test(op)) {
      return
    }
    // exclude immediate pairng brackets
    if (
      (/[(]$/.test(formula) && op === ')') ||
      (/[)]$/.test(formula) && op === '(')
    ) {
      return
    }
    setFormula(`${formula}${op}`)
    setAlertMessage(initAlertMessage)
  }

  const handleNumberButton = (indexClicked) => {
    if (!/\d$/.test(formula)) {
      flipButtonState(indexClicked)
      setFormula(`${formula}${problem[indexClicked]}`)
      setAlertMessage(initAlertMessage)
    }
  }

  const handleCheck = () => {
    if (!formula || /[a-z]/i.test(formula)) {
      return
    }
    if (!numberStates.every(Boolean)) {
      setAlertMessage({
        type: 'error',
        content: 'Not all numbers are used!',
        display: true,
      })
      return
    }
    try {
      // eslint-disable-next-line
      const result = eval(formula.replaceAll('×', '*'))
      if (result === TARGET) {
        setAlertMessage({
          type: 'success',
          content: 'You win!',
          display: true,
        })
        setButtonState(true)
      } else {
        setAlertMessage({
          type: 'warning',
          content: `Answer ${result} is not 24!`,
          display: true,
        })
      }
    } catch (error) {
      setAlertMessage({
        type: 'error',
        content: `Formula is not valid!`,
        display: true,
      })
    }
  }

  return (
    <div>
      <Typography gutterBottom component='h1' variant='h4' align='center'>
        24 Game
      </Typography>
      {alertMessage.display && (
        <Alert severity={alertMessage.type} sx={{ mb: { xs: 1, md: 2 } }}>
          {alertMessage.content}
        </Alert>
      )}
      <Paper variant='outlined' sx={{ minHeight: '4rem' }}>
        <Typography paragraph variant='h5' align='center' sx={{ mt: 1.5 }}>
          {spaceAroundOp(formula)}
        </Typography>
      </Paper>
      <Grid container spacing={2} sx={{ my: { xs: 3, md: 6 } }}>
        {problem.map((number, index) => (
          <Grid container justifyContent='center' item key={index} xs={3}>
            <Fab
              color='primary'
              sx={{ fontSize: '1.5rem' }}
              disabled={numberStates[index]}
              onClick={() => handleNumberButton(index)}
            >
              {number}
            </Fab>
          </Grid>
        ))}
      </Grid>
      <Grid container spacing={{ xs: 2, md: 4 }} sx={{ my: { xs: 3, md: 6 } }}>
        {operators.map((operator) => (
          <Grid
            container
            justifyContent='center'
            item
            key={operator}
            xs={4}
            md={2}
          >
            <Fab
              color='secondary'
              size='medium'
              onClick={() => handleOperatorButton(operator)}
              sx={{ fontSize: '1.5rem' }}
            >
              {operator}
            </Fab>
          </Grid>
        ))}
      </Grid>
      <Grid
        container
        justifyContent='space-around'
        sx={{ my: { xs: 2, md: 3 } }}
      >
        <Button
          disabled={buttonState}
          onClick={handleCheck}
          color='primary'
          variant='outlined'
        >
          Check
        </Button>

        <Button
          disabled={buttonState}
          onClick={handleUndo}
          color='secondary'
          variant='outlined'
        >
          Undo
        </Button>
        <Button
          disabled={buttonState}
          onClick={handleReset}
          color='error'
          variant='outlined'
        >
          Reset
        </Button>
      </Grid>
      <Grid container justifyContent='space-around'>
        <Button onClick={handleNext} color='warning' variant='outlined'>
          Next
        </Button>
        <Button onClick={handleSolution} color='success' variant='outlined'>
          Solution
        </Button>
      </Grid>
    </div>
  )
}

export default Game24
