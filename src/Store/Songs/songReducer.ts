import { songTypes } from "./songActionTypes";
import { SongsState ,SongsActions } from "./songTypes";

const initialState :SongsState ={
    pending:false,
    songs:[],
    song:{},
    statistics:{},
    error:null
}

const fetchSongsPending =(state:typeof initialState)=>({
    ...state,
    pending:true
})
const fetchSongsSuccess =(state:typeof initialState , action)=>({
    ...state,
    pending:false,
    songs:action.payload.songs,
    error:null
})
const fetchSongsFailure =(state:typeof initialState , action )=>({
    ...state,
    pending:false,
    error:action.payload.error
})
const fetchSongSuccess =(state:typeof initialState , action)=>({
    ...state,
    pending:false,
    song:action.payload.song,
    error:null
})

const fetchSongPending =(state:typeof initialState)=>({
    ...state,
    pending:true
})
const fetchSongFailure =(state:typeof initialState , action)=>({
    ...state,
    pending:false,
    error:action.payload.error
})
const fetchStatisticsPending =(state:typeof initialState)=>({
    ...state,
    pending:true
})
const fetchStatisticsSuccess =(state:typeof initialState , action)=>({
    ...state,
    pending:false,
    statistics:action.payload.statistics,
    error:null
})

const fetchStatisticsFailure =(state:typeof initialState , action)=>({
    ...state,
    pending:false,
    error:action.payload.error
})

const postSongPending =(state:typeof initialState)=>({
    ...state,
    pending:true,
    error:null
})
const postSongSuccess =(state: typeof initialState ,action)=>{
    return{
    ...state,
    songs:action.payload.songs,
    pending:false,
    error:null
}}
const postSongFailure =(state:typeof initialState , action)=>({
    ...state ,
    error:action.payload
})

const updateSongPending =(state:typeof initialState)=>({
    ...state,
    pending:true,
    error:null
})
const updateSongSuccess =(state: typeof initialState ,action)=>{ 
    return {
    ...state,
    songs:action.payload.song,
    pending:false,
    error:null
}}
const updateSongFailure =(state:typeof initialState , action)=>({
    ...state ,
    pending:false,
    error:action.payload
})
const deleteSongPending =(state:typeof initialState)=>({
    ...state,
    pending:true,
    error:null
})
const deleteSongSuccess =(state:typeof initialState , action) =>({
    ...state,
    pending:false,
    error:null,
    songs:action.payload.songs
})

const deleteSongFailure =(state:typeof initialState , action:object)=>{
    console.log(action.payload ,"action.payload")
 return {   ...state,
    pending:false,
    error:action.payload
 }
}


export default (state = initialState , action:SongsActions) =>{
    switch (action.type){
        case songTypes.FETCH_SONGS_REQUEST:
            return fetchSongsPending(state)
        case songTypes.FETCH_SONGS_SUCCESS:
            return fetchSongsSuccess(state , action)
        case songTypes.FETCH_SONGS_FAILURE:
            return fetchSongsFailure(state, action)
        case songTypes.FETCH_SONG_REQUEST:
            return fetchSongPending(state)
        case songTypes.FETCH_SONG_SUCCESS:
            return fetchSongSuccess(state,action)
        case songTypes.FETCH_SONG_FAILURE:
            return fetchSongFailure(state,action)
        case songTypes.FETCH_SONGS_STATISTICS_REQUEST:
            return fetchStatisticsPending(state)
        case songTypes.FETCH_SONGS_STATISTICS_SUCCESS:
            return fetchStatisticsSuccess(state,action)
        case songTypes.FETCH_SONGS_STATISTICS_FAILURE:
            return fetchStatisticsFailure(state,action)
        case songTypes.POST_SONG_REQUEST:
            return postSongPending(state)
        case songTypes.POST_SONG_SUCCESS:
            return postSongSuccess(state,action)
        case songTypes.POST_SONG_FAILURE:
            return postSongFailure(state,action)
        case songTypes.UPDATE_SONG_REQUEST:
            return updateSongPending(state)
        case songTypes.UPDATE_SONG_SUCCESS:
            return updateSongSuccess(state,action)
        case songTypes.UPDATE_SONG_FAILURE:
            return updateSongFailure(state,action)
        case songTypes.DELETE_SONG_REQUEST:
            return deleteSongPending(state)
        case songTypes.DELETE_SONG_SUCCESS:
            return deleteSongSuccess(state,action)
        case songTypes.DELETE_SONG_FAILURE:
            return deleteSongFailure(state,action)
        default :
            return state
    }
}