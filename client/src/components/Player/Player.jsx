import "./Player.css";
import ReactPlayer from "react-player";
const Player = ({ url }) => {
  return (
    <div className="player-wrapper">
      <ReactPlayer
        url={url}
        className="react-player"
        playing
        controls
        width="100%"
        height="100%"
      />
    </div>
  );
};

export default Player;
