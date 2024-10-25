import Box from '@mui/material/Box';
import {useState, useCallback, useEffect} from 'react';
import Chip from '@mui/material/Chip';


export default function SubspaceList(){
  const [list, setList] = useState([])
  const fetchData = useCallback(async () => {
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
              indexUid:'subspace',
              limit: 50,
              offset:0,
            }
          ]
        }
      )
    })
    const data = await result.json();
    setList(data.results[0].hits)
  },[])

  console.log('lists', list);

  useEffect(() => {
    fetchData();
  },[])
  return (
    <Box className='flex items-center flex-wrap space-y-3 space-x-1'>
      {list.map(item => {
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