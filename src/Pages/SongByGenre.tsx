/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { fetchSongsPerGenre } from '../Store/Songs/songAction';
import SongBy from '../Components/SongBy/SongBy';
interface Song {
  _id: string;
  title: string;
  artist: string;
  album: string;
  genre: string;
}
interface Genre {
  genreTitle: string;
  songs: Song[];
}
interface RootState {
  songReducer: {
    songsPerGenre: Genre[];
    pending: boolean;
    error: string;
  };
}
interface SongByAlbumProps {
  songsPerGenre: Genre[];
  pending: boolean;
  error: string;
  fetchSongsPerGenre: () => void;
}

function SongByGenre({
  songsPerGenre,
  pending,
  error,
  fetchSongsPerGenre,
}: SongByAlbumProps) {
  useEffect(() => {
    fetchSongsPerGenre();
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
      <div className="font-semibold mb-6 ml-2">List of Genre</div>
      <SongBy
        pending={pending}
        activeKey={activeKey}
        columns={columns}
        data={songsPerGenre}
        handlePanelChange={handlePanelChange}
        titleKey={'genreName'} 
      />
    </div>
  );
}

const mapStateToProps = (state: RootState) => ({
  songsPerGenre: state.songReducer.songsPerGenre,
  pending: state.songReducer.pending,
  error: state.songReducer.error,
});

const mapDispatchToProps = (dispatch) => ({
  fetchSongsPerGenre: () => dispatch(fetchSongsPerGenre()),
});

export default connect(mapStateToProps, mapDispatchToProps)(SongByGenre);
