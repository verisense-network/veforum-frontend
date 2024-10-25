import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { stringToHex } from '@polkadot/util'
import {useWalletContext} from '../../context/WalletProvider';
import OutlinedInput from '@mui/material/OutlinedInput';
import { useFormik } from 'formik';
import * as yup from 'yup';
import {keys} from 'lodash'
import {ArticleSechma} from '../../constants/scaleCodec';
import {u8aToHex} from '@polkadot/util'
import {useMemo} from 'react';
import {nodeKey} from '../../constants';
import {useNavigate} from 'react-router-dom';
import {toast} from 'react-toastify';
import BackTo from '../components/Back';

export default function Post(){
  const {address, wallet} = useWalletContext()
  const navigate = useNavigate()
  const formik = useFormik({
    initialValues: {
      'id':BigInt(1),
      'title':'',
      'content':'',
      'author_id':BigInt(2),
      'author_nickname':'lindawu',
      'subspace_id':BigInt(3),
      'ext_link':'',
      'status':Number(0),
      'weight':Number(0),
      'created_time':BigInt(123456),
      'updated_time':BigInt(123456),
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
      'author_id':BigInt(values.author_id),
      subspace_id: BigInt(values.subspace_id),
      created_time: BigInt(Date.now()),
      updated_time: BigInt(Date.now()),
    }
    try{
      const decodeValue = u8aToHex(ArticleSechma.encode(params))
      return decodeValue
    }catch(error){
      return ''
    }
  },[values])

  console.log('codec value', codecValue, codecValue.slice(2), JSON.stringify([nodeKey, 'add_article', codecValue.slice(2)]))

  const signMessage = async () => {
    const signRaw = wallet.signer?.signRaw;
    console.log('sign message', signRaw)
    if (signRaw) {
      const { signature } = await signRaw({
        address: address,
        data: stringToHex('message'),
        type: 'bytes',
      })
      console.log('signature', signature)
      const params = [nodeKey, 'add_article', codecValue.slice(2)]
      //const signatrueParams = {...params, account_address: address, msg: 'message', signature}
      sendPost(params)
      return signature
    } else {
      return ''
    }
  }

  const sendPost = async (params) => {
    fetch('http://localhost:9944', {
      method:'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body:JSON.stringify({
        "jsonrpc":"2.0", 
        "id": "whatever",
        method:'nucleus_post',
        params:params
      })
    }).then(resp => {
      toast.success('发布成功！')
      navigate(`/`)
    })
  }

  return (
    <Container maxWidth="md" className='space-y-6'>
      <BackTo currentTag={<Typography color='inherit'>发文章</Typography>}/>
      <Box className='space-y-4'>
        {keys(values).filter(item => !['id', 'author_id', 'author_nickname', 'subspace_id', 'created_time', 'updated_time', 'status', 'weight'].includes(item)).map(item => {
          return (
            <OutlinedInput
              rows={5}
              multiline={item === 'content'}
              key={item}
              fullWidth
              id={item}
              name={item}
              color='primary'
              placeholder={item}
              value={formik.values[item]}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={formik.touched[item] && Boolean(formik.errors[item])}
              helperText={formik.touched[item] && formik.errors[item]}
            />
          )
        })}
        <Button onClick={signMessage} variant='contained' size='large'>发送</Button>
      </Box>
    </Container>
  )
}

const validationSchema = yup.object({
});