import React from 'react'

import TrackModel from 'models/track.model'

import { ReactComponent as PlayIcon } from 'assets/icons/play-solid.svg'
import { ReactComponent as PauseIcon } from 'assets/icons/pause-solid.svg'
import { ReactComponent as BackwardStep } from 'assets/icons/backward-step-solid.svg'
import { ReactComponent as ForwardStep } from 'assets/icons/forward-step-solid.svg'

import * as S from './Playlist.styled'

interface Props {
  playing: boolean
  items: TrackModel[]
  currentTrack: TrackModel
  onChange: (index: number) => void
  onPlay: () => void
  onNextTrack: () => void
  onPreviousTrack: () => void
}

const Sidebar: React.FC<Props> = ({
  playing,
  items,
  currentTrack,
  onChange,
  onPlay,
  onNextTrack,
  onPreviousTrack,
}) => {
  return (
    <S.Sidebar>
      <S.Player>
        <S.TrackInfo>
          <S.CurrentPlayingText>Currently playing</S.CurrentPlayingText>
          <S.TrackTitle>{currentTrack.trackName}</S.TrackTitle>
          <S.TrackArtist>by {currentTrack.artist}</S.TrackArtist>
        </S.TrackInfo>

        <svg
          width="229"
          height="117"
          viewBox="0 0 229 117"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M200.202 10.4658C213.625 18.0126 219.869 8.5 222.869 0L228.369 91.5C221.485 83.5322 206.08 68.4718 188.869 61.5C171.659 54.5282 147.324 62.3693 142.374 85.1639C139.369 99 122.922 99.1055 115.869 95C101.369 86.5592 89.316 89.8925 81.8694 98C59.4912 122.365 41.5611 119.428 26.7181 104.585C18.2523 96.1196 5 99.1075 -1 104.585V8.5C0.835806 8.334 15.6561 9.05718 24 15.5C43.4703 30.5342 43.433 46.2579 58.3858 34.8672C69.3694 26.5 74.6083 23.5121 82.8694 26.5C91.1306 29.4879 112.739 54.7867 121 34.8672C126.751 21 137.672 21.8661 144.5 24C152.5 26.5 155.405 28.342 165.869 14C177.883 -2.46578 191.369 5.5 200.202 10.4658Z"
            fill="currentColor"
          />
        </svg>
        <S.DiscMain>
          <S.InnerDisc>
            <S.InnerBlackDisc>
              <S.BottomHole />
            </S.InnerBlackDisc>
          </S.InnerDisc>
        </S.DiscMain>

        <S.PlayerControls>
          <S.PreviousSong onClick={onPreviousTrack}>
            <BackwardStep />
          </S.PreviousSong>
          <S.PlayButton onClick={onPlay}>
            {!playing ? <PlayIcon /> : <PauseIcon />}
          </S.PlayButton>
          <S.NextSong onClick={onNextTrack}>
            <ForwardStep />
          </S.NextSong>
        </S.PlayerControls>
      </S.Player>

      <S.ScrollWrapper>
        <S.Playlist>
          <label>Playlist</label>
          <S.TrackList>
            {items.map((item, index) => (
              <S.Track key={index}>
                <S.TrackCover>
                  <div></div>
                </S.TrackCover>
                <S.TrackDetails>
                  <strong>{item.trackName} </strong>
                  <span>{item.artist}</span>
                </S.TrackDetails>
                <S.TrackActions onClick={() => onChange(index)}>
                  {item.trackName === currentTrack.trackName && playing ? (
                    <PauseIcon />
                  ) : (
                    <PlayIcon />
                  )}
                </S.TrackActions>
              </S.Track>
            ))}
          </S.TrackList>
        </S.Playlist>
        <S.CreditsContainer>
          Credits:
          {currentTrack.attributionText?.split('\n').map((text, index) => (
            <div key={index}>{text}</div>
          ))}
        </S.CreditsContainer>
      </S.ScrollWrapper>
    </S.Sidebar>
  )
}

export default Sidebar
