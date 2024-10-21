import Box from '@mui/material/Box'
import Container from '@mui/material/Container'
import Header from './header';
import {styled} from '@mui/material';

const StyledRoot = styled(Box)`
  width: 100vw;
  height: 100vh;
  background: ${({theme}) => theme.palette.background.default};
  color: ${({theme}) => theme.palette.text.primary};
`

const StyledContent = styled(Container)``

export default function Layout(props){
  return (
    <StyledRoot className='space-y-4'>
      <Header/>
      <StyledContent>
        {props.children}
      </StyledContent>
    </StyledRoot>
  )
}