import {Route, Routes } from 'react-router-dom';
import Layout from './layout';
import Index from './pages/index'
import Post from './pages/post';

const App = () => {
  return (
    <Layout>
      <Routes>
        <Route path='/' element={<Index />} />
        <Route path='/post' element={<Post />} />
        <Route path='/comment' element={<Post />} />
        <Route path='/subspace' element={<Post />} />
      </Routes>
    </Layout>
  )
};

export default App
