
import React, { useEffect, useState,useContext } from 'react';
import axios from 'axios';
import './App.css';
import ArticleCard from './ArticleCard';
import { v4 as uuidv4 } from 'uuid'; 
import './Feed.css'
import userContext from './context/userContext';

function Feed() {
    const [articles, setArticles] = useState([]);
    const [loading, setLoading] = useState(true);
    const [currentPage, setCurrentPage] = useState(1);
    const [articlesPerPage, setArticlesPerPage] = useState(20);
    const totalPages = Math.ceil(articles.length / articlesPerPage);
    const {userInfo, setUserInfo} = useContext(userContext)


  useEffect(() => {
    axios
      .get('http://127.0.0.1:8000/api/article/',
      {
        params: {
            page: currentPage,
            per_page: articlesPerPage,
          },
      })
      .then((response) => {
        setArticles(response.data);
        setLoading(false);
      })
      .catch((error) => {
        console.error('Error fetching data:', error);
      });

  }, [currentPage, articlesPerPage])


  const handleNextPage = () => {
    setCurrentPage(currentPage + 1);
  };

  const handlePreviousPage = () => {
    setCurrentPage(currentPage - 1);
  };

  const paginate = (data, page, perPage) => {
    const start = (page - 1) * perPage;
    const end = start + perPage;
    return data.slice(start, end);
  };
  
  return (
    <div className='Feed'>
       {loading ? (
        <p id="loading-text">Loading...</p>
      ) :
      <>
        <h3 id="tinnitus-insights">
        Tinnitus Insights
        </h3>
        <p id="tinnitus-insights-exp">
        Get to the heart of the matter with articles, summaries, and expert insights. It's time to take control of your tinnitus journey.
        </p>
        <div className="article-list">
            {paginate(articles, currentPage, articlesPerPage).map((article) => (
                <>
                <ArticleCard key={uuidv4()} article={article} />
                </>)
            )}
        </div>

        <div id="pagination-div">
          <button onClick={handlePreviousPage} disabled={currentPage === 1}>
            Previous
          </button>

           <span>Page {currentPage} of {totalPages}</span>

           <button
            onClick={handleNextPage}
            disabled={currentPage === totalPages}
          >
            Next
          </button>
          
        </div>
        </>
      }
    </div>


  );
}

export default Feed;
