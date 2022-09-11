function songReducer(state, action) {
    switch (action.type) {
        case "PLAY_SONG":{
            return{
                ...state,//spread object previos state
                isPlaying: true
            }
        }
        case "PAUSE_SONG":{
            return{
                ...state,//spread object previos state
                isPlaying: false
            }
        }
        case "SET_SONG":{
            return{
                ...state,
                song: action.payload.song//completly replace new song
            }
        }
        default:
            return state;///return previos state
    }
}

export default songReducer;