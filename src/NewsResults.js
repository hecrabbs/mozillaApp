import React from "react";
import Card from "react-bootstrap/Card";

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
                        <Card.Subtitle></Card.Subtitle>
                        <Card.Text>{article.description}</Card.Text>
                    </Card.Body>
                </Card>
            ))}
        </div>
    )
}

export default NewsResults;