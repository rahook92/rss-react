import React, { Component } from 'react';
import FeedCard from './FeedCard/FeedCard';
import classes from './Feed.css';
import axios from 'axios';


class Feed extends Component {

    state = {
        articles: []
    };

    componentDidMount(){

        let articles = [];

        axios.get('https://content.guardianapis.com/search?q=debates&api-key=7b5a7b66-3737-449a-b2a0-79ca9a5c87df')
        .then( res => {
            const article = res.data.response.results.slice(0,1);
            articles.push({
                id: article[0].id,
                title: article[0].webTitle,
                content: '',
                imageURL: ''
            })
            this.setState({
                articles: articles
            })
        })

        axios.get('https://api.nytimes.com/svc/mostpopular/v2/emailed/1.json?api-key=7IbMduQxatOsnd05SGCF3hDSxfuDuoGK')
        .then(res => {
            const article = res.data.results.slice(0,1);
            articles.push({
                id: article[0].id,
                title: article[0].title,
                content: '',
                imageURL: article[0].media[0].media-metadata[2].url
            });
            this.setState({
                articles: articles
            })
        })
        .catch(error => {
            throw error;
        })

        axios.get('http://newsapi.org/v2/top-headlines?country=us&apiKey=eef5aaa4c3844fb4bfb128a03e72384c')
        .then(res => {
            const article = res.data.articles.slice(0,1);
            articles.push({
                id: article[0].id ? article[0].id : Math.random(),
                title: article[0].title,
                content: article[0].description,
                imageURL: article[0].urlToImage
            });
            this.setState({
                articles: articles
            })
        })
        .catch(error => {
            throw error;
        })
    }

    clickHandler = (id) => {
        console.log('now that this is clicked, your feed component should take the post ID and update its state to reflect the fact that this post is selected and therefore display the rest of the content');
    }

    render(){

        const articles = this.state.articles.map(article => {
            return <FeedCard 
                        key={article.id} 
                        title={article.title}
                        content={article.content}
                        image={article.image}
                        clicked={() => { this.clickHandler(article.id) }} />;
        })

        return (
            <div className={classes.Feed}>
                {articles}
            </div>
        );
    }
}

export default Feed;