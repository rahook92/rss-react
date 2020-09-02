import React, { Component } from 'react';
import Sidebar from '../components/Sidebar/Sidebar';
import Feed from '../components/Feed/Feed';
import Modal from '../components/Modal/Modal';
import classes from '../App.css';
import axios from 'axios';
const parseString  = require('xml2js').parseString;

class Main extends Component {

    state = {
        articles: [],
        sharing: {
            isSharing: false,
            url: null
        }
    };

    // apiURL = {
    //     'Guardian' : {
    //         url : 'https://content.guardianapis.com/search?q=debates&api-key=7b5a7b66-3737-449a-b2a0-79ca9a5c87df',
    //         getReq : (x) => {


    //                 return axios.get('https://content.guardianapis.com/search?q=debates&api-key=7b5a7b66-3737-449a-b2a0-79ca9a5c87df')
    //                         .then( res => {

    //                             let articles = [...this.state.articles];

    //                             const results = res.data.response.results.slice(0,x);

    //                             results.forEach(article => {
    //                                 articles.push({
    //                                     id: article.id,
    //                                     title: article.webTitle,
    //                                     articleURL: article.webUrl,
    //                                     content: '',
    //                                     imageURL: ''
    //                                 })
    //                             })
    //                             this.setState({
    //                                 articles: articles
    //                             })
    //                         })
    //                     }
    //     },
    //     'NYTimes' : {
    //         url: 'https://api.nytimes.com/svc/mostpopular/v2/emailed/1.json?api-key=7IbMduQxatOsnd05SGCF3hDSxfuDuoGK',
    //         getReq: (x) => {

    //         return axios.get('https://api.nytimes.com/svc/mostpopular/v2/emailed/1.json?api-key=7IbMduQxatOsnd05SGCF3hDSxfuDuoGK')
    //                 .then(res => {

    //                     let articles = [...this.state.articles];

    //                     const results = res.data.results.slice(0,x);


    //                     results.forEach(article => {
    //                         articles.push({
    //                             id: article.id,
    //                             title: article.title,
    //                             articleURL: article.url,
    //                             content: '',
    //                             imageURL: ''
    //                         });
    //                     })
    //                     this.setState({
    //                         articles: articles
    //                     })
    //                 })
    //                 .catch(error => {
    //                     throw error;
    //                 })
    //         }
    //     },
    //     'News' : {
    //         url : 'http://newsapi.org/v2/top-headlines?country=us&apiKey=eef5aaa4c3844fb4bfb128a03e72384c',
    //         getReq : (x) => {

    //         return axios.get('http://newsapi.org/v2/top-headlines?country=us&apiKey=eef5aaa4c3844fb4bfb128a03e72384c')
    //                 .then(res => {

    //                     var articles = [...this.state.articles];

    //                     const results = res.data.articles.slice(0,x);

    //                     results.forEach(article => {
    //                         articles.push({
    //                             id: article.id ? article.id : Math.random(),
    //                             title: article.title,
    //                             articleURL: article.url,
    //                             content: article.description,
    //                             imageURL: article.urlToImage
    //                         });
    //                     })
    //                     this.setState({
    //                         articles: articles
    //                     })
    //                 })
                    
    //         }
    //     }
    // };

    // componentDidMount(){
    //     this.getRecent();
    // }

    getXML = () => {

        axios.get("https://cors-anywhere.herokuapp.com/assets.complex.com/feeds/channels/pop-culture.xml", {
            "Content-Type": "application/xml; charset=utf-8"
        }).then(res => {
            let articles = [];
            const xml = res.data;
            parseString(xml, (err,res)=>{
                const items = res.rss.channel[0].item;
                console.log(items);
                items.forEach(item => {
                    articles.push({
                        id: Math.random() * 100,
                        title: item.title[0],
                        link: item.link[0],
                        thumbnail: item['media:thumbnail'][0]['$'].url
                    })
                })
                this.setState({ articles: articles });
            })
        })
    
    }

    // getRecent = async() => {

    //     let articles = [];
    //     this.setState( {articles: articles} );
        
    //     const guardian = await this.apiURL['Guardian'].getReq(2)
    //     const nyt = await this.apiURL['NYTimes'].getReq(2);
    //     const bbc = await this.apiURL['News'].getReq(2);

    //     return Promise.all( [guardian, nyt, bbc] );
    // }

    clickHandler = (id) => {
        console.log('now that this is clicked, your feed component should take the post ID and update its state to reflect the fact that this post is selected and therefore display the rest of the content');
    }

    // apiClickHandler = (api) => {

    //     this.setState( { articles: [] } );

    //     for(let key in this.apiURL){
    //         if(key === api){

    //             this.apiURL[key].getReq(10);
                
    //         }
    //     }
      
    // }

    notSharing = () => {
        this.setState({ sharing: {
            isSharing: false,
            url: null
        } });
    }

    isSharing = (url) => {
        this.setState({ sharing: {
            isSharing: true,
            url: url
        } });
    }

    render(){
        return (
            <div className={classes.MainContainer}>
                <Sidebar getRecent={this.getRecent} clicked={this.apiClickHandler} xmlRead={this.getXML} />
                <Feed articles={this.state.articles} clickHandler={this.clickHandler} shareClick={this.isSharing} />
                <Modal show={this.state.sharing.isSharing} url={this.state.sharing.url} noShow={this.notSharing} />
            </div>
        );
    }
}

export default Main;

