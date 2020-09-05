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


    xmlURL = {
        'Complex' : {
            urls : {
                'All' : "https://cors-anywhere.herokuapp.com/assets.complex.com/feeds/channels/all.xml",
                'Music' : "https://cors-anywhere.herokuapp.com/assets.complex.com/feeds/channels/music.xml",
                'Culture' : "https://cors-anywhere.herokuapp.com/assets.complex.com/feeds/channels/pop-culture.xml"
            },
            getXML: (name, num, ext) => { this.getXML(name, num, ext) }
        },
        'Wired' : {
            urls : {
                'All' : "https://cors-anywhere.herokuapp.com/www.wired.com/feed",
                'Business' : "https://cors-anywhere.herokuapp.com/www.wired.com/category/business/feed",
                'Culture' : "https://cors-anywhere.herokuapp.com/www.wired.com/category/culture/feed",
                'Science' : "https://cors-anywhere.herokuapp.com/www.wired.com/category/science/feed"
            },
            getXML: (name, num, ext) => { this.getXML(name,num, ext) }          
        },
        'Rolling Stone' : {
            urls : {
                'All' : "https://cors-anywhere.herokuapp.com/www.rollingstone.com/feed",
                'Music' : "https://cors-anywhere.herokuapp.com/www.rollingstone.com/music/feed",
                'Culture' : "https://cors-anywhere.herokuapp.com/www.rollingstone.com/culture/feed",
                'Politics' : "https://cors-anywhere.herokuapp.com/www.rollingstone.com/politics/feed"
            },
            getXML: (name, num, ext) => { this.getXML(name, num, ext) }
        },
        'Salon' : {
            urls : {
                'All' : "https://cors-anywhere.herokuapp.com/www.salon.com/feed/",
                'Culture' : "https://cors-anywhere.herokuapp.com/www.salon.com/category/culture/feed",
                'Politics' : "https://cors-anywhere.herokuapp.com/www.salon.com/category/news-and-politics/feed",
                'Science' : "https://cors-anywhere.herokuapp.com/www.salon.com/category/science-and-health/feed"
            },
            getXML: (name, num, ext) => { this.getXML(name, num, ext) }
        },
        'Guardian' : {
            urls: {
                'All' : "https://cors-anywhere.herokuapp.com/www.theguardian.com/us/rss",
                'Sports' : "https://cors-anywhere.herokuapp.com/www.theguardian.com/us/sport/rss",
                'Culture' : "https://cors-anywhere.herokuapp.com/www.theguardian.com/us/culture/rss"
            },
            getXML: (name, num, ext) => { this.getXML(name, num, ext) }
        },
        'Huffpost' : {
            urls: {
                'All' : "https://cors-anywhere.herokuapp.com/www.huffpost.com/section/front-page/feed",
                'Business' : "https://cors-anywhere.herokuapp.com/www.huffpost.com/section/business/feed",
                'Science' : "https://cors-anywhere.herokuapp.com/www.huffpost.com/section/science/feed",
                'Politics' : "https://cors-anywhere.herokuapp.com/www.huffpost.com/section/politics/feed",
                'Culture' : "https://cors-anywhere.herokuapp.com/www.huffpost.com/section/arts/feed"
            },
            getXML: (name, num, ext) => { this.getXML(name, num, ext) }
        },
        'FiveThirtyEight' : {
            urls: {
                'All' : "https://cors-anywhere.herokuapp.com/fivethirtyeight.com/all/feed",
                'Politics' : "https://cors-anywhere.herokuapp.com/fivethirtyeight.com/politics/feed",
                'Sports' : "https://cors-anywhere.herokuapp.com/fivethirtyeight.com/sports/feed",
                "Science" : "https://cors-anywhere.herokuapp.com/fivethirtyeight.com/science/feed"
            },
            getXML: (name, num, ext) => { this.getXML(name, num, ext) }
        }

    }

    componentDidMount(){
        for(var key in this.xmlURL){
            this.xmlURL[key].getXML(key, 2, 'All');
        }
        // for(var key in this.xmlURL){
        //     this.myRes(this.xmlURL[key].url);
        // }
    }

    // myRes = (url) => {
    //     axios.get(url, {
    //         "Content-Type": "application/xml; charset=utf-8"
    //     }).then(res => {
    //         const xml = res.data;
    //         parseString(xml, (err,res)=>{
    //             const items = res;
    //             console.log(items);
    //         })
    //     })
    // }


    //Xml Request Function
    getXML = (name, num, ext = 'All') => {


        return axios.get(this.xmlURL[name].urls[ext], {
            "Content-Type": "application/xml; charset=utf-8"
        }).then(res => {
            let articles = [...this.state.articles];
            const xml = res.data;
            parseString(xml, (err,res)=>{
                const items = res.rss.channel[0].item.slice(0, num);
                items.forEach(item => {
                    articles.push({
                        id: Math.random() * 100,
                        title: item.title[0],
                        link: item.link[0],
                        thumbnail: item['media:thumbnail'] ? item['media:thumbnail'][0]['$'].url : null
                    })
                })
                this.setState({ articles: articles });
            })
        })
    
    }

    apiClickHandler = (rssName) => {

        this.setState( { articles: [] } );

        for(let key in this.xmlURL){
            if(key === rssName){

                this.xmlURL[key].getXML(key, 10);
                
            }
        }
      
    }

    getRecent = (ext) => {

        let articles = [];
        this.setState( {articles: articles} );

        for(var key in this.xmlURL){
            if(this.xmlURL[key].urls.hasOwnProperty(ext)){
                this.xmlURL[key].getXML(key, 2, ext);
            }
        }

    }

    clickHandler = (id) => {
        console.log('hiya');
    }

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
        } }, ()=>{
            console.log(this.state.sharing.url);
        });
    }

    render(){
        return (
            <div className={classes.MainContainer}>
                <Sidebar getRecent={this.getRecent} clicked={this.apiClickHandler} xmlRead={this.getXML} xmlURL={this.xmlURL} />
                <Feed articles={this.state.articles} clickHandler={this.clickHandler} shareClick={this.isSharing} />
                <Modal show={this.state.sharing.isSharing} url={this.state.sharing.url} noShow={this.notSharing} />
            </div>
        );
    }
}

export default Main;

