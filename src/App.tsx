// /* eslint-disable @typescript-eslint/no-unused-vars */
// import { useEffect, useState } from 'react'
// // import './App.css'
// import { connect } from 'react-redux'
// import { Dispatch, bindActionCreators } from 'redux';
// import { RootState } from './Store/reducers/rootReducer';
// import { useSelector } from 'react-redux';
// import { fetchPostsRequest } from './Store/actions/postsActions/postsAction';
// import { PostsState } from './Store/types/types';
// import { useDispatch } from 'react-redux';
// import { fetchSongRequest, fetchSongStatistics, fetchSongsRequest } from './Store/Songs/songAction';

// function App(
//   {posts,pending ,error ,fetchPostsRequest ,song,
//     fetchSongRequest,statistics,
//     fetchSongStatistics}
//   ) {
//   useEffect(() => {
//     fetchPostsRequest();
//     fetchSongStatistics()
//   }, []);
//   console.log(statistics,"statistics");

//   return (
//     <div>
//       {pending ? (
//         <div>Loading...</div>
//       ) : error ? (
//         <div>Error</div>
//       ) : (
//         posts?.map((todo:object, index:number) => (
//           <div key={index}>
//             <div className="flex justify-center items-center ml-20">
//             {++index}. 
//             <button
//             onClick={()=>fetchSongRequest(todo._id)}
//             >
//             {todo.title} 

//             </button>
//               </div>  
             
//           </div>
//         ))
//       )}


//     </div>
//   );
// }

// const mapStateToProps = (state) => ({
//   posts: state.songReducer.songs,
//   song:state.songReducer.song,
//   statistics:state.songReducer.statistics,
//   pending: state.songReducer.pending,
//   error: state.songReducer.error,
// });

// const mapDispatchToProps = (dispatch: Dispatch) =>({
//   fetchPostsRequest:()=>dispatch(fetchSongsRequest()),
//   fetchSongRequest:(id)=>dispatch(fetchSongRequest(id)),
//   fetchSongStatistics:()=>dispatch(fetchSongStatistics())
// })
// export default connect(mapStateToProps, mapDispatchToProps)(App);


import { Layout } from 'antd'
import Navigation from './Components/Sidebar'
// import { Content } from 'antd/es/layout/layout'
import useIsMobile from './Hooks/isMobile';
import AppRouter from './Routes/AppRouter';

function App() {

  const { Content } = Layout;
  const isMobile = useIsMobile();


  return (
    <Layout hasSider>
      <Navigation />
      {isMobile ? (
        <Layout style={{ marginLeft: 0 }}>
          {/* <HeaderContent /> */}
          <Content
            style={{
              margin: '40px auto 30px',
              overflow: 'initial',
              width: '100%',
              padding: '0 25px',
              maxWidth: 'none',
            }}
          >
            <AppRouter />
          </Content>
        </Layout>
      ) : (
        <Layout style={{ marginLeft: 220 }}>
          {/* <HeaderContent /> */}
          <Content
            style={{
              margin: '40px auto 30px',
              overflow: 'initial',
              width: '100%',
              padding: '0 25px',
              maxWidth: 1100,
            }}
          >
            <AppRouter />
          </Content>
        </Layout>
      )}
    </Layout>
  )
  
}

export default App