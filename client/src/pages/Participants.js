import { useState, useEffect } from 'react';
import axios from 'axios';

const clientId = process.env.REACT_APP_TWITCH_ID;
const clientSecret = process.env.REACT_APP_TWITCH_SECRET;

const Participants = () => {
  const [usersData, setUsersData] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      const { data: tokenData } = await axios.post('https://id.twitch.tv/oauth2/token', null, {
        params: {
          client_id: clientId,
          client_secret: clientSecret,
          grant_type: 'client_credentials'
        }
      });

      const users = ['Pyyyyf', 'Kiwikrykry_', 'LeLudus', 'YGDRAL', 'Coli28', 'horusroyale29', 'Chilosah', 'Keeburu', 'Maytiak', 'Manubiwan', 'CornniX', 'zepoipoi', 'Mawy_P', 'Meobryn', 'RLP_TV', 'ASX_BH', 'LoicTomatot', 'DrGameuse', 'Sovannya', 'Bad_Hel', 'BonbonBleue', 'Jaster__Blade', 'Snakenco', 'HelloMariane']

      const allUsersData = [];
      for (let i = 0; i < users.length; i++) {
        const user = users[i];
        const { data: userData } = await axios.get('https://api.twitch.tv/helix/users', {
          headers: {
            'Client-ID': clientId,
            'Authorization': `Bearer ${tokenData.access_token}`
          },
          params: {
            login: user
          }
        });

        if (!userData.data || !userData.data.length) {
          console.log(`User ${user} does not exist`);
          continue;
        }

        const userId = userData.data[0].id;

        const { data: followersData } = await axios.get(`https://api.twitch.tv/helix/users/follows?to_id=${userId}`, {
          headers: {
            'Client-ID': clientId,
            'Authorization': `Bearer ${tokenData.access_token}`
          }
        });
        const followersCount = followersData.total;

        const { data: streamsData } = await axios.get(`https://api.twitch.tv/helix/streams?user_id=${userId}`, {
          headers: {
            'Client-ID': clientId,
            'Authorization': `Bearer ${tokenData.access_token}`
          }
        });
        const isLive = streamsData.data.length > 0;
        const lastGameStreamed = isLive ? streamsData.data[0].game_name : '';

        const fullUsersData = {
          ...userData.data[0],
          followers: followersCount,
          isLive,
          lastGameStreamed
        };

        allUsersData.push(fullUsersData);
      }

      console.log(allUsersData);
      setUsersData(allUsersData);
    };

    fetchData();
  }, []);

  if (!usersData) {
    return <div>Chargement...</div>;
  }

  return (
    <>
      <h2>Participants</h2>
      <section className='participants'>
        {usersData.map(user => (
          <div className="streamer" key={user.id}>
            <a href={`https://www.twitch.tv/${user.login}`} target="_blank" rel="noopener noreferrer">
              <h3>{user.display_name}</h3>
              <img src={user.profile_image_url} alt={user.display_name} />
              <p>{user.description ? user.description : "Ce streamer n'a pas de bio."}</p>
              <p>Followers: {user.followers}</p>
              <p>Views: {user.view_count}</p>
              <p>Last game streamed: {user.lastGameStreamed}</p>
              <span>Live now: {user.isLive ? 'Yes' : 'No'}</span>
            </a>
          </div>
        ))}
      </section>
    </>
  );
};

export default Participants;