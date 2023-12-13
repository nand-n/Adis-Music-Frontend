// import axios from "axios";
// import { URL_BASE } from "../../Constants";
// import { all, call, put, select, takeLatest } from "redux-saga/effects";
// import { DeleteSongFailure, PostSongFailure, deleteSongSuccess, fetchSongFailure, fetchSongStatisticsFailure, fetchSongStatisticsSuccess, fetchSongSuccess, fetchSongsFailure, fetchSongsPerAlbumSuccess, fetchSongsPerArtistSuccess, fetchSongsPerGenreSuccess, fetchSongsSuccess, postSongSuccess, updateSongFailure, updateSongSuccess } from "./songAction";
// import { songTypes } from "./songActionTypes";
// import { toast } from "react-toastify";

// //fetch api call for list of songs
// const getSongs = ()=> axios.get<[]>(`${URL_BASE}/song`)

// function* fetchSongsSaga() {
//     try {
//         const response =  yield call(getSongs)
//         yield put(
//             fetchSongsSuccess({
//                 songs:response.data
//             })
//         )
//     } catch (e) {
//         yield put(
//             fetchSongsFailure({
//                 error:e.message
//             })
//         )
//         toast.error("Fetching Songs Error!")

//     }
// }
// //fetch api call for list of songs per album
// const getAlbumSongs = ()=> axios.get<[]>(`${URL_BASE}/song/songbyalbum`)

// function* fetchSongsPerAlbumSaga() {
//     try {
//         const response =  yield call(getAlbumSongs)
//         yield put(
//             fetchSongsPerAlbumSuccess({
//                 songPerAlbum:response.data
//             })
//         )
//     } catch (e) {
//         yield put(
//             fetchSongsFailure({
//                 error:e.message
//             })
//         )
//         toast.error("Fetching Songs Per Album Error!")

//     }
// }
// //fetch api call for list of songs per artist
// const getArtistSongs = ()=> axios.get<[]>(`${URL_BASE}/song/songbyartist`)

// function* fetchSongsPerArtistSaga() {
//     try {
//         const response =  yield call(getArtistSongs)
//         yield put(
//             fetchSongsPerArtistSuccess({
//                 songsPerArtist:response.data
//             })
//         )
//     } catch (e) {
//         yield put(
//             fetchSongsFailure({
//                 error:e.message
//             })
//         )
//         toast.error("Fetching Songs Per Artist Error!")

//     }
// }
// //fetch api call for list of songs per genre
// const getGenreSongs = ()=> axios.get<[]>(`${URL_BASE}/song/songbygenre`)

// function* fetchSongsPerGenreSaga() {
//     try {
//         const response =  yield call(getGenreSongs)
//         yield put(
//             fetchSongsPerGenreSuccess({
//                 songsPerGenre:response.data
//             })
//         )
//     } catch (e) {
//         yield put(
//             fetchSongsFailure({
//                 error:e.message
//             })
//         )
//         toast.error("Fetching Songs Per Fenre Error!")

//     }
// }
// //Fetch api call for Single Song
// const getSong=(id:string)=>axios.get<object>(`${URL_BASE}/song/${id}`)
// function* fetchSongSaga(action){
//     try {
//         const response = yield call(getSong,action.id)
//         yield put(
//             fetchSongSuccess({
//                 song:response.data.data
//             })
//         )
//     } catch (error) {
//         yield put(
//             fetchSongFailure({
//                 error:error.message
//             })
//         )
//         toast.error("Fetching Song Error!")

//     }
// }
// //fetch api call for song statistics 
// const getStat=()=>axios.get<object>(`${URL_BASE}/song/stat`)
// function* fetchSongStatistics(){
//     try {
//         const response = yield call(getStat)
//         yield  put(fetchSongStatisticsSuccess({
//             statistics:response.data.data
//         }))
//     } catch (error) {
//         yield put(
//             fetchSongStatisticsFailure({
//                 error:error.message
//             })
//         )
//         toast.error("Fetch Song Statistics Error")

//     }
// }
// //post songs
// const postSongFun =(value:object)=> axios.post<object>(`${URL_BASE}/song` , value)
// function* postSong(action){
//     try {
//         const response:object = yield call(postSongFun,action.value)
//         const songsState :[] = yield select((state) => state.songReducer.songs);
//         yield  put(postSongSuccess({
//             songs:[...songsState ,response.data]
//         }))
//         toast.success("Song Posted success")
//     } catch (error) {
//         yield put(
//             PostSongFailure({
//                 error:error.message
//             })
//         )
//         toast.error("Song Posted Error")
//     }
// }
// //update song
// const updateSongApi = ( id:string,value:object)=> axios.patch<object>(`${URL_BASE}/song/${id}` , value)
// function* updateSong(action){
//     try {
//         const response:object = yield call(updateSongApi,action.id , action.value)
//         const songsState:[object] = yield select((state) => state.songReducer.songs);
//         yield  put(updateSongSuccess({
//             song:songsState?.map(item=>item._id === response.data._id? response.data : item )
//         }))
//         toast.success("Song Updated success!")

