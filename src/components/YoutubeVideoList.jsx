// src/components/YoutubeVideoList.jsx
import React from 'react';
import { useEffect, useState } from 'react';
import axios from 'axios';

const YoutubeVideoList = ({ location }) => {
  const [videos, setVideos] = useState([]);

  useEffect(() => {
    if (!location) return;

    const fetchVideos = async () => {
      try {
        const res = await axios.get(
          `https://www.googleapis.com/youtube/v3/search`, {
          params: {
            part: 'snippet',
            q: location,
            key: process.env.REACT_APP_YOUTUBE_API_KEY,
            maxResults: 3,
          }
        });
        setVideos(res.data.items);
      } catch (err) {
        console.error("Failed to fetch videos:", err);
      }
    };

    fetchVideos();
  }, [location]);

  return (
    <div className="mt-6">
      <h2 className="text-xl font-bold mb-2">YouTube Videos for {location}</h2>
      <div className="grid grid-cols-1 gap-4">
        {videos.map(video => (
          <iframe
            key={video.id.videoId}
            width="100%"
            height="250"
            src={`https://www.youtube.com/embed/${video.id.videoId}`}
            title={video.snippet.title}
            allowFullScreen
          />
        ))}
      </div>
    </div>
  );
};

export default YoutubeVideoList;
