import Box from '@mui/material/Box';
import {useState, useCallback, useEffect} from 'react';
import Chip from '@mui/material/Chip';
import {useArticleContext} from '../../context/ArticlesContext';


export default function SubspaceList(){
  const {subspaceList = []} = useArticleContext();
  return (
    <Box className='flex items-center flex-wrap gap-y-3 gap-x-1'>
      {subspaceList.map(item => {
        return (
          <Chip 
            label={item.title}
            color='secondary'
          />
        )
      })}
    </Box>
  )
}