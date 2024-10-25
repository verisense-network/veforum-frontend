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

	/* useEffect(() => {
		window?.reload();
	},[location.pathname]) */

	const value = useMemo(() => {
		return {
			client: searchClient,
			setMeiliSearchParams
		};
	}, [
		searchClient,
		setMeiliSearchParams
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
