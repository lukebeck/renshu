import React from 'react'
import Drawer from '@material-ui/core/Drawer'
import Box from '@material-ui/core/Box'

// import Fab from '@material-ui/core/Fab'
// import CloseIcon from '@material-ui/icons/Close'

// function CloseButton(props) {
//   return (
//     <Box position='absolute' right='5%' top='5%'>
//       <Fab
//         color='primary'
//         aria-label='add'
//         onClick={props.handleClick}
//         size='small'>
//         <CloseIcon />
//       </Fab>
//     </Box>
//   )
// }

function TemporaryDrawer(props) {
  const toggleDrawer = value => event => {
    if (
      event.type === 'keydown' &&
      (event.key === 'Tab' || event.key === 'Shift')
    ) {
      return
    }
    props.onChange(value)
  }

  function handleClose() {
    props.onClose()
    toggleDrawer(false)
  }

  return (
    <Drawer anchor='right' open={props.status} onClose={handleClose}>
      {/* <CloseButton handleClick={toggleDrawer(false)} /> */}
      <Box
        width={250}
        m={4}
        role='presentation'
        onKeyDown={toggleDrawer(false)}>
        {props.children}
      </Box>
    </Drawer>
  )
}

export default TemporaryDrawer
