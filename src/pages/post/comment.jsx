import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import {useWalletContext} from '../../context/WalletProvider';
import OutlinedInput from '@mui/material/OutlinedInput';
import { useFormik } from 'formik';
import * as yup from 'yup';
import {keys} from 'lodash'
import {useMemo, useState} from 'react';
import {CommentSechma} from '../../constants/scaleCodec';
import {stringToHex, u8aToHex, hexToU8a} from '@polkadot/util';
import {nodeKey} from '../../constants';
import {useNavigate} from 'react-router-dom';
import {toast} from 'react-toastify';
import Loading from '@mui/material/CircularProgress';
import dayjs from 'dayjs';
import * as $ from "scale-codec";
import {rpcHost} from '../../constants';

export default function Comment(props){
  const {id = '', onClose, refresh} = props;
  const [loading, setLoading] = useState(false)
  const {address, wallet, addressInfo} = useWalletContext();
  const navigate = useNavigate();
  const formik = useFormik({
    initialValues: {
      id:BigInt(0),
      content:'',
      author_id:BigInt(0),
      author_nickname: addressInfo.name,
      article_id:BigInt(id),
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
      author_id:BigInt(values.author_id),
      article_id: BigInt(values.article_id),
      created_time: BigInt(dayjs().unix()),
    }
    try{
      const decodeValue = u8aToHex(CommentSechma.encode(params))
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
    if (signRaw) {
      const { signature } = await signRaw({
        address: address,
        data: msg,
        type: 'bytes',
      })
      console.log('signature', signature)
      // const params = [nodeKey, 'add_comment', codecValue.slice(2)]

      const account_encoded = u8aToHex($.str.encode(address)).slice(2)
      // console.log('account_encoded', account_encoded)
      const msg_encoded = u8aToHex($.uint8Array.encode(hexToU8a(msg))).slice(2)
      // console.log('msg_encoded', msg_encoded)
      const signature_encoded = u8aToHex($.str.encode(signature.slice(2))).slice(2)
      // console.log('signature_encoded', signature_encoded)
      const params_hex = codecValue.slice(2) + account_encoded + msg_encoded + signature_encoded
      // console.log('params_hex', params_hex)

      const params = [nodeKey, 'add_comment', params_hex]

      sendPost(params);
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
        toast.success('评论成功！')
        navigate(`/detail/${id}`)
        refresh();
        onClose();
      },3000)
    })
  }

  return (
    <Box className='space-y-4'>
      <Box className='space-y-4'>
        {keys(values).filter(item => !['id', 'author_id', 'author_nickname', 'article_id', 'created_time', 'status', 'weight'].includes(item)).map(item => {
          return (
            <OutlinedInput
              key={item}
              rows={5}
              multiline
              fullWidth
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
        <Box className='flex justify-end space-x-4'>
          <Button onClick={onClose} variant='outlined' size='small'>Cancel</Button>
          <Button 
            onClick={signMessage} 
            variant='contained' 
            size='small' 
            endIcon={loading ? <Loading color='inherit' fontSize='inherit' size={16}/> : null}
            disabled={!values.content || loading}
          >Post</Button>
        </Box>
      </Box>
    </Box>
  )
}

const validationSchema = yup.object({
  content: yup
    .string('content'),
  is_public: yup
    .boolean('Is public')
    .required('Is public'),
});
