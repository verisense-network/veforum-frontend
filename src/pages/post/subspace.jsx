import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import {useWalletContext} from '../../context/WalletProvider';
import OutlinedInput from '@mui/material/OutlinedInput';
import { useFormik } from 'formik';
import * as yup from 'yup';
import {keys} from 'lodash'
import {SubspaceSechma} from '../../constants/scaleCodec';
import * as $ from "scale-codec";
import {stringToHex, u8aToHex, hexToU8a} from '@polkadot/util'
import {useMemo, useState} from 'react';
import {nodeKey} from '../../constants';
import { useNavigate } from 'react-router-dom';
import {toast} from 'react-toastify';
import BackTo from '../components/Back';
import Loading from '@mui/material/CircularProgress';
import dayjs from 'dayjs';
import {rpcHost} from '../../constants';


export default function Subspace(){
  const {address, wallet} = useWalletContext()
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const formik = useFormik({
    initialValues: {
      id:BigInt(0),
      title:'',
      slug:'',
      description:'',
      banner:'',
      status:0,
      weight:0,
      created_time:BigInt(0),
    },
    validationSchema: validationSchema,
    onSubmit: (values) => {
      console.log(values);
    },
  });
  const {values} = formik;
  const codecValue = useMemo(() => {
    const params = {
      ...values,
      id: BigInt(values.id),
      created_time: BigInt(dayjs().unix()),
    }
    try{
      const decodeValue = u8aToHex(SubspaceSechma.encode(params))
      return decodeValue
    }catch(error){
      return ''
    }
  },[values])

  console.log('codec value', codecValue)

  const signMessage = async () => {
    setLoading(true)
    const signRaw = wallet.signer?.signRaw;
    const msg = stringToHex('message');
    console.log('sign message', signRaw)
    if (signRaw) {
      const { signature } = await signRaw({
        address: address,
        data: msg,
        type: 'bytes',
      })
      console.log('signature', signature)

      const account_encoded = u8aToHex($.str.encode(address)).slice(2)
      // console.log('account_encoded', account_encoded)
      const msg_encoded = u8aToHex($.uint8Array.encode(hexToU8a(msg))).slice(2)
      // console.log('msg_encoded', msg_encoded)
      const signature_encoded = u8aToHex($.str.encode(signature.slice(2))).slice(2)
      // console.log('signature_encoded', signature_encoded)
      const params_hex = codecValue.slice(2) + account_encoded + msg_encoded + signature_encoded
      // console.log('params_hex', params_hex)

      const params = [nodeKey, 'add_subspace', params_hex]

      // const params = [nodeKey, 'add_subspace', codecValue.slice(2)]
      sendPost(params)
      return signature
    } else {
      return ''
    }
  }
  
  const sendPost = async (params) => {
    fetch(rpcHost, {
      method:'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body:JSON.stringify({
        "jsonrpc":"2.0", 
        "id": "whatever",
        method:'nucleus_post',
        params: params
      })
    }).then(resp => {
      setTimeout(() => {
        setLoading(false)
        toast.success('创建成功！')
        navigate(`/`)
      },3000)
    })
  }

  return (
    <Container maxWidth="md" className='space-y-4'>
      <BackTo to={-1} currentTag={<Typography color='inherit'>Create Subspace</Typography>}/>
      <Box className='space-y-4'>
        {keys(values).filter(item => !['id', 'created_time', 'status', 'weight'].includes(item)).map(item => {
          return (
            <OutlinedInput
              key={item}
              fullWidth
              rows={5}
              multiline={item === 'description'}
              id={item}
              name={item}
              placeholder={item}
              value={formik.values[item]}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={formik.touched[item] && Boolean(formik.errors[item])}
              helperText={formik.touched[item] && formik.errors[item]}
            />
          )
        })}
        <Button 
          onClick={signMessage} 
          variant='contained' 
          size='large'
          endIcon={loading ? <Loading color='inherit' fontSize='inherit' size={16}/> : null}
          disabled={!values.title || loading}
        >Create</Button>
      </Box>
    </Container>
  )
}

const validationSchema = yup.object({
  content: yup
    .string('content'),
  is_public: yup
    .boolean('Is public')
    .required('Is public'),
});
