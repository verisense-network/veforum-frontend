import Box from '@mui/material/Box'
import {useWalletContext} from '../context/WalletProvider'
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';


export default function Header(){
  const {handleConnect, address, disconnected} = useWalletContext()
  return (
    <Box className="flex justify-between items-center p-3">
      <Box>
        <div className='flex items-center space-x-1'>
          <img src="https://rustcc.cn/img/rust-logo.svg" width="40px"/>
          <span className='text-lg'>Rust语言中文社区</span>
        </div>
      </Box>
      <Box>
        {address ? (
          <Typography className='cursor-pointer' onClick={disconnected}>{`${address.slice(0,5)}...${address.slice(-5)}`}</Typography>
        ) : (
          <Button onClick={handleConnect} variant='contained' color='primary'>Connect wallet</Button>
        )}
      </Box>
    </Box>
  )
}