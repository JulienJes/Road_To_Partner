import { NavLink } from 'react-router-dom';

// SVG to react components in order to modify them
const SvgMail = (props) => (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 512 512"
      width="2rem"
      height="2rem"
      fill="#FDFDFD"
      {...props}
    >
      <path d="M48 64C21.5 64 0 85.5 0 112c0 15.1 7.1 29.3 19.2 38.4l217.6 163.2c11.4 8.5 27 8.5 38.4 0l217.6-163.2c12.1-9.1 19.2-23.3 19.2-38.4 0-26.5-21.5-48-48-48H48zM0 176v208c0 35.3 28.7 64 64 64h384c35.3 0 64-28.7 64-64V176L294.4 339.2a63.9 63.9 0 0 1-76.8 0L0 176z" />
    </svg>
);
const SvgTwitter = (props) => (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 448 512"
      width="2rem"
      height="2rem"
      fill="#FDFDFD"
      {...props}
    >
      <path d="M400 32H48C21.5 32 0 53.5 0 80v352c0 26.5 21.5 48 48 48h352c26.5 0 48-21.5 48-48V80c0-26.5-21.5-48-48-48zm-48.9 158.8c.2 2.8.2 5.7.2 8.5 0 86.7-66 186.6-186.6 186.6-37.2 0-71.7-10.8-100.7-29.4 5.3.6 10.4.8 15.8.8 30.7 0 58.9-10.4 81.4-28-28.8-.6-53-19.5-61.3-45.5 10.1 1.5 19.2 1.5 29.6-1.2-30-6.1-52.5-32.5-52.5-64.4v-.8c8.7 4.9 18.9 7.9 29.6 8.3a65.447 65.447 0 0 1-29.2-54.6c0-12.2 3.2-23.4 8.9-33.1 32.3 39.8 80.8 65.8 135.2 68.6-9.3-44.5 24-80.6 64-80.6 18.9 0 35.9 7.9 47.9 20.7 14.8-2.8 29-8.3 41.6-15.8-4.9 15.2-15.2 28-28.8 36.1 13.2-1.4 26-5.1 37.8-10.2-8.9 13.1-20.1 24.7-32.9 34z" />
    </svg>
);
const SvgTwitch = (props) => (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 512 512"
      width="2rem"
      height="2rem"
      fill="#FDFDFD"
      {...props}
    >
      <path d="M391.17 103.47h-38.63v109.7h38.63ZM285 103h-38.63v109.75H285ZM120.83 0 24.31 91.42v329.16h115.83V512l96.53-91.42h77.25L487.69 256V0Zm328.24 237.75-77.22 73.12h-77.24l-67.6 64v-64h-86.87V36.58h308.93Z" />
    </svg>
);
const SvgYoutube = (props) => (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 576 512"
      width="2rem"
      height="2rem"
      fill="#FDFDFD"
      {...props}
    >
      <path d="M549.655 124.083c-6.281-23.65-24.787-42.276-48.284-48.597C458.781 64 288 64 288 64S117.22 64 74.629 75.486c-23.497 6.322-42.003 24.947-48.284 48.597-11.412 42.867-11.412 132.305-11.412 132.305s0 89.438 11.412 132.305c6.281 23.65 24.787 41.5 48.284 47.821C117.22 448 288 448 288 448s170.78 0 213.371-11.486c23.497-6.321 42.003-24.171 48.284-47.821 11.412-42.867 11.412-132.305 11.412-132.305s0-89.438-11.412-132.305zm-317.51 213.508V175.185l142.739 81.205-142.739 81.201z" />
    </svg>
);

function Footer () {
    return (
        <footer>
            <div id='links'>
              <a href="mailto:jowystreaming@gmail.com" title="Me contacter" target="_blank" rel="noopener noreferrer"><SvgMail /></a>
              <a href="https://twitter.com/Jowy_TV" title="Twitter" target="_blank" rel="noopener noreferrer"><SvgTwitter /></a>
              <a href="https://www.twitch.tv/jowytv" title="Twitch" target="_blank" rel="noopener noreferrer"><SvgTwitch /></a>
              <a href="https://www.youtube.com/channel/UCWTyWYExJ1221Z_HcNBTnSw" title="Youtube" target="_blank" rel="noopener noreferrer"><SvgYoutube /></a>
            </div>
            <p>Réalisé par amour du Twitch francophone</p>
        </footer>
    );
};

export default Footer;