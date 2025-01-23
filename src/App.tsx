import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router';
import Home from './pages/Home';
import AdminHome from './pages/Admin/AdminHome';
import AdminBlogs from './pages/Admin/AdminBlogs';
import BlogDetails from './pages/BlogDetails';
import AdminComments from './pages/Admin/AdminComments';

const App = () => {
  return (
    <BrowserRouter>
    <Routes>
      <Route path='/' element={<Home />} />
      <Route path='/blog-detail/:title' element={<BlogDetails />} />
      <Route path='/admin' element={<AdminHome />} />
      <Route path='/admin/blogs' element={<AdminBlogs />} />
      <Route path='/admin/comments' element={<AdminComments />} />
    </Routes>
    </BrowserRouter>
  );
}

export default App;
