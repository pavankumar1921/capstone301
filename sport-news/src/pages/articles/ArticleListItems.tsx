import { useArticlesDispatch, useArticlesState } from "../../context/articles/context";
import React, { useState,useEffect } from "react";

export default function ArticleListItems() {
  const state: any = useArticlesState();
  const { articles, isLoading, isError, errorMessage } = state;
  const [selectedSport, setSelectedSport] = useState("All");
  let [sports, setSports] = useState<string[]>([]);

  useEffect(() => {
    if (articles) {
      const uniqueSports = [...new Set(articles.map((article: any) => article.sport.name))];
      setSports(uniqueSports);
    }
  }, [articles]);
  if (isLoading && articles.length === 0) {
    return <span>Loading ...</span>;
  }

  if (isError) {
    return <span>{errorMessage}</span>;
  }

  const filteredArticles = selectedSport === "All" ? articles : articles.filter((article: any) => article.sport.name === selectedSport);

  return (
    <div className="w-full p-4">
      <div className="mb-4">
        <label htmlFor="sportFilter">Filter by Sport: </label>
        <select
          id="sportFilter"
          onChange={(e) => setSelectedSport(e.target.value)}
          value={selectedSport}
        >
          <option value="All">All</option>
          {sports.map((sport) => (
            <option key={sport} value={sport}>
              {sport}
            </option>
          ))}
        </select>
      </div>
      <div className="flex flex-col gap-3">
        {filteredArticles && filteredArticles.length > 0 ? (
          filteredArticles.map((article: any) => (
            <div key={article.id} className="border rounded-lg shadow-lg p-4">
              <h5 className="font-semibold">{article.sport.name}</h5>
              <h4 className="text-gray-500">{article.title}</h4>
              <p>{article.summary}</p>
            </div>
          ))
        ) : (
          <span>No articles available for the selected sport.</span>
        )}
      </div>
    </div>
  );
}

