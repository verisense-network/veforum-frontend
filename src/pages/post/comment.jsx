import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
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
import {useParams, useNavigate} from 'react-router-dom';
import {toast} from 'react-toastify';
import BackTo from '../components/Back';

export default function Comment(){
  const {id = ''} = useParams();
  const {address, wallet} = useWalletContext();
  const navigate = useNavigate();
  const formik = useFormik({
    initialValues: {
      id:BigInt(id),
      content:'',
      author_id:BigInt(0),
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

  console.log(values);

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
      sendPost({...params, account_address: address, msg: 'message', signature})
      return signature
    } else {
      return ''
    }
  }
  

  const sendPost = async (params) => {
    const postParmas = [nodeKey, 'add_comment', codecValue.slice(2)];
    fetch('http://localhost:9944', {
      method:'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body:JSON.stringify({
        "jsonrpc":"2.0", 
        "id": "whatever",
        method:'nucleus_post',
        params: postParmas
      })
    }).then(resp => {
      toast.success('评论成功！')
      navigate(`/detail/${id}`)
    })
  }

  return (
    <Container maxWidth="md" className='space-y-4'>
      <BackTo to={`/detail/${id}`}/>
      <Box className='space-y-4'>
        {keys(values).filter(item => !['id', 'author_id', 'author_nickname', 'article_id', 'created_time', 'status', 'weight'].includes(item)).map(item => {
          return (
            <OutlinedInput
              key={item}
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
        <Button onClick={sendPost} variant='contained' size='large'>Comment</Button>
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
