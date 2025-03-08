import React, { useState } from 'react';
import { Menu, Twitter } from 'lucide-react';
import './TwitterSentimentDashboard.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faVoteYea, faGlobe } from '@fortawesome/free-solid-svg-icons';
import { BrowserRouter as Router, Route, Routes, useNavigate } from 'react-router-dom';
import ElectionPrediction from './election-sentiment/election-prediction';
import WorldLeader from './world-leader-sentiment/world-leader-sentiment';

const FeatureCard = ({ title, icon, onClick }) => (
  <div className="feature-card" onClick={onClick}>
    <div className="feature-card-content">
      <h3 className="feature-title">{title}</h3>
      <div className="feature-icon">{icon}</div>
    </div>
  </div>
);

const Tweet = ({ image }) => (
  <div className="tweet">
    {image && (
      <div className="tweet-image-container">
        <img src={image} alt="Tweet content" className="tweet-image" />
      </div>
    )}
  </div>
);

const Dashboard = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const navigate = useNavigate();  // Use the useNavigate hook

  const randomTweetImage = () => `/images/tweet${Math.floor(Math.random() * 10) % 3 + 1}.png`;

  const trendingTweets = [
    {
      id: 1,
      image: randomTweetImage()
    },
    {
      id: 2,
      image: randomTweetImage()
    }
  ];

  const navigateTo = (url) => {
    navigate(url);  // Use navigate instead of window.location.href
  };

  return (
    <div className="dashboard-container">
      <header className="dashboard-header">
        <button onClick={() => setIsMenuOpen(!isMenuOpen)} className="menu-button">
          <Menu size={32} />
        </button>
        <h1 className="dashboard-title">Twitter Sentiment Analysis</h1>
        <div className="header-spacer"></div>
      </header>
      <main className="dashboard-main">
        <div className="feature-grid">
          <FeatureCard
            title="Election Sentiments"
            icon={<FontAwesomeIcon icon={faVoteYea} size="4x" />}
            onClick={() => navigateTo('./election-prediction')}
          />
          <FeatureCard
            title="World Leader Sentiments"
            icon={<FontAwesomeIcon icon={faGlobe} size="4x" />}
            onClick={() => navigateTo('./world-leader-sentiment')}
          />
        </div>
        <div className="divider">
          <div className="divider-dot"></div>
          <div className="divider-dot"></div>
          <div className="divider-dot"></div>
        </div>
        <div className="trending-tweets-section">
          <div className="section-header">
            <h3 className="section-subtitle">Trending Tweets</h3>
            <Twitter size={28} className="twitter-icon" />
          </div>
          <div className="tweets-grid">
            {trendingTweets.map(tweet => <Tweet key={tweet.id} {...tweet} />)}
          </div>
        </div>
      </main>
    </div>
  );
};

const App = () => (
  <Router>
    <Routes>
      <Route path="/" element={<Dashboard />} />
      <Route path="/election-prediction" element={<ElectionPrediction />} />
      <Route path="/world-leader-sentiment" element={<WorldLeader />} />
    </Routes>
  </Router>
);

export default App;
