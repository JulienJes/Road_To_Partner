const TwitchStream = ({ channel }) => (
    <iframe
        src={`https://player.twitch.tv/?channel=${channel}&parent=http://localhost:3000/`}
        height="720"
        width="1280"
        allowfullscreen="true"
        title={`Live de ${channel}`}
    ></iframe>
)

export default TwitchStream
