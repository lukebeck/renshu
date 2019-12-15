import React, { useState } from 'react'
import SettingsRadioGroup from './SettingsRadioGroup'
import TemporaryDrawer from './TemporaryDrawer'
import Divider from '@material-ui/core/Divider'
import CheckboxesGroup from './CheckboxesGroup'

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
    props.onSubmit(tempSettings)
    handleDrawer(false)
  }

  function handleDrawer(value) {
    props.onDrawerChange(value)
  }

  return (
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
  )
}

export default Settings
