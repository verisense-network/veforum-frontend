import {useCallback, useState, useEffect} from 'react';
import { InstantSearch, SearchBox, InfiniteHits } from 'react-instantsearch';
import 'instantsearch.css/themes/satellite.css';
import dayjs from 'dayjs';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import {Link} from 'react-router-dom'
import {useArticleContext} from '../../context/ArticlesContext';


const App = () => {
  const {client} = useArticleContext()
  return (
    <div>
      <InstantSearch
        indexName="article"
        searchClient={client}
        insights
      >
        <Box className='space-y-6'>
          <Box className='flex items-center justify-between'>
            <SearchBox />
          </Box>
          {(props) => {
            console.log('props', props, );
          }}
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
  console.log(item)
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
        <Typography component={Link} color='primary' to={item?.ext_link}>{item?.ext_link}</Typography>
      </Box>
    </Box>
  )
};
export default App
