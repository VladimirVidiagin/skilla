import React, { useState, useRef } from "react";
import styled from "styled-components";
import { API_TOKEN } from "../../../app/consts";
import { PlayButtonIcon } from "../../icons/play-button-icon";
import { StopButtonIcon } from "../../icons/stop-button-icon";
import { DownloadIcon } from "../../icons/download-icon";
import { CrossIcon } from "../../icons/cross-icon";

interface AudioPlayerProps {
  record: string;
  partnership_id: string;
  duration: number;
}

/**
 * Компонент аудиоплеер.
 */
export const AudioPlayer: React.FC<AudioPlayerProps> = ({
  record,
  partnership_id,
  duration,
}) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState(0);
  const [audioUrl, setAudioUrl] = useState<string | null>(null);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  const handlePlayPause = async () => {
    if (!audioUrl) {
      try {
        const url = new URL("https://api.skilla.ru/mango/getRecord");
        url.searchParams.append("record", record);
        url.searchParams.append("partnership_id", partnership_id.toString());

        const response = await fetch(url.toString(), {
          method: "POST",
          headers: {
            Authorization: `Bearer ${API_TOKEN}`,
            "Content-Type": "application/json",
          },
        });

        if (!response.ok) {
          throw new Error("Ошибка загрузки аудио");
        }

        const blob = await response.blob();
        const newAudioUrl = URL.createObjectURL(blob);
        setAudioUrl(newAudioUrl);

        if (audioRef.current) {
          audioRef.current.src = newAudioUrl;
          audioRef.current.play();
          setIsPlaying(true);
        }
      } catch (error) {
        console.error("Ошибка при загрузке аудио:", error);
      }
    } else {
      if (audioRef.current) {
        if (isPlaying) {
          audioRef.current.pause();
        } else {
          audioRef.current.play();
        }
        setIsPlaying(!isPlaying);
      }
    }
  };

  const handleTimeUpdate = () => {
    if (audioRef.current) {
      const currentTime = audioRef.current.currentTime;
      const progressPercent = (currentTime / duration) * 100;
      setProgress(progressPercent);
    }
  };

  const handleEnded = () => {
    setIsPlaying(false);
    if (audioUrl) {
      URL.revokeObjectURL(audioUrl);
      setAudioUrl(null);
    }
  };

  const formatTime = (seconds: number) => {
    const minutes = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${minutes}:${secs < 10 ? "0" : ""}${secs}`;
  };

  return (
    <AudioPlayerContainer>
      <Duration>{formatTime(duration)}</Duration>
      <PlayButton onClick={handlePlayPause}>
        {isPlaying ? <StopButtonIcon /> : <PlayButtonIcon />}
      </PlayButton>
      <ProgressBar>
        <ProgressFill style={{ width: `${progress}%` }} />
      </ProgressBar>
      <IconButton>
        <DownloadIcon />
      </IconButton>
      <IconButton>
        <CrossIcon />
      </IconButton>
      <audio
        ref={audioRef}
        onTimeUpdate={handleTimeUpdate}
        onEnded={handleEnded}
      />
    </AudioPlayerContainer>
  );
};

const AudioPlayerContainer = styled.div`
  display: flex;
  align-items: center;
  height: 48px;
  border-radius: 48px;
  background-color: rgba(234, 240, 250, 0.99);
  padding: 0 18px;
`;

const PlayButton = styled.button`
  border: none;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  height: 24px;
  width: 24px;
  border-radius: 24px;
  padding: 0;
  background: none;
  margin-left: 12px;
`;

const ProgressBar = styled.div`
  width: 164px;
  height: 4px;
  background-color: #e0e0e0;
  border-radius: 2px;
  position: relative;
  margin-left: 8px;
`;

const ProgressFill = styled.div`
  max-width: 164px;
  height: 4px;
  background-color: #002cfb;
  border-radius: 2px;
`;

const Duration = styled.span`
  font-size: 15px;
  color: #122945;
  font-weight: 400;
  line-height: 21.75px;
`;

const IconButton = styled.button`
  border: none;
  background: none;
  cursor: pointer;
  padding: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 24px;
  height: 24px;
  margin-left: 12px;

  &:hover svg path {
    fill: #002cfb;
  }
`;
