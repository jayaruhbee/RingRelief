import React from 'react';
import './ArticleCard.css'

function ArticleCard({ article }) {
  return (
    <div className="article-card">
      <h2>{article.title}</h2>
      <p>
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
        <strong>Keywords:</strong>
        <div className="keywords-wrapper-div" >
        {article.ai_keywords.map((keyword, index) => (
          <div key={index} className="keyword">
              {keyword.replace(/['"]+/g, '')}
          </div>
        ))}
        </div>
      </div>
      <a href={article.link} target="_blank" rel="noopener noreferrer">
        Read More
      </a>
    </div>
  );
}

export default ArticleCard;
