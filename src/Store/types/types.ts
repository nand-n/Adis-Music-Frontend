// import { IPost } from "../../models/IPost";
// import { postTypes } from "../Actiontypes/postsTypes";

import { postTypes } from "../actionTypes/postsTypes";
import { IPost } from "../models/IPost";

export interface PostsState {
  pending: boolean;
  posts: [];
  error: string | null;
}
export interface SongState {
  pending: boolean;
  songs: [];
  error: string | null;
}

export interface FetchPostsSuccessPayload {
  posts: IPost[];
}

export interface FetchPostsFailurePayload {
  error: string;
}
export interface FetchSongsSuccessPayload {
  songs:[]
}
export interface FetchSongsFailerPayload {
  error:string
}
export interface FetchPostsRequest {
  type: typeof postTypes.FETCH_POST_REQUEST;
}

export type FetchPostsSuccess = {
  type: typeof postTypes.FETCH_POST_SUCCESS;
  payload: FetchPostsSuccessPayload;
};

export type FetchPostsFailure = {
  type: typeof postTypes.FETCH_POST_FAILURE;
  payload: FetchPostsFailurePayload;
};

export type PostsActions =
  | FetchPostsRequest
  | FetchPostsSuccess
  | FetchPostsFailure

