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
            getXML: (x) => {

                return axios.get("https://cors-anywhere.herokuapp.com/assets.complex.com/feeds/channels/pop-culture.xml", {
                    "Content-Type": "application/xml; charset=utf-8"
                }).then(res => {
                    let articles = [...this.state.articles];
                    const xml = res.data;
                    parseString(xml, (err,res)=>{
                        const items = res.rss.channel[0].item.slice(0, x);
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
        }
    }

    componentDidMount(){
        this.getRecent();
    }

    getRecent = async() => {

        let articles = [];
        this.setState( {articles: articles} );
        
        const complex = await this.xmlURL['Complex'].getXML(2)
        // const nyt = await this.apiURL['NYTimes'].getReq(2);
        // const bbc = await this.apiURL['News'].getReq(2);

        return Promise.all( [complex] );
    }

    clickHandler = (id) => {
        console.log('now that this is clicked, your feed component should take the post ID and update its state to reflect the fact that this post is selected and therefore display the rest of the content');
    }

    apiClickHandler = (rssName) => {

        this.setState( { articles: [] } );

        for(let key in this.xmlURL){
            if(key === rssName){

                this.xmlURL[key].getXML(10);
                
            }
        }
      
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
                <Sidebar getRecent={this.getRecent} clicked={this.apiClickHandler} xmlRead={this.getXML} />
                <Feed articles={this.state.articles} clickHandler={this.clickHandler} shareClick={this.isSharing} />
                <Modal show={this.state.sharing.isSharing} url={this.state.sharing.url} noShow={this.notSharing} />
            </div>
        );
    }
}

export default Main;

