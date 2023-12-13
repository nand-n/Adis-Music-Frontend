import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { fetchSongsPerAlbum } from '../Store/Songs/songAction';
import SongBy from '../Components/SongBy/SongBy';

interface Song {
  _id:string,
  title: string;
  artist: string;
  album: string;
  genre: string;
}

interface Album {
  albumTitle: string;
  songs: Song[];
}

interface RootState {
  songReducer: {
    songsPerAlbum: Album[];
    pending: boolean;
    error: string;
  };
}

interface SongByAlbumProps {
  songsPerAlbum: Album[];
  pending: boolean;
  fetchSongsPerAlbum: () => void;
}

function SongByAlbum({
  songsPerAlbum,
  pending,
  fetchSongsPerAlbum,
}: SongByAlbumProps) {
  useEffect(() => {
    fetchSongsPerAlbum();
  }, [fetchSongsPerAlbum]);

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
      <div className="font-semibold mb-6 ml-2">List of Albums</div>
      <SongBy
        pending={pending}
        activeKey={activeKey}
        columns={columns}
        data={songsPerAlbum}
        handlePanelChange={handlePanelChange}
        titleKey={'albumTitle'}
      />
    </div>
  );
}

const mapStateToProps = (state: RootState) => ({
  songsPerAlbum: state.songReducer.songsPerAlbum,
  pending: state.songReducer.pending,
  error: state.songReducer.error,
});

const mapDispatchToProps = (dispatch) => ({
  fetchSongsPerAlbum: () => dispatch(fetchSongsPerAlbum()),
});

export default connect(mapStateToProps, mapDispatchToProps)(SongByAlbum);
