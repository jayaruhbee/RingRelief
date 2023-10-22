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
            <h2 className="topics-header montserrat text-2xl font-bold mb-4 underline">Topics Covered in Research Articles</h2>
            <ul>
              {keywordSuggestions.map((topic, index) => (
                <li key={index} className="hind inline-block p-2 bg-indigo-300 rounded-full m-1 text-lg capitalize">
                  {topic}
                </li>
              ))}
            </ul>
          </div>
        </div>
      );
}
export default  Keywords