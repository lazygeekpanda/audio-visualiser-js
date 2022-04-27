import styled from 'styled-components'
import { animated } from 'react-spring'

import colors from 'styles/colors'

const BodyText = styled.p`
  font-size: 12px;
  letter-spacing: 0.5px;
  font-weight: 400;
`

export const ControlButton = styled.button`
  border: 0;
  outline: 0;

  display: flex;
  align-items: center;
  justify-content: center;

  cursor: pointer;
  transition: transform 0.2s ease-in-out;

  &:hover {
    transform: scale(1.075);
  }

  > svg {
    transition: all 0.2s ease-in-out;
  }
`

export const Sidebar = styled(animated.div)`
  min-width: 400px;
  max-width: 400px;
  background-color: ${colors.black};

  padding: 20px;

  display: flex;
  flex-direction: column;

  position: relative;
  z-index: 9;
  overflow-y: auto;
`

export const Toggler = styled.div`
  position: absolute;
  top: 30px;
  right: 400px;

  width: 50px;
  height: 50px;

  transform: translate(0, 0);

  background-color: ${colors.green};
  border-top-left-radius: 8px;
  border-bottom-left-radius: 8px;

  display: flex;
  align-items: center;
  justify-content: center;

  z-index: 11;

  cursor: pointer;

  > svg {
    width: 80%;
    height: 80%;
    fill: ${colors.white};
  }
`

export const Player = styled.div`
  padding: 10px 20px;
  min-height: 360px;
  max-height: 360px;

  background-color: ${colors.accent};

  border-radius: 12px;

  position: relative;
  overflow: hidden;

  color: ${colors.white};

  > svg {
    position: absolute;
    top: 50%;
    left: 0;
    transform: translate(0, -20%);
    color: ${colors.black};
  }
`

export const Disc = styled.div`
  border-radius: 100%;
  position: relative;

  top: 50%;
  transform: translate(0, -50%);
`

export const DiscMain = styled(Disc)`
  width: 300px;
  height: 300px;
  background-color: ${colors.black};

  position: absolute;

  right: 0;
  top: 50%;
  transform: translate3D(50%, -50%, 0);
`
export const InnerDisc = styled(Disc)`
  width: 95%;
  height: 95%;

  background-color: ${colors.black};
  outline: 2px solid ${colors.white};

  right: -2.5%;
`

export const InnerBlackDisc = styled(Disc)`
  width: 30%;
  height: 30%;

  background-color: ${colors.red};

  right: -35%;
`

export const BottomHole = styled(Disc)`
  width: 30%;
  height: 30%;
  right: -35%;

  background-color: ${colors.white};
`

export const TrackInfo = styled.div`
  margin-top: 10px;
`

export const CurrentPlayingText = styled(BodyText)`
  opacity: 0.8;
  font-weight: 100;
  font-size: 10px;
  letter-spacing: 1px;
`

export const TrackTitle = styled.h2`
  font-family: 'Playfair Display', serif;
  font-size: 38px;
  font-weight: 400;
  letter-spacing: 1px;
  width: 60%;
`

export const TrackArtist = styled(BodyText)`
  margin-top: 10px;
  font-size: 14px;
`

export const PlayerControls = styled.div`
  position: absolute;
  bottom: 20px;
  width: 100%;
  left: 0;

  display: flex;
  justify-content: center;
`

export const PreviousSong = styled(ControlButton)`
  background-color: transparent;
  color: ${colors.white};
  svg {
    width: 18px;
    height: 18px;
  }

  &:hover > svg {
    fill: ${colors.white};
  }
`
export const NextSong = styled(ControlButton)`
  background-color: transparent;
  color: ${colors.white};
  svg {
    width: 18px;
    height: 18px;
  }

  &:hover > svg {
    fill: ${colors.white};
  }
`

export const PlayButton = styled(ControlButton)`
  background-color: ${colors.white};

  padding: 15px;
  border-radius: 100%;

  margin: 0 10px;

  &:hover > svg {
    fill: ${colors.accent};
  }

  svg {
    width: 24px;
    height: 24px;
  }
`

export const Playlist = styled.div`
  flex: 1;
  margin-top: 30px;

  > label {
    font-size: 14px;
    font-weight: 400;
    color: ${colors.grey};
  }
`

export const TrackList = styled.div`
  /* max-height: 300px; */
  overflow-y: auto;

  padding: 10px 0;
`

export const Track = styled.div`
  margin: 10px 0;

  display: flex;
  align-items: center;

  padding: 5px;
  border-radius: 12px;

  &:hover {
    background-color: rgba(255, 255, 255, 0.05);
  }
`

export const TrackCover = styled.div`
  margin-right: 12px;

  > div {
    width: 50px;
    height: 50px;
    background-color: ${colors.accent};
    border-radius: 10px;
  }
`

export const TrackDetails = styled.div`
  flex: 1;

  > strong {
    font-size: 18px;
    display: block;
    color: ${colors.white};
  }

  > span {
    font-size: 12px;
    color: ${colors.grey};
  }
`

export const TrackActions = styled.div`
  margin-right: 10px;
  cursor: pointer;
  svg {
    width: 18px;
    fill: ${colors.white};

    transition: 0.22s ease-in-out;
  }

  &:hover {
    svg {
      fill: ${colors.accent};
    }
  }
`

export const CreditsContainer = styled.code`
  font-size: 12px;
  color: ${colors.grey};
`
