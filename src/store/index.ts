import TrackModel from 'models/track.model'

export interface Store {
  tracks: TrackModel[]
}

const store: Store = {
  tracks: [
    {
      artist: 'Hoober',
      trackName: 'Higher',
      url: 'Hoober_Higher.mp3',
      attributionText: `Song: Hoober - Higher (feat. Vanessa Campagna) [NCS Release]
      Music provided by NoCopyrightSounds
      Free Download/Stream: http://ncs.io/HHigher
      Watch: http://youtu.be/RBPuDWzZUiA`,
    },
    {
      artist: 'Abandoned',
      trackName: 'Out of the Grave',
      url: 'Abandoned_Out_of_the_Grave.mp3',
      attributionText: `Song: Abandoned - Out of the Grave (Feat. ENROSA) [NCS Release]
      Music provided by NoCopyrightSounds
      Free Download/Stream: http://ncs.io/OutOfTheGrave
      Watch: http://youtu.be/dWOj02nPyxk`,
    },
    {
      artist: 'Egzod, Maestro Chives, Neoni',
      trackName: 'Royalty',
      url: 'Egzod_Royalty.mp3',
      attributionText: `Song: Egzod, Maestro Chives, Neoni - Royalty [NCS Release]
      Music provided by NoCopyrightSounds
      Free Download/Stream: http://ncs.io/Royalty
      Watch: http://youtu.be/C5fLxtJH2Qs`,
    },
    {
      artist: 'Abstrakt',
      trackName: 'Nobody Else',
      url: 'Abstrakt_Nobody_Else.mp3',
      attributionText: `Song: Abstrakt - Nobody Else [NCS Release]
      Music provided by NoCopyrightSounds
      Free Download/Stream: http://NCS.io/NobodyElse
      Watch: http://youtu.be/bNXMlIogpXc`,
    },
    {
      artist: 'QR',
      trackName: 'XXI',
      url: 'QR_XXI.mp3',
      attributionText: `Song: QR - XXI [NCS Release]
      Music provided by NoCopyrightSounds
      Free Download/Stream: http://NCS.io/XXI
      Watch: http://youtu.be/gR2irrU9Xeo`,
    },
    // {
    //   artist: 'QR',
    //   trackName: 'XXI',
    //   url: 'QR_XXI.mp3',
    //   attributionText: `Song: QR - XXI [NCS Release]
    //   Music provided by NoCopyrightSounds
    //   Free Download/Stream: http://NCS.io/XXI
    //   Watch: http://youtu.be/gR2irrU9Xeo`,
    // },
  ],
}

// TODO: Add tracks:
// Lost Identities - Moments

export default store
