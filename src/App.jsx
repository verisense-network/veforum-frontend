import React from 'react';
import { InstantSearch, SearchBox, InfiniteHits } from 'react-instantsearch';
import { instantMeiliSearch } from '@meilisearch/instant-meilisearch';
import 'instantsearch.css/themes/satellite.css';

const { searchClient } = instantMeiliSearch(
  'https://ms-0eb0292ba9f0-14294.fra.meilisearch.io',
  '240ac85ce526ae7623867f484fee1bc1c6601647'
);

const App = () => (
  <InstantSearch
    indexName="movies"
    searchClient={searchClient}
  >
    <SearchBox />
    <InfiniteHits hitComponent={Hit} />
  </InstantSearch>
);

const Hit = ({ hit }) => (
  <article key={hit.id}>
    <h1>{hit.title}</h1>
    <p>{hit.genres.join(',')}</p>
  </article>
);
export default App
