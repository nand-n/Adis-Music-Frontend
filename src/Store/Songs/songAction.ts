import { songTypes } from "./songActionTypes";
import { DeleteSongFailurepayload, DeleteSongRequest, DeleteSongSuccessPayload, FetchSongFailure, FetchSongFailurepayload, FetchSongRequest, FetchSongSuccess, FetchSongSuccessPayload, FetchSongsFailure, FetchSongsFailurepayload, FetchSongsPerAlbumFailurePayload, FetchSongsPerAlbumPalyload, FetchSongsPerAlbumRequest, FetchSongsPerArtistFailurePayload, FetchSongsPerArtistPalyload, FetchSongsPerArtistRequest, FetchSongsPerGenreFailurePayload, FetchSongsPerGenrePalyload, FetchSongsPerGenreRequest, FetchSongsRequest, FetchSongsSuccess, FetchSongsSuccessPayload, FetchStatisticsFaliurePayload, FetchStatisticsPayload, FetchStatisticsRequest, PostSongFailurePayload, PostSongRequest, PostSongSuccessPayload, UpdateSongFailurePayload, UpdateSongRequest, UpdateSongSuccessPayload } from "./songTypes";

//FETCH MANY SONGS
export const fetchSongsRequest = () : FetchSongsRequest => ({
    type:songTypes.FETCH_SONGS_REQUEST
})
export const fetchSongsSuccess =(payload:FetchSongsSuccessPayload):FetchSongsSuccess=>({
    type:songTypes.FETCH_SONGS_SUCCESS,
    payload
})
export const fetchSongsFailure =(payload:FetchSongsFailurepayload):FetchSongsFailure=>({
    type:songTypes.FETCH_SONGS_FAILURE,
    payload
})
// FETCH SINGSL SONG
export const fetchSongRequest = (id:string) : FetchSongRequest => ({
    type:songTypes.FETCH_SONG_REQUEST,
    id
})
export const fetchSongSuccess =(payload:FetchSongSuccessPayload):FetchSongSuccess=>({
    type:songTypes.FETCH_SONG_SUCCESS,
    payload
})
export const fetchSongFailure =(payload:FetchSongFailurepayload):FetchSongFailure=>({
    type:songTypes.FETCH_SONG_FAILURE,
    payload
})
//FETCH SONGS PER ALBUM
export const fetchSongsPerAlbum=():FetchSongsPerAlbumRequest =>({
    type:songTypes.FETCH_SONGS_ALBUM_REQUEST
})
export const fetchSongsPerAlbumSuccess =(payload:FetchSongsPerAlbumPalyload)=>({
    type:songTypes.FETCH_SONGS_ALBUM_SUCCESS,
    payload
})
export const fetchSongsAlbumFailure = (payload:FetchSongsPerAlbumFailurePayload)=>({
    type:songTypes.FETCH_SONGS_ALBUM_FAILURE,
    payload
})
//FETCH SONGS PER ALBUM
export const fetchSongsPerGenre=():FetchSongsPerGenreRequest =>({
    type:songTypes.FETCH_SONGS_GENRE_REQUEST
})
export const fetchSongsPerGenreSuccess =(payload:FetchSongsPerGenrePalyload)=>({
    type:songTypes.FETCH_SONGS_GENRE_SUCCESS,
    payload
})
export const fetchSongsGenreFailure = (payload:FetchSongsPerGenreFailurePayload)=>({
    type:songTypes.FETCH_SONGS_GENRE_FAILURE,
    payload
})
//FETCH SONGS PER ALBUM
export const fetchSongsPerArtist=():FetchSongsPerArtistRequest =>({
    type:songTypes.FETCH_SONGS_ARTIST_REQUEST
})
export const fetchSongsPerArtistSuccess =(payload:FetchSongsPerArtistPalyload)=>({
    type:songTypes.FETCH_SONGS_ARTIST_SUCCESS,
    payload
})
export const fetchSongsArtistFailure = (payload:FetchSongsPerArtistFailurePayload)=>({
    type:songTypes.FETCH_SONGS_ARTIST_FAILURE,
    payload
})
//FETCH SONG STATISTICS 
export const fetchSongStatistics =():FetchStatisticsRequest =>({
    type:songTypes.FETCH_SONGS_STATISTICS_REQUEST
})

export const fetchSongStatisticsSuccess =(payload:FetchStatisticsPayload)=>({
    type:songTypes.FETCH_SONGS_STATISTICS_SUCCESS,
    payload
})

export const fetchSongStatisticsFailure = (payload:FetchStatisticsFaliurePayload)=>({
    type:songTypes.FETCH_SONGS_STATISTICS_FAILURE,
    payload
})

//POST SONG
export const postSong=(value:object):PostSongRequest =>({
    type:songTypes.POST_SONG_REQUEST,
    value
})
export const postSongSuccess =(payload:PostSongSuccessPayload)=>({
    type:songTypes.POST_SONG_SUCCESS,
    payload
})
export const PostSongFailure=(payload:PostSongFailurePayload)=>({
    type:songTypes.POST_SONG_FAILURE,
    payload
})
//UPDATE SONG
export const updateSong  =(id:string , value:object):UpdateSongRequest =>({
    type:songTypes.UPDATE_SONG_REQUEST,
    id,
    value
})
export const updateSongSuccess =(payload:UpdateSongSuccessPayload)=>({
    type:songTypes.UPDATE_SONG_SUCCESS,
    payload
})
export const updateSongFailure =(payload:UpdateSongFailurePayload)=>({
    type:songTypes.UPDATE_SONG_FAILURE,
    payload
})
//DELETE SONG
export const deleteSong =(id:string):DeleteSongRequest=>({
    type:songTypes.DELETE_SONG_REQUEST,
    id
})
export const deleteSongSuccess =(payload:DeleteSongSuccessPayload)=>({
    type:songTypes.DELETE_SONG_SUCCESS,
    payload
})
export const DeleteSongFailure =(payload:DeleteSongFailurepayload)=>({
    type:songTypes.DELETE_SONG_FAILURE,
    payload
})