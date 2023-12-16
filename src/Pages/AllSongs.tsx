/* eslint-disable @typescript-eslint/no-unused-vars */

import React, { useEffect, useState } from 'react';
import { Table, Button, Form, Popconfirm } from 'antd';
import { DeleteFilled, EditFilled, PlusOutlined } from "@ant-design/icons";
import { deleteSong, fetchSongsRequest, postSong, updateSong } from '../Store/Songs/songAction';
import { connect } from 'react-redux';
import UpdateSongsModal from '../Components/Modals/UpdateSongsModal';
import PostSongsModal from '../Components/Modals/PostSongsModal';

interface Song {
  _id: string;
  title: string;
  genre: string;
  album: string;
  artist: string;
}

interface AllSongsProps {
  songs: Song[];
  pending: boolean;
  error: string;
  postSong: (value: object) => void;
  updateSong: (id: string, value: object) => void;
  deleteSong: (id: string) => void;
  fetchSongsRequest: () => void;
}

const AllSongs: React.FC<AllSongsProps> = ({
  songs,
  pending,
  postSong,
  updateSong,
  deleteSong,
  fetchSongsRequest
}) => {
  const [data, setData] = useState<Song[]>(songs);
  
  useEffect(() => {
    fetchSongsRequest();
  }, []);

  useEffect(() => {
    setData(songs);
  }, [songs]);

  const [addModalVisible, setAddModalVisible] = useState<boolean>(false);
  const [updateModalVisible, setUpdateModalVisible] = useState<boolean>(false);
  const [selectedItem, setSelectedItem] = useState<Song | null>(null);

  const [form] = Form.useForm();

  const columns = [
    { title: 'ID', dataIndex: '_id', key: '_id' },
    { title: 'Title', dataIndex: 'title', key: 'title', },
    { title: 'Genre', dataIndex: 'genre', key: 'genre' },
    { title: 'Album', dataIndex: 'album', key: 'album' },
    { title: 'Artist', dataIndex: 'artist', key: 'artist' },
    {
      title: 'Action',
      key: 'action',
      render: (_: undefined, record: Song) => (
        <span className="flex items-center gap-2 justify-start">
          <div onClick={() => showUpdateModal(record)}><EditFilled /></div>
          <span> | </span>
          <Popconfirm
            title="Are you sure you want to delete this song?"
            onConfirm={() => confirmDelete(record._id)}
            okText="Yes"
            cancelText="No"
            okButtonProps={{
              className: "text-[#000] hover:text-[#fff] border-gray-300 "
            }}
          >
            <a><DeleteFilled className="text-red-400 hover:text-red-600" /></a>
          </Popconfirm>
        </span>
      ),
    },
  ];

  const showAddModal = () => {
    setAddModalVisible(true);
  };

  const handleAdd = () => {
    form
      .validateFields()
      .then((values) => {
        postSong(values);
      })
      .catch((errorInfo) => {
        console.log('Validation failed:', errorInfo);
      });
  };

  const showUpdateModal = (record: Song) => {
    setUpdateModalVisible(true);
    setSelectedItem(record);

    form.setFieldsValue({
      title: record.title,
      artist: record.artist,
      genre: record.genre,
      album: record.album,
    });
  };

  const handleUpdate = () => {
    form
      .validateFields()
      .then((values) => {
        updateSong(selectedItem?._id || '', values);
      })
      .catch((errorInfo) => {
        console.log('Validation failed:', errorInfo);
      })
      .finally(()=>{
        setUpdateModalVisible(false)
      })
  };

  const confirmDelete = (itemId: string) => {
    deleteSong(itemId);
  };

  const paginationConfig = {
    pageSize: 10,
    total: data.length,
    showSizeChanger: false,
  };

  return (
    <div className='min-h-screen bg-gray-50 p-4 sm:overflow-x-scroll'>
    <div className="container mx-auto">
      <div className="flex justify-between items-center pb-4">
        <div className="font-semibold text-lg">
          All Songs
        </div>
        <Button className='flex justify-center items-center bg-[#3498db] text-[#ffffff] border-[#3498db] hover:bg-[#2980b9] hover:border-[#2980b9] hover:text-blue-400' type="primary" onClick={showAddModal}>
          <PlusOutlined />
        </Button>
      </div>
    </div>
    <Table
      columns={columns}
      dataSource={data}
      loading={pending}
      rowKey="_id"
      pagination={paginationConfig}
      scroll={{ x: true }}
    />
    <PostSongsModal addModalVisible={addModalVisible} form={form}
      handleAdd={handleAdd}
      setAddModalVisible={setAddModalVisible}
    />
    <UpdateSongsModal form={form} handleUpdate={handleUpdate} setUpdateModalVisible={setUpdateModalVisible} updateModalVisible={updateModalVisible}/>
  </div>
  );
};

const mapStateToProps = (state) => ({
  songs: state.songReducer.songs,
  pending: state.songReducer.pending,
  error: state.songReducer.error,
});

const mapDispatchToProps = (dispatch) => ({
  postSong: (value: object) => dispatch(postSong(value)),
  updateSong: (id: string, value: object) => dispatch(updateSong(id, value)),
  deleteSong: (id: string) => dispatch(deleteSong(id)),
  fetchSongsRequest: () => dispatch(fetchSongsRequest()),
});

export default connect(mapStateToProps, mapDispatchToProps)(AllSongs);
