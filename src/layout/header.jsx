import Box from '@mui/material/Box'
import {useWalletContext} from '../context/WalletProvider'
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import {Link} from 'react-router-dom';
import Chip from '@mui/material/Chip';


export default function Header(){
  const {handleConnect, address, disconnected} = useWalletContext()
  return (
    <Box className="flex justify-between items-center p-3 px-5">
      <Box>
        <Box className='flex items-center space-x-1' component={Link} to='/'>
          <img src="https://rustcc.cn/img/rust-logo.svg" width="40px"/>
          <span className='text-lg'>Rust语言中文社区</span>
        </Box>
      </Box>
      <Box className='flex items-center space-x-4'>
        <Typography color='' component={Link} to='/post'>发帖</Typography>
        <Typography color='' component={Link} to='/subspace'>创建Subspace</Typography>
        {/* <Typography color='' component={Link} to='/post'>写笔记</Typography> */}
        {address ? (
          <Chip 
            label={`${address.slice(0,5)}...${address.slice(-5)}`}
            className='cursor-pointer' onClick={disconnected}
            color='primary' 
          />
        ) : (
          <Button onClick={handleConnect} variant='contained' color='primary'>Connect wallet</Button>
        )}
      </Box>
    </Box>
  )
}