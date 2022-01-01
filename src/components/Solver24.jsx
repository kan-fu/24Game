import Paper from '@mui/material/Paper'
import Typography from '@mui/material/Typography'
import Button from '@mui/material/Button'
import TextField from '@mui/material/TextField'
import Grid from '@mui/material/Grid'
import { useState } from 'react'

import calc from '../calc24'
import { spaceAroundOp, rand } from './helper'

const Solver24 = () => {
  const [problem, setProblem] = useState(['', '', '', ''])
  const [formula, setFormula] = useState('')

  const handleSolve = async () => {
    setFormula(calc(problem.map(Number), 24).replaceAll('*', '×'))
  }

  const handleRandom = () => {
    setProblem(problem.map((_) => rand(12) + 1))
    setFormula('')
  }

  const handleChange = (e, index) => {
    const val = e.target.value
    if (!/^[0-9]*$/.test(val)) {
      return
    }
    const updatedProblem = [...problem]
    updatedProblem[index] = val
    setProblem(updatedProblem)
  }

  return (
    <div>
      <Typography gutterBottom component='h1' variant='h4' align='center'>
        24 Solver
      </Typography>
      <Paper
        variant='outlined'
        sx={{ minHeight: '4rem', my: { xs: 3, md: 4 } }}
      >
        <Typography paragraph variant='h5' align='center' sx={{ mt: 1.5 }}>
          {spaceAroundOp(formula)}
        </Typography>
      </Paper>
      <Grid container spacing={4} sx={{ mt: { xs: 3, md: 6 } }}>
        {problem.map((number, index) => (
          <Grid
            container
            justifyContent='center'
            item
            key={index}
            xs={6}
            sm={3}
          >
            <TextField
              type='tel'
              value={number}
              onChange={(e) => handleChange(e, index)}
              inputProps={{
                style: {
                  textAlign: 'center',
                  fontSize: '1.5rem',
                },
              }}
            />
          </Grid>
        ))}
      </Grid>
      <Grid
        container
        justifyContent='space-between'
        sx={{ my: { xs: 3, md: 6 } }}
      >
        <Button
          onClick={handleRandom}
          variant='outlined'
          sx={{ px: { xs: 2, md: 4 } }}
        >
          Random
        </Button>
        <Button
          onClick={handleSolve}
          color='success'
          variant='outlined'
          sx={{ px: { xs: 2, md: 4 } }}
        >
          Solve
        </Button>
      </Grid>
    </div>
  )
}

export default Solver24
