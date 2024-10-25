import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import BackIcon from '@mui/icons-material/ArrowBackIos';
import {Link} from 'react-router-dom';


export default function BackTo(props){
  const {to = '/', currentTag = null} = props
  return (
    <Typography component={Link} to={to} color='text.secondary' className='flex items-center space-x-1 text-sm'>
      <BackIcon color='inherit' fontSize='small'/>
      <Box className='flex items-center space-x-1'><span>当前位置：</span>{currentTag}</Box>
    </Typography>
  )
}