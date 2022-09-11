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
        default:
            return state;///return previos state
    }
}

export default songReducer;