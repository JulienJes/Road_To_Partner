import { useState, useEffect } from 'react';

function TwitchAPI() {
    const [data, setData] = useState([]);

    useEffect(() => {
        const headers = new Headers({
        'Authorization': `Bearer ${process.env.TOKEN_API_TWITCH}`
        });

    fetch('https://api.twitch.tv/helix/streams', { headers })
      .then(res => res.json())
      .then(res => setData(res.data))
      .catch(err => console.error(err));
  }, []);
};

export default TwitchAPI;