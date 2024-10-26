import {useCallback, useState, useEffect} from 'react';
import { InstantSearch, SearchBox, InfiniteHits, Configure } from 'react-instantsearch';
import 'instantsearch.css/themes/satellite.css';
import dayjs from 'dayjs';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import {Link} from 'react-router-dom'
import {useArticleContext} from '../../context/ArticlesContext';
import {styled} from '@mui/material/styles';
import SubspaceList from './subspace-list';
import {links} from '../../constants';
import './index.css'
import Chip from '@mui/material/Chip';

const App = () => {
  const {client} = useArticleContext()
  return (
    <Box className='grid grid-cols-5 gap-6'>
      <Box className='col-span-4'>
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
              <SearchBox className='w-1/2'/>
            </Box>
            <InfiniteHits
              showPrevious={false}
              hitComponent={Hit}
            />
          </Box>
        </InstantSearch>
      </Box>
      <Box className='space-y-6'>
        <Box className='space-y-4'>
          <Typography varaint='h5' fontWeight={600} color='primary'>Classes</Typography>
          <SubspaceList />
        </Box>
        <Box className='space-y-4'>
          <Typography varaint='h5' fontWeight={600} color='primary'>Links</Typography>
          <Box className='flex flex-col space-y-1'>
            {links.map(item => {
              return (
                <Typography className="hover:text-secondary" key={item.url} component={Link} to={item.url}>{item.label}</Typography>
              )
            })}
          </Box>
        </Box>
      </Box>
    </Box>
  )
};

const Hit = ({ hit:item }) => {
  const {subspaceList} = useArticleContext();
  const subspaceItem = subspaceList.find(subspace => subspace.id === item?.subspace_id)
  return (
    <Box key={item?.id} className='space-y-2 w-full' component={Link} to={`/detail/${item.id}`}>
      <Typography noWrap variant='h4' fontWeight={600}>{item.title}</Typography>
      <Box className='w-full flex items-center justify-between'>
        <Box className='flex items-center space-x-2'>
          {item?.author_nickname ? (
            <Typography>{item?.author_nickname}</Typography>
          ) : null}
          <Typography color='text.secondary'>{dayjs(Number(item.created_time)*1000).format('YYYY-MM-DD HH:mm:ss')}</Typography>
          {subspaceItem ? (
            <Chip label={subspaceItem.title} color='primary' size="small"/>
          ) : null}
        </Box>
        <Typography component={Link} color='secondary' to={item?.ext_link}>{item?.ext_link}</Typography>
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