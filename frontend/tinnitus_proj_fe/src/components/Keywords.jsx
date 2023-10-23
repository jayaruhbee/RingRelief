import React, { useState, useEffect } from "react";
import { api } from "../utilities";


const Keywords = () => {
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

   
    
      return (
        <div className="side-container flex-1 p-5">
          <div className="flex justify-end">
          </div>
          <div className="w-3/4 p-3 bg-white rounded-lg">
            <h2 id="topics-covered-title" className="topics-header text-2xl font-bold mb-4">Topics Covered in Research Articles:</h2>
            <ul id="topics-list">
              {keywordSuggestions.map((topic, index) => (
                <li id="indv-topic" key={index} className="inline-block bg-indigo-300 rounded-full m-1 text-lg capitalize">
                  {topic}
                </li>
              ))}
            </ul>
          </div>
        </div>
      );
}
export default  Keywords