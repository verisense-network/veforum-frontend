import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import { stringToHex } from '@polkadot/util'
import {useWalletContext} from '../../context/WalletProvider';
import OutlinedInput from '@mui/material/OutlinedInput';
import { useFormik } from 'formik';
import * as yup from 'yup';
import {keys} from 'lodash'
import {useMemo} from 'react';
import {CommentSechma} from '../../constants/scaleCodec';
import {u8aToHex} from '@polkadot/util';
import {nodeKey} from '../../constants';
import {useNavigate} from 'react-router-dom';
import {toast} from 'react-toastify';

export default function Comment(props){
  const {id = '', onClose} = props;
  const {address, wallet} = useWalletContext();
  const navigate = useNavigate();
  const formik = useFormik({
    initialValues: {
      id:BigInt(0),
      content:'',
      author_id:BigInt(id),
      author_nickname:'',
      article_id:BigInt(0),
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
      created_time: BigInt(Date.now()),
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
    const signRaw = wallet.signer?.signRaw;
    console.log('sign message', signRaw)
    if (signRaw) {
      const { signature } = await signRaw({
        address: address,
        data: stringToHex('message'),
        type: 'bytes',
      })
      console.log('signature', signature)
      const params = [nodeKey, 'add_comment', codecValue.slice(2)]
      //const signatureParams = {...params, account_address: address, msg: 'message', signature}
      sendPost(params);
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
        params: params
      })
    }).then(resp => {
      toast.success('评论成功！')
      navigate(`/detail/${id}`)
      onClose();
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
          <Button onClick={onClose} variant='outlined' size='small'>取消</Button>
          <Button onClick={signMessage} variant='contained' size='small'>发布</Button>
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
