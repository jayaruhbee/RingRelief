import React from 'react';
import './ArticleCard.css'

function ArticleCard({ article, onKeywordClick, size }) {

    const cardClass = size === 'large' ? 'large-card' : 'small-card';

    const handleKeywordClick = (keyword) => {
        const cleanKeyword = keyword.replace(/['"]+/g, '');
        onKeywordClick(cleanKeyword);
      };

  return (
    <div className={`article-card ${cardClass}`} >
      <h2 id="article-title">{article.title}</h2>
      <p id="authors-p">
        <strong>Authors:</strong> {article.authors}
      </p>
      <div className='pub-title-year-wrapper'>
        <p>
            <strong>Publication Title:</strong> {article.publication_title}
        </p>
        <p>
            <strong>Publication Year:</strong> {article.publication_year}
        </p>
      </div>
      <p>
        <strong>Abstract:</strong> {article.ai_abstract_summary}
      </p>
      <div >
        <strong><p id="keywords-strong">Keywords:</p></strong>
        <div className="keywords-wrapper-div" >
        {article.ai_keywords.map((keyword, index) => (
          <div key={index} className="keyword">
               <a
                href="#"
                onClick={() => handleKeywordClick(keyword)}
              >
                  #{keyword.replace(/['"]+/g, '')}
              </a>
            
          </div>
        ))}
        </div>
      </div>
      <div id="readMore-div-wrapper">
        <div id="readMore-div">
      <a href={article.link} target="_blank" rel="noopener noreferrer">
        Read More →
      </a>
      </div>
      </div>
    </div>
  );
}

export default ArticleCard;
