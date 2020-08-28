import React, { Component } from 'react';
import Sidebar from '../components/Sidebar/Sidebar';
import Feed from '../components/Feed/Feed';
import classes from '../App.css';
import axios from 'axios';

class Main extends Component {

    state = {
        articles: []
    };

    apiURL = {
        'Guardian' : {
            url : 'https://content.guardianapis.com/search?q=debates&api-key=7b5a7b66-3737-449a-b2a0-79ca9a5c87df',
            getReq : (x) => {


                        let articles = [...this.state.articles];

                    return axios.get('https://content.guardianapis.com/search?q=debates&api-key=7b5a7b66-3737-449a-b2a0-79ca9a5c87df')
                            .then( res => {

                                const results = res.data.response.results.slice(0,x);

                                results.forEach(article => {
                                    articles.push({
                                        id: article.id,
                                        title: article.webTitle,
                                        articleURL: article.webUrl,
                                        content: '',
                                        imageURL: ''
                                    })
                                })
                                this.setState({
                                    articles: articles
                                })
                            })
                        }
        },
        'NYTimes' : {
            url: 'https://api.nytimes.com/svc/mostpopular/v2/emailed/1.json?api-key=7IbMduQxatOsnd05SGCF3hDSxfuDuoGK',
            getReq: (x) => {

                let articles = [...this.state.articles];

            return axios.get('https://api.nytimes.com/svc/mostpopular/v2/emailed/1.json?api-key=7IbMduQxatOsnd05SGCF3hDSxfuDuoGK')
                    .then(res => {

                        const results = res.data.results.slice(0,x);


                        results.forEach(article => {
                            articles.push({
                                id: article.id,
                                title: article.title,
                                articleURL: article.url,
                                content: '',
                                imageURL: ''
                            });
                        })
                        this.setState({
                            articles: articles
                        })
                    })
                    .catch(error => {
                        throw error;
                    })
            }
        },
        'News' : {
            url : 'http://newsapi.org/v2/top-headlines?country=us&apiKey=eef5aaa4c3844fb4bfb128a03e72384c',
            getReq : (x) => {

            return axios.get('http://newsapi.org/v2/top-headlines?country=us&apiKey=eef5aaa4c3844fb4bfb128a03e72384c')
                    .then(res => {

                        var articles = [...this.state.articles];

                        const results = res.data.articles.slice(0,x);

                        results.forEach(article => {
                            articles.push({
                                id: article.id ? article.id : Math.random(),
                                title: article.title,
                                articleURL: article.url,
                                content: article.description,
                                imageURL: article.urlToImage
                            });
                        })
                        this.setState({
                            articles: articles
                        })
                    })
                    
            }
        }
    };

    // componentDidMount(){
    //     this.getRecent();
    // }

    getRecent = async() => {
        
        const guardian = await this.apiURL['Guardian'].getReq(2)
        const nyt = await this.apiURL['NYTimes'].getReq(2);
        const bbc = await this.apiURL['News'].getReq(2);

        return Promise.all( [guardian, nyt, bbc] );
    }

    clickHandler = (id) => {
        console.log('now that this is clicked, your feed component should take the post ID and update its state to reflect the fact that this post is selected and therefore display the rest of the content');
    }

    apiClickHandler = (api) => {

        for(let key in this.apiURL){
            if(key === api){

                this.apiURL[key].getReq(10);
                
            }
        }
      
    }

    render(){
        return (
            <div className={classes.MainContainer}>
                <Sidebar getRecent={this.getRecent} clicked={this.apiClickHandler} />
                <Feed articles={this.state.articles} clickHandler={this.clickHandler} />
            </div>
        );
    }
}

export default Main;

