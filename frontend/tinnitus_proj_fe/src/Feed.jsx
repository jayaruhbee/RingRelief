
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
    const {userInfo, setUserInfo} = useContext(userContext)
    const [filteredArticles, setFilteredArticles] = useState([]);
    const [filteredCurrentPage, setFilteredCurrentPage] = useState(1);
    const [isFiltered, setIsFiltered] = useState(false); 
    const [selectedKeyWord, setSelectedKeyWord ] = useState(null)

    const totalArticles = isFiltered ? filteredArticles.length : articles.length;
    const totalPages = Math.ceil(totalArticles / articlesPerPage);


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


  const filterArticlesByKeyword = (keyword) => {
    axios
      .get(`http://127.0.0.1:8000/api/article/filter/${keyword}`)
      .then((response) => {
        setFilteredArticles(response.data);
        setIsFiltered(true);
        setFilteredCurrentPage(1);
      })
      .catch((error) => {
        console.error('Error fetching filtered articles:', error);
      });

      setSelectedKeyWord(keyword)
  };

  const handleNextPage = () => {
    window.scrollTo(0, 0);
    if (isFiltered) {
        setFilteredCurrentPage(filteredCurrentPage + 1);
      } else {
        setCurrentPage(currentPage + 1);
      }
  };

  const handlePreviousPage = () => {
    window.scrollTo(0, 0);
    if (isFiltered) {
        setFilteredCurrentPage(filteredCurrentPage - 1);
      } else {
        setCurrentPage(currentPage - 1);
      }
  };

  const paginate = (data, page, perPage) => {
    const start = (page - 1) * perPage;
    const end = start + perPage;
    return data.slice(start, end);
  };

  const handleBackToAllArticles = () => {
  setIsFiltered(false);
  setSelectedKeyWord(null);
  setFilteredArticles([]);
  setFilteredCurrentPage(1);
  setCurrentPage(1);
  window.scrollTo(0, 0);
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

        <div id="display-article-p"> {isFiltered ?
        <>
            <p>
                Displaying articles based on keyword: "{selectedKeyWord}"
            </p>
            <p>
            {totalArticles} articles found
            </p>
        </>
            :
            <p>
                Displaying all articles:
            </p>
        }</div>

        <div className="article-list">
            {paginate(isFiltered ? filteredArticles : articles, isFiltered ? filteredCurrentPage : currentPage, articlesPerPage).map((article, index) => (
              <ArticleCard 
              key={uuidv4()} 
              article={article} 
              onKeywordClick={filterArticlesByKeyword} 
              size={index % 4 === 1 || index % 4 === 2 ? 'large' : 'small'}
              />
            ))}
          </div>

        {/* <div className="article-list">
            {paginate(articles, currentPage, articlesPerPage).map((article) => (
                <>
                <ArticleCard key={uuidv4()} article={article} />
                </>)
            )}
        </div> */}

        {totalArticles > 0 ?
        <>
        <div id="pagination-div">
            <button onClick={handlePreviousPage} disabled={isFiltered ? filteredCurrentPage === 1 : currentPage === 1}> 
            Previous
            </button>
            <span>Page {isFiltered ? filteredCurrentPage : currentPage} of {totalPages}</span>
            <button
                onClick={handleNextPage}
                disabled={isFiltered ? filteredCurrentPage === totalPages : currentPage === totalPages}
            >
            Next
            </button>
        </div>
        <button onClick={handleBackToAllArticles}>
            Back to All Articles
        </button>
        </>
        : 
        <>
            <button onClick={handleBackToAllArticles}>
            Back to All Articles
            </button>
        </>
        }


        </>
      }
    </div>


  );
}

export default Feed;
