import { createContext, useMemo, useState, useContext } from 'react';
import Dialog from '@mui/material/Dialog';
import Box from '@mui/material/Box';
import { DialogContent, DialogTitle, Typography } from '@mui/material';


export const WalletContext = createContext({
	address:'',
	setAddress: null,
	handleConnect: () => {}
});

export default function WalletProvider(props) {
	const [address, setAddress] = useState('')
	const [addresses, setAddresses] = useState([''])
	const [wallet, setWallet] = useState(null)
	const [selectAddressOpen, setSelectAddressOpen] = useState(false)

	const handleConnect = async () => {
    if(window.injectedWeb3['polkadot-js']){
      const wallet = window.injectedWeb3['polkadot-js']
      console.log('wallet', wallet, wallet.accounts?.get());
      const enabledWallet = await wallet.enable();
      const accounts = await enabledWallet.accounts.get();
			setAddresses(accounts)
			setSelectAddressOpen(true)
			setWallet(enabledWallet)
    }
  }

	const handleSelectAddress = (address) => {
		setAddress(address);
		setSelectAddressOpen(false)
	}

	const disconnected = () => {
		setAddress('');
		setWallet(null);
	}

	const value = useMemo(() => {
		return {
			address,
			wallet,
			setAddress,
			handleConnect,
			disconnected,
		};
	}, [
		address,
		setAddress,
		handleConnect,
		disconnected,
		wallet
	]);

	return (
		<>
			<WalletContext.Provider value={value}>{props?.children}</WalletContext.Provider>
			<SelectAddressDialog
				open={selectAddressOpen}
				onClose={() => setSelectAddressOpen(false)}
				accounts={addresses}
				handleSelectAddress={handleSelectAddress}
			/>
		</>
	);
}

const SelectAddressDialog = (props) => {
	const {open, onClose, accounts, handleSelectAddress} = props;
	return (
		<Dialog
			open={open}
			onClose={onClose}
		>
			<DialogTitle>Select Address</DialogTitle>
			<DialogContent>
				<Box className='space-y-4'>
					{accounts?.map(item => {
						return (
							<Box onClick={() => handleSelectAddress(item.address)} key={item?.address}>
								<Typography variant='body1' noWrap fontWeight={700}>{item.name}</Typography>
								<Typography color='text.secondary' variant='body2'>{item.address}</Typography>
							</Box>
						)
					})}
				</Box>
			</DialogContent>
		</Dialog>
	)
}


export function useWalletContext(){
	return useContext(WalletContext)
}
