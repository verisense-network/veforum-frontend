import {useCallback, useState, useEffect} from 'react';
import { InstantSearch, SearchBox, InfiniteHits } from 'react-instantsearch';
import { instantMeiliSearch } from '@meilisearch/instant-meilisearch';
import 'instantsearch.css/themes/satellite.css';
import {MeiliSearch} from 'meilisearch';

const { searchClient } = instantMeiliSearch(
  'https://ms-0eb0292ba9f0-14294.fra.meilisearch.io',
  '240ac85ce526ae7623867f484fee1bc1c6601647'
);

const App = () => {
  const [client, setClient] = useState(null)
  const initClient = useCallback(() => {
    const initClientConstant = new MeiliSearch({host: 'https://ms-0eb0292ba9f0-14294.fra.meilisearch.io', apiKey: '240ac85ce526ae7623867f484fee1bc1c6601647'})
    setClient(initClientConstant)
  },[])
  const handlePost = useCallback(async () => {
    if(!client){
      return;
    }
    const documents = [
      { id: 1, title: 'Carolize', genres: ['Romance', 'Drama'] },
      { id: 2, title: 'Wonder Woman', genres: ['Action', 'Adventure'] },
      { id: 3, title: 'Life of Pi', genres: ['Adventure', 'Drama'] },
      { id: 4, title: 'Mad Max: Fury Road', genres: ['Adventure', 'Science Fiction'] },
      { id: 5, title: 'Moana', genres: ['Fantasy', 'Action']},
      { id: 6, title: 'Philadelphia', genres: ['Drama'] },
    ]
    await client.index('others').addDocuments(documents)
      .then((res) => console.log(res))
  },[client])
  useEffect(() => {
    initClient()
  },[])
  return (
    <InstantSearch
      indexName="others"
      searchClient={searchClient}
    >
      <SearchBox /> <span onClick={() => handlePost()}>Post</span>
      <InfiniteHits hitComponent={Hit} />
    </InstantSearch>
  )
};

const Hit = ({ hit }) => (
  <article key={hit.id}>
    <h1>{hit.title}</h1>
    <p>{hit.genres.join(',')}</p>
  </article>
);
export default App
