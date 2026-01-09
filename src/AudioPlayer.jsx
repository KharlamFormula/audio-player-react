import { useRef, useState } from "react";
import { songs } from "./songs";

export default function AudioPlayer() {
  const audioRef = useRef(null);  
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);

  function playPause() {
    if (isPlaying) {
      audioRef.current.pause();
    } else {
      audioRef.current.play();
    }
    setIsPlaying(!isPlaying);
  }

  function nextSong() {
    setCurrentIndex((prev) => (prev + 1) % songs.length);
    setIsPlaying(true);
    setTimeout(() => audioRef.current.play(), 0);
  }

  function prevSong() {
    setCurrentIndex((prev) =>
      prev === 0 ? songs.length - 1 : prev - 1
    );
    setIsPlaying(true);
    setTimeout(() => audioRef.current.play(), 0);
  }

  return (
    <div>
      <h1>Audio Player</h1>
      <p>{songs[currentIndex].title}</p>

      <audio
        ref={audioRef}
        src={songs[currentIndex].src}
        onEnded={nextSong}/>

      <button onClick={prevSong}>⏮</button>
      <button onClick={playPause}>
        {isPlaying ? "⏸" : "▶"}
      </button>
      <button onClick={nextSong}>⏭</button>

      <ol className="song-list">
        {songs.map((song, index) => (
        <li
        key={song.id}
        onClick={() => {
          setCurrentIndex(index);
          setIsPlaying(true);
          setTimeout(() => audioRef.current.play(), 0);
        }}
        className={index === currentIndex ? "active" : ""}>
          {song.title}
       </li>
      ))}
      </ol>
      </div>
  );
}
