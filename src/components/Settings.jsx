import React, { useState } from 'react'
// App components
import CheckboxGroup from './CheckboxGroup'
import Drawer from './Drawer'
import RadioGroup from './RadioGroup'
import Snackbar from './Snackbar'
import Switch from '@material-ui/core/Switch'
import FormControlLabel from '@material-ui/core/FormControlLabel'
import FormControl from '@material-ui/core/FormControl'

const groupings = [
  { group: 1, hiragana: 'あいうえお', katakana: 'アイウエオ' },
  { group: 2, hiragana: 'かきくけこ', katakana: 'カキクケコ' },
  { group: 3, hiragana: 'さしすせそ', katakana: 'サシスセソ' },
  { group: 4, hiragana: 'たちつてと', katakana: 'タチツテト' },
  { group: 5, hiragana: 'なにぬねの', katakana: 'ナニヌネノ' },
  { group: 6, hiragana: 'はひふへほ', katakana: 'ハヒフヘホ' },
  { group: 7, hiragana: 'まみむめも', katakana: 'マミムメモ' },
  { group: 8, hiragana: 'や　ゆ　よ', katakana: 'ヤ　ユ　ヨ' },
  { group: 9, hiragana: 'らりるれろ', katakana: 'ラリルレロ' },
  { group: 10, hiragana: 'わ　を　ん', katakana: 'ワ　ヲ　ン' }
]

function Settings(props) {
  const { toggleAltColour, toggleDarkTheme } = props

  const previousSettings = props.settings
  const [tempSettings, setTempSettings] = useState(props.settings)
  const [openSnackbar, setOpenSnackbar] = useState(false)

  function handleChange(key, value) {
    const updatedSettings = { ...tempSettings, [key]: value }
    if (tempSettings.kana !== updatedSettings.kana) {
      toggleAltColour()
    }
    setTempSettings(updatedSettings)
  }

  function handleSubmit() {
    const error = Object.values(tempSettings.studying).filter(v => v).length < 1
    if (error) {
      setOpenSnackbar(true)
    } else {
      if (tempSettings === previousSettings) {
        // Settings unchanged: do nothing
      } else {
        // Settings changed: submit new settings
        props.onSubmit(tempSettings)
      }
      setOpenSnackbar(false)
      handleDrawer(false)
    }
  }

  function handleDrawer(value) {
    props.onDrawerChange(value)
  }

  function handleSnackbarClose(event, reason) {
    if (reason === 'clickaway') {
      return
    }

    setOpenSnackbar(false)
  }

  return (
    <React.Fragment>
      <Snackbar
        onClose={handleSnackbarClose}
        open={openSnackbar}
        variant='error'
        message='At least one study group must be selected'
      />
      <Drawer
        onClose={handleSubmit}
        onChange={handleDrawer}
        status={props.drawer}>
        <FormControl component='fieldset'>
          <FormControlLabel
            value={props.dark}
            control={
              <Switch
                checked={props.dark === 'dark' ? true : false}
                onClick={toggleDarkTheme}
                color='primary'
              />
            }
            label='Dark mode'
            labelPlacement='end'
          />
        </FormControl>

        <RadioGroup
          name='Kana'
          options={['hiragana', 'katakana']}
          value={tempSettings.kana}
          onChange={handleChange}
        />
        <RadioGroup
          name='Type'
          options={['recall', 'recognition']}
          value={tempSettings.type}
          onChange={handleChange}
        />
        <CheckboxGroup
          kana={tempSettings.kana}
          values={tempSettings.studying}
          data={groupings}
          onChange={handleChange}
        />
      </Drawer>
    </React.Fragment>
  )
}

export default Settings