//     } catch (error:unknown) {
//         yield put(
//             updateSongFailure({
//                 error:error.message
//             })
//         )
//         toast.error(error.message)
//     }
// }

// //delete song 
// const delSong =(id:string)=> axios.delete(`${URL_BASE}/song/${id}`)
// function* deleteSong(action){
//     try {
//         const response:object = yield call(delSong,action.id)
//         const songsState:[object] = yield select((state) => state.songReducer.songs);
//         console.log(songsState ,"songsState");
//         yield  put(deleteSongSuccess({
//             songs:songsState?.filter(item=>item._id != response.data._id)
//         }))
//         toast.success("Song Deleted success!")
        
//     } catch (error:unknown) {
//         yield put(
//             DeleteSongFailure({
//                 error:error.message
//             })
//         )
//         toast.error(error.message)
//     }
// }

// function* songsSaga(){
//     yield all([
//         takeLatest(songTypes.FETCH_SONGS_REQUEST ,fetchSongsSaga),
//         takeLatest(songTypes.FETCH_SONG_REQUEST , fetchSongSaga),
//         takeLatest(songTypes.FETCH_SONGS_STATISTICS_REQUEST , fetchSongStatistics),
//         takeLatest(songTypes.POST_SONG_REQUEST , postSong),
//         takeLatest(songTypes.DELETE_SONG_REQUEST , deleteSong),
//         takeLatest(songTypes.UPDATE_SONG_REQUEST , updateSong),
//         takeLatest(songTypes.FETCH_SONGS_ALBUM_REQUEST ,  fetchSongsPerAlbumSaga),
//         takeLatest(songTypes.FETCH_SONGS_ARTIST_REQUEST ,  fetchSongsPerArtistSaga),
//         takeLatest(songTypes.FETCH_SONGS_GENRE_REQUEST ,  fetchSongsPerGenreSaga)
//     ])
// }




// export default songsSaga

import axios, { AxiosResponse } from "axios";
import { all, call, put, select, takeLatest } from "redux-saga/effects";
import { DeleteSongFailure, PostSongFailure, deleteSongSuccess, fetchSongFailure, fetchSongStatisticsFailure, fetchSongStatisticsSuccess, fetchSongSuccess, fetchSongsFailure, fetchSongsPerAlbumSuccess, fetchSongsPerArtistSuccess, fetchSongsPerGenreSuccess, fetchSongsSuccess, postSongSuccess, updateSongFailure, updateSongSuccess } from "./songAction";
import { songTypes } from "./songActionTypes";
import { toast } from "react-toastify";
import { URL_BASE } from "../../Constants";
import { RootReducerState } from "../rootReducers";
// import { RootReducerState } from "../../store/store"; // Adjust the import based on your store setup

// Fetch api call for list of songs
const getSongs = (): Promise<AxiosResponse<[]>> => axios.get<[]>(`${URL_BASE}/song`);

function* fetchSongsSaga() {
    try {
        const response: AxiosResponse<[]> = yield call(getSongs);
        yield put(
            fetchSongsSuccess({
                songs: response.data
            })
        );
    } catch (e) {
        yield put(
            fetchSongsFailure({
                error: e.message
            })
        );
        toast.error("Fetching Songs Error!");
    }
}

// Fetch api call for list of songs per album
const getAlbumSongs = (): Promise<AxiosResponse<[]>> => axios.get<[]>(`${URL_BASE}/song/songbyalbum`);

function* fetchSongsPerAlbumSaga() {
    try {
        const response: AxiosResponse<[]> = yield call(getAlbumSongs);
        yield put(
            fetchSongsPerAlbumSuccess({
                songPerAlbum: response.data
            })
        );
    } catch (e) {
        yield put(
            fetchSongsFailure({
                error: e.message
            })
        );
        toast.error("Fetching Songs Per Album Error!");
    }
}

// Fetch api call for list of songs per artist
const getArtistSongs = (): Promise<AxiosResponse<[]>> => axios.get<[]>(`${URL_BASE}/song/songbyartist`);

function* fetchSongsPerArtistSaga() {
    try {
        const response: AxiosResponse<[]> = yield call(getArtistSongs);
        yield put(
            fetchSongsPerArtistSuccess({
                songsPerArtist: response.data
            })
        );
    } catch (e) {
        yield put(
            fetchSongsFailure({
                error: e.message
            })
        );
        toast.error("Fetching Songs Per Artist Error!");
    }
}

