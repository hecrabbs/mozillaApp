import React from "react";
import Card from "react-bootstrap/Card";


const API_KEY = `&apiKey=bbdaee4b911644a796017954f3f1362a`;
const URL = `https://newsapi.org/v2/everything?sortBy=relevancy&q=`;

function searchArticles(name) {
  let req = `${URL}${name}${API_KEY}`;
  if (name) {
    return fetch(req).then(response => {
      return response.json();
    });
  }
}

function NewsResults(props) {
  const style = {
    width: 150
  };
  return (
    <div className="newsResults">
      {props.results && props.results.map(article => (
        <Card key={article.url}>
          <Card.Body>
            <Card.Img
              variant="top"
              style={style}
              src={article.urlToImage}
            />
            <Card.Title>
              <Card.Link href={article.url} target="_blank">
                {article.title}
              </Card.Link>
            </Card.Title>
            <Card.Text>{article.description}</Card.Text>
          </Card.Body>
        </Card>
      ))}
    </div>
  )
}

export { searchArticles };
export default NewsResults;
