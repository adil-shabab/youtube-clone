import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { SafeAreaView, Text, Image } from 'react-native';

function App() {
  const [data, setData] = useState(null);
  const [thumbnailUrl, setThumbnailUrl] = useState('');

  const fetchData = async () => {
    const options = {
      method: 'GET',
      url: 'https://youtube-v31.p.rapidapi.com/videos',
      params: {
        part: 'contentDetails,snippet,statistics',
        id: '7ghhRHRP6t4'
      },
      headers: {
        'X-RapidAPI-Key': 'f9cf73d856mshdd8531e04f1218dp110b69jsn058ab0fd2a8a',
        'X-RapidAPI-Host': 'youtube-v31.p.rapidapi.com'
      }
    };

    try {
      const response = await axios.request(options);
      setData(response.data);
      const thumbnailUrl = response.data.items[0].snippet.thumbnails.maxres.url;
      setThumbnailUrl(thumbnailUrl);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <SafeAreaView>
      <Text>Hello World</Text>
      <Text>{data?.items[0]?.id}</Text>
      {thumbnailUrl ? (
        <Image source={{ uri: thumbnailUrl }} style={{ width: 480, height: 360 }} />
      ) : null}
    </SafeAreaView>
  );
}

export default App;
