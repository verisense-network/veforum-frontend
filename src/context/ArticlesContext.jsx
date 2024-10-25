import { createContext, useMemo, useContext, useCallback, useState, useEffect } from 'react';
import { ApiPromise, WsProvider, HttpProvider } from '@polkadot/api'
import { instantMeiliSearch } from '@meilisearch/instant-meilisearch';


export const ArticlesContext = createContext({
	client: null
});

/* const { searchClient } = instantMeiliSearch(
  'https://ms-0eb0292ba9f0-14294.fra.meilisearch.io',
  '240ac85ce526ae7623867f484fee1bc1c6601647'
); */


export default function ArticlesProvider(props) {
	const { searchClient } = instantMeiliSearch(
		'http://localhost:7700',
		'123456',
		{
			meiliSearchParams:{
				limit: 1
			}
		}
	);

	const value = useMemo(() => {
		return {
			client: searchClient
		};
	}, [
		searchClient
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
