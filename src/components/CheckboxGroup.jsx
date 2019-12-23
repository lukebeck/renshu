import React, { useState } from 'react'
import clsx from 'clsx'
// Material core
import Button from '@material-ui/core/Button'
import ButtonGroup from '@material-ui/core/ButtonGroup'
import Checkbox from '@material-ui/core/Checkbox'
import FormControl from '@material-ui/core/FormControl'
import FormControlLabel from '@material-ui/core/FormControlLabel'
import FormGroup from '@material-ui/core/FormGroup'
import FormHelperText from '@material-ui/core/FormHelperText'
import FormLabel from '@material-ui/core/FormLabel'
import Icon from '@material-ui/core/Icon'
import { makeStyles } from '@material-ui/core/styles'
// Material icon
import WarningRoundedIcon from '@material-ui/icons/WarningRounded'

const useStyles = makeStyles(theme => ({
  error: {
    backgroundColor: theme.palette.primary.main
  },
  icon: {
    fontSize: 20
  },
  iconVariant: {
    opacity: 0.9,
    marginRight: theme.spacing(1)
  },
  message: {
    display: 'flex',
    alignItems: 'center',
    fontSize: 14
  }
}))

function CheckboxGroup(props) {
  const classes = useStyles()
  const data = props.data
  const [values, setValues] = useState(props.values)

  const handleChange = name => event => {
    setValues({ ...values, [name]: event.target.checked })
    props.onChange('studying', { ...values, [name]: event.target.checked })
  }

  function handleClick(value) {
    const selectAll = Object.keys(values).reduce(
      (previousValue, currentValue) => ({
        ...previousValue,
        [currentValue]: value
      }),
      {}
    )
    setValues(selectAll)
    props.onChange('studying', selectAll)
  }

  const error = Object.values(values).filter(v => v).length < 1

  return (
    <FormControl error={error} component='fieldset'>
      <FormLabel component='legend'>Studying</FormLabel>

      <FormGroup>
        {data.map((item, index) => (
          <FormControlLabel
            key={index}
            control={
              <Checkbox
                color='primary'
                checked={values[item.group]}
                onChange={handleChange(item.group)}
                value={item.group}
              />
            }
            label={props.kana === 'hiragana' ? item.hiragana : item.katakana}
          />
        ))}
        <ButtonGroup size='small' aria-label='outlined secondary button group'>
          <Button onClick={() => handleClick(true)}>Select all</Button>
          <Button onClick={() => handleClick(false)}>Select none</Button>
        </ButtonGroup>
      </FormGroup>
      <FormHelperText>
        <span className={classes.message}>
          <Icon className={clsx(classes.icon, classes.iconVariant)}>
            <WarningRoundedIcon fontSize='small' />
          </Icon>
          Select at least one group
        </span>
      </FormHelperText>
    </FormControl>
  )
}

export default CheckboxGroup
