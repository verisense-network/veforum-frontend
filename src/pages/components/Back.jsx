import Typography from '@mui/material/Typography';
import BackIcon from '@mui/icons-material/ArrowBackIos';
import {Link} from 'react-router-dom';


export default function BackTo(props){
  const {to = '/'} = props
  return (
    <Typography component={Link} to={to} color='text.secondary' className='flex items-center space-x-1'><BackIcon color='inherit' fontSize='small'/> <span>返回</span></Typography>
  )
}