// Fetch api call for list of songs per genre
const getGenreSongs = (): Promise<AxiosResponse<[]>> => axios.get<[]>(`${URL_BASE}/song/songbygenre`);

function* fetchSongsPerGenreSaga() {
    try {
        const response: AxiosResponse<[]> = yield call(getGenreSongs);
        yield put(
            fetchSongsPerGenreSuccess({
                songsPerGenre: response.data
            })
        );
    } catch (e) {
        yield put(
            fetchSongsFailure({
                error: e.message
            })
        );
        toast.error("Fetching Songs Per Genre Error!");
    }
}

// Fetch api call for Single Song
const getSong = (id: string): Promise<AxiosResponse<object>> => axios.get<object>(`${URL_BASE}/song/${id}`);

function* fetchSongSaga(action) {
    try {
        const response: AxiosResponse<object> = yield call(getSong, action.id);
        yield put(
            fetchSongSuccess({
                song: response.data.data
            })
        );
    } catch (error) {
        yield put(
            fetchSongFailure({
                error: error.message
            })
        );
        toast.error("Fetching Song Error!");
    }
}

// Fetch api call for song statistics 
const getStat = (): Promise<AxiosResponse<object>> => axios.get<object>(`${URL_BASE}/song/stat`);

function* fetchSongStatistics() {
    try {
        const response: AxiosResponse<object> = yield call(getStat);
        yield  put(fetchSongStatisticsSuccess({
            statistics: response.data.data
        }));
    } catch (error) {
        yield put(
            fetchSongStatisticsFailure({
                error: error.message
            })
        );
        toast.error("Fetch Song Statistics Error");
    }
}

// Post songs
const postSongFun = (value: object): Promise<AxiosResponse<object>> => axios.post<object>(`${URL_BASE}/song`, value);

function* postSong(action) {
    try {
        const response: AxiosResponse<object> = yield call(postSongFun, action.value);
        const songsState: [] = yield select((state) => state.songReducer.songs);
        yield  put(postSongSuccess({
            songs: [...songsState, response.data]
        }));
        toast.success("Song Posted success");
    } catch (error) {
        yield put(
            PostSongFailure({
                error: error.message
            })
        );
        toast.error("Song Posted Error");
    }
}

// Update song
const updateSongApi = (id: string, value: object): Promise<AxiosResponse<object>> => axios.patch<object>(`${URL_BASE}/song/${id}`, value);

function* updateSong(action) {
    try {
        const response: AxiosResponse<object> = yield call(updateSongApi, action.id, action.value);
        const songsState: [] = yield select((state: RootReducerState) => state.songReducer.songs);
        yield  put(updateSongSuccess({
            song: songsState?.map(item => item._id === response.data._id ? response.data : item )
        }));
        toast.success("Song Updated success!");
    } catch (error: unknown) {
        yield put(
            updateSongFailure({
                error: error.message
            })
        );
        toast.error(error.message);
    }
}

// Delete song 
const delSong = (id: string): Promise<AxiosResponse<object>> => axios.delete(`${URL_BASE}/song/${id}`);

function* deleteSong(action) {
    try {
        const response: AxiosResponse<object> = yield call(delSong, action.id);
        const songsState: [object] = yield select((state: RootReducerState) => state.songReducer.songs);
        console.log(songsState ,"songsState");
        yield  put(deleteSongSuccess({
            songs: songsState?.filter(item => item._id !== response.data._id)
        }));
        toast.success("Song Deleted success!");
    } catch (error: unknown) {
        yield put(
            DeleteSongFailure({
                error: error.message
            })
        );
        toast.error(error.message);
    }
}

function* songsSaga() {
    yield all([
        takeLatest(songTypes.FETCH_SONGS_REQUEST, fetchSongsSaga),
        takeLatest(songTypes.FETCH_SONG_REQUEST, fetchSongSaga),
        takeLatest(songTypes.FETCH_SONGS_STATISTICS_REQUEST, fetchSongStatistics),
        takeLatest(songTypes.POST_SONG_REQUEST, postSong),
        takeLatest(songTypes.DELETE_SONG_REQUEST, deleteSong),
        takeLatest(songTypes.UPDATE_SONG_REQUEST, updateSong),
        takeLatest(songTypes.FETCH_SONGS_ALBUM_REQUEST,  fetchSongsPerAlbumSaga),
        takeLatest(songTypes.FETCH_SONGS_ARTIST_REQUEST,  fetchSongsPerArtistSaga),
        takeLatest(songTypes.FETCH_SONGS_GENRE_REQUEST,  fetchSongsPerGenreSaga)
    ]);
}

export default songsSaga;
