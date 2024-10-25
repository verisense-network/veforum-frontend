import {Route, Routes } from 'react-router-dom';
import Layout from './layout';
import Index from './pages/index'
import Post from './pages/post';
import Comment from './pages/post/comment'
import Subspace from './pages/post/subspace'

const App = () => {
  return (
    <Layout>
      <Routes>
        <Route path='/' element={<Index />} />
        <Route path='/post' element={<Post />} />
        <Route path='/comment' element={<Comment />} />
        <Route path='/subspace' element={<Subspace />} />
      </Routes>
    </Layout>
  )
};

export default App
