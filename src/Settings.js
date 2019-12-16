import React, { useState } from 'react'
import SettingsRadioGroup from './SettingsRadioGroup'
import TemporaryDrawer from './TemporaryDrawer'
import Divider from '@material-ui/core/Divider'
import CheckboxesGroup from './CheckboxesGroup'
import Snackbar from '@material-ui/core/Snackbar'
import SnackbarContentWrapper from './SnackbarContentWrapper'

const groupings = [
  { group: 1, hiragana: 'あいうえお', katakana: 'アイウエオ' },
  { group: 2, hiragana: 'かきくけこ', katakana: 'カキクケコ' },
  { group: 3, hiragana: 'さしすせそ', katakana: 'サシスセソ' }
]

function Settings(props) {
  const [tempSettings, setTempSettings] = useState(props.settings)

  function handleChange(key, value) {
    const updatedSettings = { ...tempSettings, [key]: value }
    setTempSettings(updatedSettings)
  }

  function handleSubmit() {
    const error = Object.values(tempSettings.studying).filter(v => v).length < 1
    if (error) {
      console.log('error')
      setOpen(true)
    } else {
      setOpen(false)
      props.onSubmit(tempSettings)
      handleDrawer(false)
    }
  }

  function handleDrawer(value) {
    props.onDrawerChange(value)
  }

  //// Snackbar
  const [open, setOpen] = useState(false)

  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return
    }

    setOpen(false)
  }
  ////

  return (
    <React.Fragment>
      <Snackbar
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'left'
        }}
        open={open}
        autoHideDuration={6000}
        onClose={handleClose}>
        <SnackbarContentWrapper
          onClose={handleClose}
          variant='error'
          message='At least one study group must be selected'
        />
      </Snackbar>
      <TemporaryDrawer
        onClose={handleSubmit}
        onChange={handleDrawer}
        status={props.drawer}>
        <SettingsRadioGroup
          name='Kana'
          options={['hiragana', 'katakana']}
          value={tempSettings.kana}
          onChange={handleChange}
        />
        <SettingsRadioGroup
          name='Type'
          options={['recall', 'recognition']}
          value={tempSettings.type}
          onChange={handleChange}
        />
        <Divider />
        <CheckboxesGroup
          kana={tempSettings.kana}
          values={tempSettings.studying}
          data={groupings}
          onChange={handleChange}
        />
      </TemporaryDrawer>
    </React.Fragment>
  )
}

export default Settings
