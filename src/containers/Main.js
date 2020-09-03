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
            url : "https://cors-anywhere.herokuapp.com/assets.complex.com/feeds/channels/pop-culture.xml",
            getXML: (name,num) => { this.getXML(name,num) }
        },
        'Wired' : {
            url : "https://cors-anywhere.herokuapp.com/www.wired.com/feed/rss",
            getXML: (name,num) => { this.getXML(name,num) }          
        },
        'Rolling Stone' : {
            url : "https://cors-anywhere.herokuapp.com/www.rollingstone.com/music/feed",
            getXML: (name,num) => { this.getXML(name,num) }
        },
        'Salon' : {
            url : "https://cors-anywhere.herokuapp.com/www.salon.com/feed/",
            getXML: (name,num) => { this.getXML(name,num) }
        },
        'Guardian' : {
            url: "https://cors-anywhere.herokuapp.com/www.theguardian.com/us/rss",
            getXML: (name,num) => { this.getXML(name,num) }
        },
        'Huffpost' : {
            url: "https://cors-anywhere.herokuapp.com/www.huffpost.com/section/front-page/feed",
            getXML: (name,num) => { this.getXML(name,num) }
        },
        'FiveThirtyEight' : {
            url: "https://cors-anywhere.herokuapp.com/fivethirtyeight.com/all/feed",
            getXML: (name,num) => { this.getXML(name,num) }
        }

    }

    componentDidMount(){
        this.getRecent();
        // for(var key in this.xmlURL){
        //     this.myRes(this.xmlURL[key].url);
        // }
    }

    myRes = (url) => {
        axios.get(url, {
            "Content-Type": "application/xml; charset=utf-8"
        }).then(res => {
            const xml = res.data;
            parseString(xml, (err,res)=>{
                const items = res;
                console.log(items);
            })
        })
    }

    

    // thumb = item['media:thumbnail'][0]['$'].url;

    //Xml Request Function
    getXML = (name,num) => {

        return axios.get(this.xmlURL[name].url, {
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

    getRecent = () => {

        let articles = [];
        this.setState( {articles: articles} );

        for(var key in this.xmlURL){
            this.xmlURL[key].getXML(key, 2)
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
        } });
    }

    render(){
        return (
            <div className={classes.MainContainer}>
                <Sidebar getRecent={this.getRecent} clicked={this.apiClickHandler} xmlRead={this.getXML} xmlURL={this.xmlURL}/>
                <Feed articles={this.state.articles} clickHandler={this.clickHandler} shareClick={this.isSharing} />
                <Modal show={this.state.sharing.isSharing} url={this.state.sharing.url} noShow={this.notSharing} />
            </div>
        );
    }
}

export default Main;

