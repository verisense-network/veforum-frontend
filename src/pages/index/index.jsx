import {useCallback, useState, useEffect} from 'react';
import { InstantSearch, SearchBox, InfiniteHits } from 'react-instantsearch';
import { instantMeiliSearch } from '@meilisearch/instant-meilisearch';
import 'instantsearch.css/themes/satellite.css';
import {MeiliSearch} from 'meilisearch';

/* const { searchClient } = instantMeiliSearch(
  'https://ms-0eb0292ba9f0-14294.fra.meilisearch.io',
  '240ac85ce526ae7623867f484fee1bc1c6601647'
); */
const { searchClient } = instantMeiliSearch(
  'http://localhost:7700',
  '123456'
);

const App = () => {

  return (
    <div>
      
      <InstantSearch
        indexName="article"
        searchClient={searchClient}
      >
        <SearchBox /> <span onClick={() => handlePost()}>Post</span>
        <InfiniteHits hitComponent={Hit} />
      </InstantSearch>
    </div>
  )
};

const Hit = ({ hit }) => {
  console.log(hit)
  return (
    <article key={hit.id}>
      <h1>{hit.title}</h1>
      {/* <p>{hit.genres.join(',')}</p> */}
    </article>
  )
};
export default App
