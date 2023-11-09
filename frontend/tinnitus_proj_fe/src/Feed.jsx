
import React, { useEffect, useState,useContext } from 'react';
import axios from 'axios';
import './App.css';
import ArticleCard from './ArticleCard';
import { v4 as uuidv4 } from 'uuid'; 
import './Feed.css'
import userContext from './context/themeContext';
import { api } from "./utilities";

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
    const [llmResult, setLLMResult] = useState('');
    const [roleSelected, setRoleSelected] = useState(false);
    const [showButtons, setShowButtons] = useState(null);

    const totalArticles = isFiltered ? filteredArticles.length : articles.length;
    const totalPages = Math.ceil(totalArticles / articlesPerPage);

    const [keywordSuggestions, setKeywordSuggestions] = useState([])

    useEffect(() => {
        const getKeywords = async () => {
          try {
            const response = await api.get("article/keyword_set");
            // console.log("response", response.data);
            setKeywordSuggestions(response.data);
          } catch (error) {
            console.error("⛔️", error);
          }
        };
    
        getKeywords();
      }, []);


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

  useEffect(() => {
    if (selectedKeyWord) {
      if (!roleSelected){
        setShowButtons(
          <div id="choose-represents">
            <p>Please choose what best represents you. I am... </p>

            <button className='representsBtn' onClick={() => handleRoleSelection('researcher', selectedKeyWord)}>Researching</button>

            <button className='representsBtn' onClick={() => handleRoleSelection('personWithTinnitus', selectedKeyWord)}>Coping with Tinnitus</button>

            <button className='representsBtn' onClick={() => handleRoleSelection('explorer', selectedKeyWord)}>Just Exploring</button>
          </div>
        );
      } else { 
          const requestData = {
            query: [
              {
                query: `How is ${selectedKeyWord} related to Tinnitus?`,
                start: 0,
                numResults: 10,
                contextConfig: {
                  charsBefore: 0,
                  charsAfter: 0,
                  sentencesBefore: 2,
                  sentencesAfter: 2,
                  startTag: '<b>',
                  endTag: '</b>',
                },
                corpusKey: [
                  {
                    customerId: 0,
                    corpusId: 3,
                    semantics: 'DEFAULT',
                    dim: [],
                    metadataFilter: "",
                    lexicalInterpolationConfig: {
                      lambda: 0.025,
                    },
                  },
                ],
                rerankingConfig: {
                  rerankerId: 272725717,
                },
                summary: [
                  {
                    summarizerPromptName: 'vectara-summary-ext-v1.2.0',
                    maxSummarizedResults: 5,
                    responseLang: 'eng',
                    },
                  ],
                },
              ],
          };

          const config = {
            method: 'post',
            maxBodyLength: Infinity,
            url: 'https://api.vectara.io/v1/query',
            headers: {
              'Content-Type': 'application/json',
              'Accept': 'application/json',
              'customer-id': '323484973',
              'x-api-key': 'zwt_E0f9LaKsH6mqcFbDXZ-5sboMHTKpRKbK0KzJhg',
            },
            data: JSON.stringify(requestData),
          };

          axios(config)
            .then((response) => {
              console.log("Called");
                // Example function to display the source in a bubble
              const summaryText = response.data.responseSet[0].summary[0].text;
              const responseList = response.data.responseSet[0].response;
              
              const titleTextPairs = {};

              responseList.forEach((response, index) => {
                const titleMetadata = response.metadata.find(metadata => metadata.name === 'title');
                const title = titleMetadata ? titleMetadata.value : null;
            
                titleTextPairs[index + 1] = { title, text: response.text };
              });
            
              const numberPattern = /\[(\d+)\]/g;
              const formattedText = summaryText.replace(numberPattern, (match, number) => {
                const pair = titleTextPairs[number];
                return `${match} source{<b><h2>${pair.title}</h2></b><br>"${pair.text}"}`;    
              });
              setLLMResult(formattedText);
            })
            .catch((error) => {
              console.error('Error fetching LLM result:', error);
          });
        }
      }
    }, [selectedKeyWord, roleSelected]);

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
  setLLMResult('');
  setRoleSelected(false);
  window.scrollTo(0, 0);
};

