import React, { useRef } from 'react'

interface IProps {
  src: string
  controls?: boolean
  autoPlay?: boolean
  muted?: boolean
  loop?: boolean
  preload?: 'none' | 'metadata' | 'auto'
  onPlay?: () => void
  onPause?: () => void
  onEnded?: () => void
  onTimeUpdate?: () => void
  onLoadedMetadata?: () => void
  className?: string
  style?: React.CSSProperties
  playerStyle?: React.CSSProperties
}

const AudioPlayer = ({
  src,
  controls = true,
  autoPlay = false,
  muted = false,
  loop = false,
  preload = 'auto',
  onPlay,
  onPause,
  onEnded,
  onTimeUpdate,
  onLoadedMetadata,
  className,
  style,
  playerStyle,
}: IProps) => {
  const audioRef = useRef<HTMLAudioElement>(null)

  const handleMouseEnter = () => {
    if (audioRef.current) {
      audioRef.current.play()
    }
  }

  const handleMouseLeave = () => {
    if (audioRef.current) {
      audioRef.current.pause()
    }
  }
  return (
    <audio
      ref={audioRef}
      src={src}
      controls={controls}
      autoPlay={autoPlay}
      muted={muted}
      loop={loop}
      preload={preload}
      onPlay={onPlay}
      onPause={onPause}
      onEnded={onEnded}
      onTimeUpdate={onTimeUpdate}
      onLoadedMetadata={onLoadedMetadata}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      className={className}
      style={style}
    >
      <style>
        {` audio::-webkit-media-controls-panel {
  background-color: #f43f5e !important;
  color: #fff !important;
  border-radius: 0%;
}
audio::-webkit-media-controls-play-button {
  background-color: #f43f5e !important;
  color: #000 !important;
}
audio::-webkit-media-controls-mute-button {
  background-color: #f43f5e !important;
  color: #000 !important;
}
audio::-webkit-media-controls-volume-slider {
  background-color: #f43f5e !important;
}
audio::-webkit-media-controls-current-time-display,
audio::-webkit-media-controls-time-remaining-display,
audio::-webkit-media-controls-volume-slider-container,
audio::-webkit-media-controls-mute-button,
audio::-webkit-media-controls-play-button {
  color: #fff !important;
  text-shadow: none !important;
}

        `}
      </style>
      <style>
        {`
          audio {
            ${playerStyle}
          }
        `}
      </style>
    </audio>
  )
}

export default AudioPlayer
