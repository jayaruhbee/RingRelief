import React, {useContext} from "react";
import './Home.css';
import landingImg from './images/LandingTest.jpg'
import TinnitusDashboard from './images/TinnitusDashboard.png'
import TinnitusDashboard2 from './images/TinnitusDashboard2.png'
import computerMockUp from './images/computerMockUp.png'
import tinnitusArticleGif from './images/tinnitusArticleGif.gif'
import tinnitusForum from './images/TinnitusSupportForum.png'
import medimap1 from './images/medimap1.png'
import medimap2 from './images/medimap2.png'

const Home = () =>{


    return(
        
        <div id="home-wrapper">
            <div id="landingimg-wrapper-1">
                <div id="slogan-wrapper">
                    <h2 id="slogan"> Your <span id="h2-col-chg">Health,</span> Your <span id="h2-col-chg">Way</span></h2>
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

                <div id="tinnitus-wrapper">
                    <h3 id="tinnitus-title">You Are Not Alone</h3>
                    <p id="tinnitus-sub-title">Our journey began with the frustration of unexplored medical territories, just like tinnitus. Our team member's experience is your inspiration. Together, we're unveiling the mysteries of your health concerns, starting with tinnitus.</p>
                </div>

                <img src={TinnitusDashboard} id="tinnitusimg" alt="tinnitusimg"></img>

            </div>

            <div id="tinnitus-wrapper-2-1">

            <div id="tinnitus-wrapper2">
                <h3 id="tinnitus-title2">Pre and Post Rehabilitation Intervention Data</h3>
                <p id="tinnitus-sub-title2">Discover the power of transformation with our "Pre and Post Rehabilitation Intervention" data. Explore how tinnitus can improve and get inspired to take control of your journey. Start your research here and see the potential for positive change.</p>
            </div>

            <img src={TinnitusDashboard2} id="tinnitusimg2" alt="tinnitusimg2"></img>

            </div>

            <div id="details-wrapper-3">
                <div id="details-1">
                <div id="mock-up-wrapper">
                    <img src={computerMockUp} id="articlefeedmockup" alt="articlefeedmockup"></img>
                    <img src ={tinnitusArticleGif} id="tinnitusArticleGif" alt="tinnitusArticleGif"></img>
                </div>

                    <div id="articlefeed-wrapper">
                        <h3 id="articlefeed-title"> Your Personalized Article Feed</h3>
                        <p id="articlefeed-desc">With our AI-driven technology, we simplify complex research papers to provide you with summaries, keywords, and insights tailored to your concerns. Your personalized health feed keeps you up to date with the latest advancements.</p>
                    </div>
                </div>
            </div>

            <div id="details-wrapper-4"> 
                <div id="details-2">
                        <h3 id="support-forum-title">
                        Join the Conversation - Tinnitus Support Forum
                        </h3>
                        <p id="support-forum-desc">
                        Our Tinnitus Support Forum is a safe space where you can freely discuss, find support, and share your unique journey with tinnitus. Whether you're looking for insights on possible connections between headaches and tinnitus, tips to increase your sleep quality, or ways to maintain good ear health, this forum is your go-to destination.
                        Engage with our community to explore topics like sound sensitivity, discover coping strategies that truly work. Join us in making a difference by contributing to meaningful conversations and connecting with others who understand your tinnitus experiences.       
                        </p>
                    <img id="tinnitusForum" src ={tinnitusForum}></img>
                </div>
            </div>

            <div id="details-wrapper-5">
                <img id="medimapscreenshot1" src ={medimap1}></img>
                <img id="medimapscreenshot2" src ={medimap2}></img>
                <div>
                        <h3 id="medimap-title">
                        Your Tinnitus Story Matters - Welcome to MediMap
                        </h3>
                        <p id="medimap-desc">
                        Share your story with us - when it all started, the doctors you've seen, the treatments you've explored, and how tinnitus has woven its way into your life.
                        By opening up about your experiences, you help us create a personalized medical history flowchart tailored to your path. This comprehensive tool is designed to assist you in tracking your tinnitus, provide valuable insights for your healthcare provider, and support your quest for relief. Your story is the key to unlocking your tinnitus's secrets, so let's start mapping your journey together.
                        </p>
                </div>
                  
            </div>


        </div>
        
    )
}

export default Home;