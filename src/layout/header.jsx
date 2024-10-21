import Box from '@mui/material/Box'
import {useWalletContext} from '../context/WalletProvider'
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';


export default function Header(){
  const {handleConnect, address, disconnected} = useWalletContext()
  return (
    <Box className="flex justify-between item-center p-3">
      <div>Logo and Links</div>
      {address ? (
        <Typography className='cursor-pointer' onClick={disconnected}>{`${address.slice(0,5)}...${address.slice(-5)}`}</Typography>
      ) : (
        <Button onClick={handleConnect} variant='contained' color='primary'>Connect wallet</Button>
      )}
    </Box>
  )
}