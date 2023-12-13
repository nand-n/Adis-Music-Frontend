/* eslint-disable @typescript-eslint/no-unused-vars */
import { connect } from "react-redux";
import SummaryCard from "../Components/Cards/SummeryCard";
import { fetchSongRequest, fetchSongStatistics, fetchSongsRequest } from "../Store/Songs/songAction";
import { Dispatch } from "redux";
import { useEffect } from "react";
import { Col, Row } from "antd";
import RecentTable from "../Components/Tables";
interface EntityData {
  _id: string
  result?: number;
  isLoading: boolean;
  entity: string;
  title: string;
}

interface DataTableColumn {
  title: string;
  dataIndex: string;
  key: string;
}

interface DashboardProps {
  statistics: {
    totalSongs?: number;
    totalAlbums?: number;
    totalArtists?: number;
    totalGenres?: number;
    songsPerArtist?: EntityData[];
    songsPerGenre?: EntityData[];
    songsPerAlbum?: EntityData[];
  };
  pending: boolean;
  error: string; // Replace 'unknown' with a more specific type if available
  fetchSongsRequest: () => void;
  fetchSongStatistics: () => void;
}


function Dashboard({
statistics,
pending,
error,
fetchSongsRequest,
fetchSongStatistics
}:DashboardProps) {

  useEffect(()=>{
    fetchSongsRequest()
    fetchSongStatistics()
  },[])
  

  const dataTableColumns:DataTableColumn[] = [
    {
      title: 'Name',
      dataIndex: '_id',
      key: '_id',
    },
    {
      title: 'Count',
      dataIndex: 'count',
      key: 'count',
    },
  ];
  const entityData = [
    {
      result: statistics?.totalSongs,
      isLoading: pending,
      entity: 'totalSongs',
      title: 'Total Songs',
    },
    {
      result: statistics?.totalAlbums,
      isLoading: pending,
      entity: 'totalAlbums',
      title: 'Total Albums',
    },
    {
      result: statistics?.totalArtists,
      isLoading: pending,
      entity: 'totalArtists',
      title: 'Total Artists',
    },
    {
      result: statistics?.totalGenres,
      isLoading: pending,
      entity: 'totalGenres',
      title: 'Total Genres',
    }
    
  ];

  return (
    <div className="min-h-screen bg-gray-50 p-4">
      <Row gutter={[32, 32]}>

     { entityData.map((data, index) => {
    const { result, entity, isLoading } = data;

    return (
      <SummaryCard
        key={index}
        title={data?.title}
        tagColor={
          entity === 'totalSongs' ? 'cyan' : entity === 'totalAlbums' ? 'purple' : entity === 'totalArtists' ? 'red': 'green'
        }
        prefix={'Statistics'}
        isLoading={isLoading}
        tagContent={result }
      />
    );
  })}
  </Row>
  <div className="mt-8"></div>
  <Row gutter={[32, 32]}>
        <Col className="gutter-row w-full" sm={{ span: 24 }} lg={{ span: 12 }}>
          <div className="whiteBox shadow p-[20px]" style={{ height: '100%' }}>
            <h3 style={{ color: '#22075e', marginBottom: 5, padding: '0 20px 20px' }}>
            Number of Songs Per Artist
            </h3>

            <RecentTable datas={{
               result:statistics?.songsPerArtist ,
               isLoading:pending,
               isSuccess:!pending
              }} entity={'songs'} dataTableColumns={dataTableColumns} />
          </div>IntrinsicAttributes
        </Col>


        <Col className="gutter-row w-full" sm={{ span: 24 }} lg={{ span: 12 }}>
          <div className="whiteBox shadow p-[20px]" style={{ height: '100%' }}>
            <h3 style={{ color: '#22075e', marginBottom: 5, padding: '0 20px 20px' }}>
              Songs Per Genere
            </h3>
            <RecentTable datas={{
               result:statistics?.songsPerGenre,
               isLoading:pending,
               isSuccess:!pending
              }} entity={'quote'} dataTableColumns={dataTableColumns} />
          </div>
        </Col>
      </Row>
      <div className="mt-8"></div>

      <Row gutter={[32, 32]}>
        <Col className="gutter-row w-full" sm={{ span: 24 }} lg={{ span: 12 }}>
          <div className="whiteBox shadow p-[20px]" style={{ height: '100%' }}>
            <h3 style={{ color: '#22075e', marginBottom: 5, padding: '0 20px 20px' }}>
            Number of Songs Per Albuum
            </h3>

            <RecentTable datas={{
               result:statistics?.songsPerAlbum,
               isLoading:pending,
               isSuccess:!pending
              }} entity={'songs'} dataTableColumns={dataTableColumns} />
          </div>
        </Col>

       
      </Row>
    </div>
  )
}


const mapStateToProps = (state :
   { songReducer: {
      songs: object[];
      song: object;
      statistics: object;
      pending: boolean;
      error: string;
    }
  }) => ({
  songs: state.songReducer.songs,
  song:state.songReducer.song,
  statistics:state.songReducer.statistics,
  pending: state.songReducer.pending,
  error: state.songReducer.error,
});

const mapDispatchToProps = (dispatch) =>({
  fetchSongsRequest:()=>dispatch(fetchSongsRequest()),
  fetchSongRequest:(id:string)=>dispatch(fetchSongRequest(id)),
  fetchSongStatistics:()=>dispatch(fetchSongStatistics())
})
export default connect(mapStateToProps, mapDispatchToProps)(Dashboard);
