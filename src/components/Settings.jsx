import React, { useState } from 'react'
// App components
import CheckboxGroup from './CheckboxGroup'
import Drawer from './Drawer'
import RadioGroup from './RadioGroup'
import Snackbar from './Snackbar'
import Switch from '@material-ui/core/Switch'
import FormControlLabel from '@material-ui/core/FormControlLabel'
import FormControl from '@material-ui/core/FormControl'
import Button from '@material-ui/core/Button'
import Dialog from '@material-ui/core/Dialog'
import DialogActions from '@material-ui/core/DialogActions'
import DialogContent from '@material-ui/core/DialogContent'
import DialogTitle from '@material-ui/core/DialogTitle'
import Table from './Table'
import Typography from '@material-ui/core/Typography'
import { makeStyles } from '@material-ui/core/styles'

const useStyles = makeStyles(theme => ({
  title: {
    fontFamily: 'Permanent Marker',
    fontSize: 50,
    transform: 'skewY(-10deg)'
  }
}))

const columns = [
  { id: 'index', label: 'Index', minWidth: 50 },
  { id: 'hiragana', label: 'Hiragana', minWidth: 50 },
  { id: 'katakana', label: 'Katakana', minWidth: 50 },
  { id: 'romaji', label: 'Romaji', minWidth: 50 },
  {
    id: 'answered',
    label: 'Answered',
    minWidth: 50,
    align: 'right',
    format: value => value.toLocaleString()
  },
  {
    id: 'correct',
    label: 'Correct',
    minWidth: 50,
    align: 'right',
    format: value => value.toLocaleString()
  },
  {
    id: 'percent',
    label: 'Percentage',
    minWidth: 75,
    align: 'right',
    format: value => parseInt(value)
  }
]

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
  { group: 10, hiragana: 'わ　を　ん', katakana: 'ワ　ヲ　ン' },
  { group: 11, hiragana: 'がぎぐげご', katakana: 'ガギグゲゴ' },
  { group: 12, hiragana: 'ざじずぜそ', katakana: 'ザジズゼゾ' },
  { group: 13, hiragana: 'だぢづでど', katakana: 'ダヂヅデド' },
  { group: 14, hiragana: 'ばびぶべぼ', katakana: 'バビブベボ' },
  { group: 15, hiragana: 'ぱぴぷぺぽ', katakana: 'パピプペポ' }
]

function Settings(props) {
  const classes = useStyles()
  const { toggleAltColour, toggleDarkTheme, resetDeck } = props

  const previousSettings = props.settings
  const [tempSettings, setTempSettings] = useState(props.settings)
  const [openSnackbar, setOpenSnackbar] = useState(false)

  function handleChange(key, value) {
    const updatedSettings = { ...tempSettings, [key]: value }
    if (tempSettings.kana !== updatedSettings.kana) {
      toggleAltColour(value)
    }
    setTempSettings(updatedSettings)
  }

  function handleReset() {
    setOpenSnackbar(false)
    handleDrawer(false)
    resetDeck()
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

  function handleDarkTheme() {
    setTempSettings({ ...tempSettings, darkMode: !tempSettings.darkMode })
    toggleDarkTheme()
  }

  function handleSnackbarClose(event, reason) {
    if (reason === 'clickaway') {
      return
    }

    setOpenSnackbar(false)
  }

  const [dialog, setDialog] = useState(false)

  const handleDialogClose = () => {
    setDialog(false)
  }

  return (
    <React.Fragment>
      <Snackbar
        onClose={handleSnackbarClose}
        open={openSnackbar}
        variant='error'
        message='At least one study group must be selected'
      />
      <Dialog
        open={dialog}
        onClose={handleDialogClose}
        scroll={'body'}
        aria-labelledby='scroll-dialog-title'
        aria-describedby='scroll-dialog-description'>
        <DialogTitle id='scroll-dialog-title'>Cards</DialogTitle>
        <DialogContent dividers={true}>
          <Table columns={columns} deck={props.deck} />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleDialogClose} color='primary'>
            Close
          </Button>
        </DialogActions>
      </Dialog>
      <Drawer
        onClose={handleSubmit}
        onChange={handleDrawer}
        status={props.drawer}>
        <Typography className={classes.title}>Renshu</Typography>
        <Button onClick={() => handleReset()}>Reset deck</Button>
        <Button onClick={() => setDialog(true)}>View deck</Button>
        <FormControl component='fieldset'>
          <FormControlLabel
            value={previousSettings.darkMode}
            control={
              <Switch
                checked={previousSettings.darkMode}
                onClick={handleDarkTheme}
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
