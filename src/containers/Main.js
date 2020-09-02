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
        }
    }

    componentDidMount(){
        this.getRecent();
        this.myRes();
    }

    myRes = () => {
        axios.get("https://cors-anywhere.herokuapp.com/www.salon.com/feed/", {
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
                        thumbnail: 'https://images.fineartamerica.com/images/artworkimages/mediumlarge/1/cute-chick-laura-mountainspring.jpg'
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

    getRecent = async() => {

        let articles = [];
        this.setState( {articles: articles} );
        
        const complex = await this.xmlURL['Complex'].getXML('Complex', 2)
        const wired = await this.xmlURL['Wired'].getXML('Wired', 2);
        const rollingStone = await this.xmlURL['Rolling Stone'].getXML('Rolling Stone', 2);
        const salon = await this.xmlURL['Salon'].getXML('Salon', 2);

        return Promise.all( [complex, wired, rollingStone, salon] );
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

