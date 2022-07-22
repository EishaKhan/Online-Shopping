import React, { useState, useEffect } from 'react';
import Main from './Core/Main';
import Pagination from './Core/Pagination';
import axios from 'axios';
import Footer from "./Footer/Footer";

const App = () => {
  const [posts, setPosts] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [postsPerPage] = useState(4);

  useEffect(() => {
    axios.get(`https://fakestoreapi.com/products`).then((response) => {
      setPosts(response.data);
    })

  }, []);

  // Get current posts
  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const currentPosts = posts.slice(indexOfFirstPost, indexOfLastPost);

  // Change page
  const paginate = pageNumber => setCurrentPage(pageNumber);

  return (
    <div >
      <Main posts={currentPosts} />
      <br />
      <div className='container'>
        <Pagination
          postsPerPage={postsPerPage}
          totalPosts={posts.length}
          paginate={paginate}
        />
      </div>
      <br />
      <Footer />
    </div>
  );
};

export default App;