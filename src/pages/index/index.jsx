import {useCallback, useState, useEffect} from 'react';
import { InstantSearch, SearchBox, InfiniteHits, Configure } from 'react-instantsearch';
import 'instantsearch.css/themes/satellite.css';
import dayjs from 'dayjs';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import {Link} from 'react-router-dom'
import {useArticleContext} from '../../context/ArticlesContext';
import {styled} from '@mui/material/styles';

const App = () => {
  const {client} = useArticleContext()
  return (
    <div>
      <InstantSearch
        indexName="article"
        searchClient={client}
      >
        <Configure 
          hitsPerPage={50} 
          //filters="author_nickname=lindawu"
        />
        <Box className='space-y-6'>
          <Box className='flex items-center justify-between'>
            <SearchBox />
          </Box>
          <InfiniteHits
            showPrevious={false}
            hitComponent={Hit}
          />
        </Box>
      </InstantSearch>
    </div>
  )
};

const Hit = ({ hit:item }) => {
  return (
    <Box key={item?.id} className='space-y-2 w-full' component={Link} to={`/detail/${item.id}`}>
      <Typography noWrap variant='h3'>{item.title}</Typography>
      <Box className='w-full flex items-center justify-between'>
        <Box className='flex items-center space-x-2'>
          {item?.author_nickname ? (
            <Typography>{item?.author_nickname}</Typography>
          ) : null}
          <Typography color='text.secondary'>{dayjs(item.created_time).format('YYYY-MM-DD HH:mm:ss')}</Typography>
        </Box>
        <Typography component={Link} color='primary' to={item?.ext_link}>{item?.ext_link}</Typography>
      </Box>
      <StyleDetail>{item.content}</StyleDetail>
    </Box>
  )
};
export default App


const StyleDetail = styled(Typography)`
display: -webkit-box;
-webkit-line-clamp: 3;
-webkit-box-orient: vertical;  
overflow: hidden;
`