import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import {useParams} from 'react-router-dom';
import 'instantsearch.css/themes/satellite.css';
import {useEffect, useCallback, useState} from 'react';
import { Typography } from '@mui/material';
import BackIcon from '@mui/icons-material/ArrowBackIos'
import {Link} from 'react-router-dom';
import dayjs from 'dayjs';
import { InstantSearch,InfiniteHits, Configure } from 'react-instantsearch';
import {useArticleContext} from '../../context/ArticlesContext';
import {styled} from '@mui/material/styles';
import Divider from '@mui/material/Divider';

export default function Detail(){
  const [detail, setDetail] = useState([]);
  console.log('detail', detail);
  const {id = ''} = useParams()
  const fetchData = useCallback(async () => {
    if(!id){
      return 
    }
    const result = await fetch(`http://localhost:7700/multi-search`, {
      method:'POST',
      headers: {
        'Content-Type': 'application/json',
        authorization:'Bearer 123456'
      },
      body:JSON.stringify(
        {
          queries:[
            {
              attributesToSearchOn: ['*'],
              attributesToHighlight:['*'],
              highlightPostTag: "__/ais-highlight__",
              highlightPreTag: "__ais-highlight__",
              indexUid:'article',
              limit: 1,
              offset:0,
              q:`${id}`
            }
          ]
        }
      )
    })
    const data = await result.json();
    console.log('result', data);
    setDetail(data.results[0].hits[0])
  },[id])

  useEffect(() => {
    if(!id){
      return;
    }
    fetchData();
  },[id])
  return (
    <Box className='space-y-8'>
      <Typography component={Link} to="/" color='text.secondary'><BackIcon color='inherit' fontSize='small'/> 返回</Typography>
      <Box className='space-y-4'>
        <Typography variant="h3">{detail.title}</Typography>
        <Box className='flex items-center space-x-2'>
          {detail?.author_nickname ? (
            <Typography>{detail?.author_nickname}</Typography>
          ) : null}
          <Typography color='text.secondary'>{dayjs(detail.created_time).format('YYYY-MM-DD HH:mm:ss')}</Typography>
        </Box>
        <Typography variant="h3">{detail.content}</Typography>
      </Box>
      <Divider/>
      <Comment id={id}/>
    </Box>
  )
}

const Comment = ({id = ''}) => {
  console.log(id);
  const {client} = useArticleContext()
  return (
    <Box className='space-y-4'>
      <Box className='flex justify-between items-center'>
        <Typography variant='body1'>评论区</Typography>
        <Button size='small' component={Link} to={`/comment/${id}`}>写评论</Button>
      </Box>
      <InstantSearch
        indexName="comment"
        searchClient={client}
      >
        <Configure 
          hitsPerPage={20} 
        />
        <Box className='space-y-6'>
          <InfiniteHits
            showPrevious={false}
            hitComponent={Hit}
          />
        </Box>
      </InstantSearch>
    </Box>
  )
}

const Hit = ({ hit:item }) => {
  return (
    <Box key={item.id} className='space-y-2 w-full'>
      <Typography noWrap variant='h3'>{item.title}</Typography>
      <Box className='w-full flex items-center justify-between'>
        <Box className='flex items-center space-x-2'>
          {item?.author_nickname ? (
            <Typography>{item?.author_nickname}</Typography>
          ) : null}
          <Typography color='text.secondary'>{dayjs(item.created_time).format('YYYY-MM-DD HH:mm:ss')}</Typography>
        </Box>
      </Box>
      <StyleDetail>{item.content}</StyleDetail>
    </Box>
  )
};

const StyleDetail = styled(Typography)`
display: -webkit-box;
-webkit-line-clamp: 3;
-webkit-box-orient: vertical;  
overflow: hidden;
`