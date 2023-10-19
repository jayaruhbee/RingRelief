import React, {useContext} from "react";
import './Home.css';
import landingImg from './images/LandingTest.jpg'
import tinnitusImg from './images/tinittusImg.png'
import computerMockUp from './images/computerMockUp.png'

const Home = () =>{


    return(
        
        <div id="home-wrapper">
            <div id="landingimg-wrapper-1">
                <div id="slogan-wrapper">
                    <h2 id="slogan"> Your Health, Your Way</h2>
                    <p id="subslogan">Join a community driven by women, for women, and take control of your health journey. Say goodbye to feeling unheard or overlooked. We're here to empower you by providing a bridge between cutting-edge research and your daily life.</p>
                </div>
                <img src={landingImg} alt="landingimg" id="landingimg">
                </img>
            </div>

            <div id="about-wrapper-2">
                <div id="about-1">
                    <h3 id="about-1-title">
                    Discover:
                    </h3>
                    <p id="about-1-desc">
                    Discovering the latest research has never been easier. With just a click, you can unlock a world of knowledge tailored to your specific health concerns. Our powerful AI-driven technology simplifies complex research papers into accessible summaries, providing you with insights that are easy to understand. Stay informed, stay empowered.
                    </p>
                </div>
                <div id="about-2">
                <h3 id="about-2-title">
                    Connect:
                    </h3>
                    <p id="about-2-desc">
                    At =========, we understand that navigating health challenges can sometimes be a lonely journey. That's why we've created a vibrant and supportive community of women who share your struggles. Here, you'll find a safe space to connect with others who truly understand what you're going through. Join discussions, make friends, and feel the strength of collective wisdom.
                    </p>
                </div>
                <div id="about-3">
                <h3 id="about-3-title">
                    Share:
                    </h3>
                    <p id="about-3-desc">
                    Your experiences and insights are invaluable. It's time to be heard and make a difference. Share your own journey, contribute your knowledge, and inspire others with your story. The power of sharing is immeasurable, and by doing so, you're not only helping yourself but also uplifting the entire community. Together, we're shaping the future of women's health.
                    </p>
                </div>
            </div>

            <div id="tinnitus-wrapper-2">
                <img src={tinnitusImg} id="tinnitusimg" alt="tinnitusimg"></img>

                <div id="tinnitus-wrapper">
                    <h3 id="tinnitus-title"> Tinnitus Unveiled</h3>
                    <p id="tinnitus-sub-title">Our journey began with the frustration of unexplored medical territories, just like tinnitus. Our team member's experience is your inspiration. Together, we're unveiling the mysteries of your health concerns, starting with tinnitus.</p>
                </div>
            </div>

            <div id="details-wrapper-3">
                <div id="details-1">
                    <img src={computerMockUp} id="articlefeedmockup" alt="articlefeedmockup"></img>

                    <div id="articlefeed-wrapper">
                        <h3 id="articlefeed-title"> Your Personalized Article Feed</h3>
                        <p id="articlefeed-title">With our AI-driven technology, we simplify complex research papers to provide you with summaries, keywords, and insights tailored to your concerns. Your personalized health feed keeps you up to date with the latest advancements.</p>
                    </div>
                </div>

                <div id="details-2">
                    
                </div>

                <div id="details-3">
                    
                </div>


            </div>

        </div>
        
    )
}

export default Home;