const TwitchStream = ({ channel }) => (
    <iframe
        src={`https://player.twitch.tv/?channel=${channel}&parent=localhost`}
        height="200"
        width="354"
        allowFullScreen
        title={`Live de ${channel}`}
    ></iframe>
)

export default TwitchStream
