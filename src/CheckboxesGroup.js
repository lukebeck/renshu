import React, { useState } from 'react'
import Icon from '@material-ui/core/Icon'
import WarningRoundedIcon from '@material-ui/icons/WarningRounded'
import ButtonGroup from '@material-ui/core/ButtonGroup'
import Button from '@material-ui/core/Button'
import FormLabel from '@material-ui/core/FormLabel'
import FormControl from '@material-ui/core/FormControl'
import FormGroup from '@material-ui/core/FormGroup'
import FormControlLabel from '@material-ui/core/FormControlLabel'
import FormHelperText from '@material-ui/core/FormHelperText'
import Checkbox from '@material-ui/core/Checkbox'

function CheckboxesGroup(props) {
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
      </FormGroup>
      <ButtonGroup color='primary' aria-label='outlined secondary button group'>
        <Button onClick={() => handleClick(false)}>Select none</Button>
        <Button onClick={() => handleClick(true)}>Select all</Button>
      </ButtonGroup>
      <FormHelperText>
        <Icon>
          <WarningRoundedIcon fontSize='small' />
        </Icon>
      </FormHelperText>
      <FormHelperText>You must select at least one group</FormHelperText>
    </FormControl>
  )
}

export default CheckboxesGroup
