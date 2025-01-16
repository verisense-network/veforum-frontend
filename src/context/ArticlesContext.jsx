import { createContext, useMemo, useContext, useCallback, useState, useEffect } from 'react';
import { instantMeiliSearch } from '@meilisearch/instant-meilisearch';
import {useLocation, useNavigate} from 'react-router-dom'; 
import {useInterval } from 'react-use'
import {searchHost, searchEndpoint, searchSecret} from "../constants";

export const ArticlesContext = createContext({
	client: null
});

/* const { searchClient } = instantMeiliSearch(
  'https://ms-0eb0292ba9f0-14294.fra.meilisearch.io',
  '240ac85ce526ae7623867f484fee1bc1c6601647'
); */

export const meiliSearchParamsProps = {
	attributesToSearchOn: ['*'],
	showRankingScoreDetails: true
}


export default function ArticlesProvider(props) {
	const [subspaceList, setSubspaceList] = useState([])
	const { searchClient, setMeiliSearchParams } = instantMeiliSearch(
		searchHost,
		searchSecret,
		{
			meiliSearchParams: {
				...meiliSearchParamsProps
			},
		}
	);
	const location = useLocation();
	const navigate = useNavigate();

	const fetchData = useCallback(async () => {
    const result = await fetch(searchEndpoint, {
      method:'POST',
      headers: {
        'Content-Type': 'application/json',
        authorization:'Bearer ' + searchSecret
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
    setSubspaceList(data.results[0].hits)
  },[])


  useEffect(() => {
    fetchData();
  },[location.pathname])

	useInterval(() => {
		navigate('/')
	},location.pathname === '/' ? 3000 : null)


	const value = useMemo(() => {
		return {
			client: searchClient,
			setMeiliSearchParams,
			subspaceList
		};
	}, [
		searchClient,
		setMeiliSearchParams,
		subspaceList
	]);

	return (
		<>
			<ArticlesContext.Provider value={value}>{props?.children}</ArticlesContext.Provider>
		</>
	);
}

export function useArticleContext(){
	return useContext(ArticlesContext)
}
