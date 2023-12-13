/* eslint-disable react-refresh/only-export-components */
/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useEffect, useState } from 'react'
import { fetchSongsPerAlbum, fetchSongsPerArtist } from '../Store/Songs/songAction';
import { Dispatch } from 'redux';
import { connect } from 'react-redux';
import SongBy from '../Components/SongBy/SongBy';

interface Song {
  _id:string
  }
  
  interface Artist {
    artistName: string;
    songs: Song[];
  }
  
  interface RootState {
    songReducer: {
      songsPerArtist: Artist[];
      pending: boolean;
      error: string; // Replace with the actual type
    };
  }
  
  interface SongByArtistProps {
    songsPerArtist: Artist[];
    pending: boolean;
    error: string; 
    fetchSongsPerArtist: () => void;
  }
  
function SongByArtist({
    songsPerArtist,
  pending,
  error,
  fetchSongsPerArtist,
}:SongByArtistProps) {

    useEffect(() => {
        fetchSongsPerArtist();
      }, []);
    
      const [activeKey, setActiveKey] = useState<string[]>([]);
      const handlePanelChange = (keys: string[]) => {
        setActiveKey(keys);
      };
    
      const columns = [
        { title: 'Title', dataIndex: 'title', key: 'title' },
        { title: 'Artist', dataIndex: 'artist', key: 'artist' },
        { title: 'Album', dataIndex: 'album', key: 'album' },
        { title: 'Genre', dataIndex: 'genre', key: 'genre' },
      ];

  return (
    <div className='min-h-screen bg-gray-50 p-4 overflow-x-scroll'>
    <div className="font-semibold mb-6 ml-2">List of Artists</div>
  <SongBy pending={pending} activeKey={activeKey} columns={columns} data={songsPerArtist} handlePanelChange={handlePanelChange} titleKey={'artistName'} />
</div>
  )
}
const mapStateToProps = (state: RootState) => ({
    songsPerArtist: state.songReducer.songsPerArtist,
    pending: state.songReducer.pending,
    error: state.songReducer.error,
  });
  
  const mapDispatchToProps = (dispatch) => ({
    fetchSongsPerArtist: () => dispatch(fetchSongsPerArtist()),
  });
  
  export default connect(mapStateToProps, mapDispatchToProps)(SongByArtist);
  