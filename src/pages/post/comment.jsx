import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import { stringToHex } from '@polkadot/util'
import {useWalletContext} from '../../context/WalletProvider';
import OutlinedInput from '@mui/material/OutlinedInput';
import { useFormik } from 'formik';
import * as yup from 'yup';
import {keys} from 'lodash'

export default function Comment(){
  const {address, wallet} = useWalletContext()
  const formik = useFormik({
    initialValues: {
      content: '',
      author_id: '',
      author_nickname: '',
      post_id: '',
      parent_comment_id: '',
      is_public: true,

    },
    validationSchema: validationSchema,
    onSubmit: (values) => {
      console.log(values);
    },
  });

  const {values} = formik;

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
      sendPost({...values, account_address: address, msg: 'message', signature})
      return signature
    } else {
      return ''
    }
  }
  

  const sendPost = (params) => {
    // todo
    console.log('params', params)
  }

  return (
    <Box className='space-y-4'>
      {keys(values).map(item => {
        return (
          <OutlinedInput
            key={item}
            fullWidth
            id={item}
            name={item}
            placeholders={item}
            value={formik.values[item]}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={formik.touched[item] && Boolean(formik.errors[item])}
            helperText={formik.touched[item] && formik.errors[item]}
          />
        )
      })}
      <Button onClick={signMessage} variant='contained' fullWidth size='large'>Sign message</Button>
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
