import { createContext, useMemo, useContext, useCallback, useState, useEffect } from 'react';
import { ApiPromise, WsProvider, HttpProvider } from '@polkadot/api'
import { instantMeiliSearch } from '@meilisearch/instant-meilisearch';
import { liteClient as algoliasearch } from 'algoliasearch/lite';
import {useLocation} from 'react-router-dom';

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
		'http://localhost:7700',
		'123456',
		{
			meiliSearchParams: {
				...meiliSearchParamsProps
			},
		}
	);
	const location = useLocation();

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
    setSubspaceList(data.results[0].hits)
  },[])


  useEffect(() => {
    fetchData();
  },[location.pathname])

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
