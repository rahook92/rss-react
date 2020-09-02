import React from 'react';
import FeedCard from './FeedCard/FeedCard';
import classes from './Feed.css';


const feed = (props) => {


    const articles = props.articles.map(article => {
        return <FeedCard 
                    key={article.id} 
                    title={article.title}
                    content={article.content}
                    image={article.thumbnail}
                    articleURL={article.link}
                    shareClick={props.shareClick}
                    clicked={() => { props.clickHandler(article.id) }} />;
    })

    return (
        <div className={classes.Feed}>
            {articles}
        </div>
    );

}

export default feed;