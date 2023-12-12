import { songTypes } from "./songActionTypes";

export interface SongsState {
    pending:boolean;
    songs:[];
    song:object,
    statistics:object,
    error:string | null;
}

//FETCH MANY SONGS
export interface FetchSongsSuccessPayload {
    songs:[]
}
export interface FetchSongsFailurepayload {
    error:string
}
export interface FetchSongsRequest {
    type:typeof songTypes.FETCH_SONGS_REQUEST
}

export type FetchSongsSuccess ={
    type:typeof songTypes.FETCH_SONGS_SUCCESS,
    payload:FetchSongsSuccessPayload
}
export type FetchSongsFailure ={
    type:typeof songTypes.FETCH_SONGS_FAILURE,
    payload:FetchSongsFailurepayload 
}


//SINGLE SONG FETCH TYPES
export interface FetchSongSuccessPayload {
    song:[]
}
export interface FetchSongFailurepayload {
    error:string
}
export interface FetchSongRequest {
    type:typeof songTypes.FETCH_SONG_REQUEST,
    id:string
}

export type FetchSongSuccess ={
    type:typeof songTypes.FETCH_SONG_SUCCESS,
    payload:FetchSongSuccessPayload
}
export type FetchSongFailure ={
    type:typeof songTypes.FETCH_SONG_FAILURE,
    payload:FetchSongFailurepayload 
}
//FETCH STATISTICS 
export interface FetchStatisticsPayload {
    statistics:object
}
export interface FetchStatisticsFaliurePayload {
    error:string
}
export interface FetchStatisticsRequest {
    type:typeof songTypes.FETCH_SONGS_STATISTICS_REQUEST,
}
export type FetchStatisticsSuccess = {
    type:typeof songTypes.FETCH_SONGS_STATISTICS_SUCCESS,
    payload:FetchStatisticsPayload
}
export type FetchStatisticsFailure ={
    type:typeof songTypes.FETCH_SONGS_STATISTICS_FAILURE,
    payload:FetchStatisticsFaliurePayload
}

//CREATE SONG
export interface PostSongSuccessPayload {
    songs:object
}
export interface PostSongFailurePayload {
    error:string
}
export  interface PostSongRequest {
    type:typeof songTypes.POST_SONG_REQUEST,
    value:object
}
export type PostSongSuccess ={
    type: typeof songTypes.POST_SONG_SUCCESS,
    payload:PostSongSuccessPayload
}
export type PostSongFailure ={
    type:typeof songTypes.POST_SONG_FAILURE,
    payload:PostSongSuccessPayload
}

//UPDATE SONG
export interface UpdateSongSuccessPayload {
    song:object
}
export interface UpdateSongFailurePayload {
    error:string
}
export  interface UpdateSongRequest {
    type:typeof songTypes.UPDATE_SONG_REQUEST,
    id:string,
    value:object
}
export type UpdateSongSuccess ={
    type: typeof songTypes.UPDATE_SONG_SUCCESS,
    payload:UpdateSongSuccessPayload
}
export type UpdateSongFailure ={
    type:typeof songTypes.UPDATE_SONG_FAILURE,
    payload:UpdateSongSuccessPayload
}
//DELETE SONG

export interface DeleteSongSuccessPayload {
    songs:[]
}
export interface DeleteSongFailurepayload {
    error:string
}
export interface DeleteSongRequest {
    type:typeof songTypes.DELETE_SONG_REQUEST,
    id:string
}

export type DeleteSongSuccess ={
    type:typeof songTypes.DELETE_SONG_SUCCESS,
    payload:DeleteSongSuccessPayload
}
export type DeleteSongFailure ={
    type:typeof songTypes.DELETE_SONG_FAILURE,
    payload:DeleteSongFailurepayload 
}

export type SongsActions =
    | FetchSongsRequest
    | FetchSongsSuccess
    | FetchSongsFailure
    | FetchSongRequest
    | FetchSongSuccess
    | FetchSongFailure
    | FetchStatisticsRequest
    | FetchStatisticsSuccess
    | FetchStatisticsFailure
    | PostSongRequest
    | PostSongSuccess
    | PostSongFailure
    | UpdateSongRequest
    | UpdateSongSuccess
    | UpdateSongFailure
    | DeleteSongRequest
    | DeleteSongSuccess
    | DeleteSongFailure;