const handleKeywordClick = (keyword) => {
    const cleanKeyword = keyword.replace(/['"]+/g, '');
    filterArticlesByKeyword(cleanKeyword);
  };

  const showSource = (sourceContent) => {
    // Create a modal element
    const modal = document.createElement("div");
    modal.className = "modal";
  
    // Create a close button
    const closeButton = document.createElement("button");
    closeButton.textContent = "Close";
    closeButton.className = "close-button";
    closeButton.addEventListener("click", () => closeModal(modal));
  
    // Create a content container with dangerouslySetInnerHTML
    const contentContainer = document.createElement("div");
    contentContainer.innerHTML = sourceContent;
    contentContainer.innerHTML += `<br><br><div style="font-size: small; position: absolute; bottom: 0; left: 15px;"><a href="https://link.springer.com/book/10.1007/978-1-4614-3728-4" target="_blank"><i>Springer Handbook of Auditory Research</i></a></div>`;
  
    // Append close button and content to the modal
    modal.appendChild(closeButton);
    modal.appendChild(contentContainer);
  
    // Append the modal to the document body
    document.body.appendChild(modal);
  };  

  const closeModal = (modal) => {
    // Remove the modal from the document body
    document.body.removeChild(modal);
  };

  const handleRoleSelection = (selectedRole, selectedKeyWord) => {
    setRoleSelected(true);
    setShowButtons(null);

    let newQuery = `Tell me more about ${selectedKeyWord} and how it relates to tinnitus.`;
    let newCorpusId = 3;
    let newSemantics = 'DEFAULT';
    let newLambda = 0.025;
    let numResults = 10;
  
    // Adjust values based on the selected role
    if (selectedRole === 'researcher') {
      newLambda = 0.8;
    }
    if (selectedRole === 'personWithTinnitus') {
      numResults = 20;
      newLambda = 0;
    }
    if (selectedRole === 'explorer') {
      numResults = 15;
    }
  }
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
        <br></br>
        Click on any keyword to filter by that keyword.
        </p>
        <div id="display-article-p"> {isFiltered ?
        <>
            <p>
                Displaying articles based on keyword: "<span id="selected-kw-bold">{selectedKeyWord}</span>"
            </p>
            <p>
            {totalArticles} articles found
            </p>
            <p id="llm-display-p">
            <br></br>
            {showButtons}
            {llmResult ? (
              <div id="llm-result-container">
                {llmResult.split(/(\[\d+\] source{[^}]+})/).map((part, index) => {
                  if (/\[\d+\] source{[^}]+}/.test(part)) {
                    const number = part.match(/\[(\d+)\]/)[1];
                    const sourceContent = part.match(/source{([^}]+)}/)[1];
                    return (
                      <button
                        key={index}
                        className='source'
                        onClick={() => showSource(sourceContent)}
                      >
                        {number}
                      </button>
                    );
                  } else {
                    return <span key={index}>{part}</span>;
                  }
                })}
              </div>
            )
          :
          roleSelected ? <div class="loader"></div> : ""
          }



            </p>

        </>
            :
            <p>
                Displaying all articles:
            </p>
        }</div>
   <div id="feed-main-wrapper">
        <div id="suggested-keywords-feed">
            Suggested Keywords:
        <ul id="topics-list">
              {keywordSuggestions.map((topic, index) => (
                <li id="indv-topic" key={index} className="inline-block bg-indigo-300 rounded-full m-1 text-lg capitalize">
                  {/* {topic} */}
                  <a
                href="#"
                onClick={() => handleKeywordClick(topic)}
              >
                  #{topic.replace(/['"]+/g, '')}
              </a>
                </li>
              ))}
        </ul>
        </div>

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
</div>
        {totalArticles > 0 ?
        <>
        <div id="pagination-div">
            <button className="button-css" onClick={handlePreviousPage} disabled={isFiltered ? filteredCurrentPage === 1 : currentPage === 1}> 
            Previous
            </button>
            <span>Page {isFiltered ? filteredCurrentPage : currentPage} of {totalPages}</span>
            <button
                className="button-css"
                onClick={handleNextPage}
                disabled={isFiltered ? filteredCurrentPage === totalPages : currentPage === totalPages}
            >
            Next
            </button>
        </div>
        <button className="button-css" onClick={handleBackToAllArticles}>
            Back to All Articles
        </button>
        </>
        : 
        <>
            <button className="button-css" onClick={handleBackToAllArticles}>
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
