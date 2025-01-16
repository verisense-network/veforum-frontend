import Paper from '@mui/material/Paper'
import Container from '@mui/material/Container';
import Box from '@mui/material/Box';
import {partners, helpfuls, powerBy} from '../constants';
import { Typography } from '@mui/material';
import {Link} from 'react-router-dom';


export default function Footer(){
  return (
    <Paper className="py-8">
      <Container maxWidht="lg" className='space-y-4'>
        <Box className='flex items-center space-x-3 justify-center'>
          {
            [{label: 'Partners:',url:''}, ...partners].map(item => {
              return (
                <Typography className={`${item.url ? 'hover:text-secondary' : ''}`} component={item.url ? Link : 'inherit'} to={item.url ? item.url : ''}>{item.label}</Typography>
              )
            })
          }
        </Box>
        <Box className='flex items-center space-x-3 justify-center'>
          {
            [{label: 'Acknowledgements:',url:''}, ...helpfuls].map(item => {
              return (
                <Typography className={`${item.url ? 'hover:text-secondary' : ''}`} component={item.url ? Link : 'inherit'} to={item.url ? item.url : ''}>{item.label}</Typography>
              )
            })
          }
        </Box>
        <Box className='flex items-center space-x-3 justify-center'>
          {
            [{label: 'Powered By:',url:''}, ...powerBy].map(item => {
              return (
                <Typography className={`${item.url ? 'hover:text-secondary' : ''}`} component={item.url ? Link : 'inherit'} to={item.url ? item.url : ''}>{item.label}</Typography>
              )
            })
          }
        </Box>
        <Typography color='text.secondary' className="text-center">©2016~2024 Rust.cc Copyright Reserved</Typography>
      </Container>
    </Paper>
  )
}