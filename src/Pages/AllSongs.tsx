import React, { useEffect, useRef, useState } from 'react';
import { Table, Button, Form, Popconfirm, Input } from 'antd';
import { DeleteFilled, EditFilled, PlusOutlined, SearchOutlined } from "@ant-design/icons";
import { Dispatch } from 'redux';
import { deleteSong, fetchSongsRequest, postSong, updateSong } from '../Store/Songs/songAction';
import { connect } from 'react-redux';
import Highlighter from 'react-highlight-words';
import UpdateSongsModal from '../Components/Modals/UpdateSongsModal';
import PostSongsModal from '../Components/Modals/PostSongsModal';

const AllSongs = ({
  songs,
  pending,
  error,
  postSong,
  updateSong,
  deleteSong,
  fetchSongsRequest
}) => {
  const [data, setData] = useState(songs);
  const [searchText, setSearchText] = useState('');

  useEffect(() => {
    fetchSongsRequest();
  }, []);

  useEffect(() => {
    setData(songs);
  }, [songs]);

  const [addModalVisible, setAddModalVisible] = useState(false);
  const [updateModalVisible, setUpdateModalVisible] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);

  const [form] = Form.useForm();

  const columns = [
    { title: 'ID', dataIndex: '_id', key: '_id' },
    { title: 'Title', dataIndex: 'title', key: 'title',
      filterDropdown: ({ setSelectedKeys, selectedKeys, confirm, clearFilters }) => (
        <div style={{ padding: 8 }}>
          <Input
            placeholder="Search Title"
            value={selectedKeys[0]}
            onChange={(e) => setSelectedKeys(e.target.value ? [e.target.value] : [])}
            onPressEnter={() => confirm()}
            style={{ width: 188, marginBottom: 8, display: 'block' }}
          />
          <Button
            type="primary"
            onClick={() => confirm()}
            size="small"
            style={{ width: 90, marginRight: 8 }}
          >
            Search
          </Button>
          <Button onClick={() => clearFilters()} size="small" style={{ width: 90 }}>
            Reset
          </Button>
        </div>
      ),
      filterIcon: (filtered) => <SearchOutlined style={{ color: filtered ? '#1890ff' : undefined }} />,
      onFilter: (value, record) => record.title.toLowerCase().includes(value.toLowerCase()),
      onFilterDropdownVisibleChange: (visible) => {
        if (visible) {
          setTimeout(() => searchInput.select());
        }
      },
      render: (text) => (searchText ? <Highlighter searchWords={[searchText]} textToHighlight={text} /> : text),
    },
    { title: 'Genre', dataIndex: 'genre', key: 'genre' },
    { title: 'Album', dataIndex: 'album', key: 'album' },
    { title: 'Artist', dataIndex: 'artist', key: 'artist' },
    {
      title: 'Action',
      key: 'action',
      render: (_: undefined, record: object) => (
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

  const showUpdateModal = (record) => {
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
        updateSong(selectedItem?._id, values);
      })
      .catch((errorInfo) => {
        console.log('Validation failed:', errorInfo);
      })
      .finally(()=>{
        setUpdateModalVisible(false)
      })
  };

  const confirmDelete = (itemId) => {
    deleteSong(itemId);
  };

  const paginationConfig = {
    pageSize: 10,
    total: data.length,
    showSizeChanger: false,
  };

  const searchInput = useRef();

  return (
    <div className='min-h-screen bg-gray-50 p-4 overflow-x-scroll'>
      <div className="flex justify-between items-center pb-4">
        <div className="flex">
          {/* Filter */}
          <Input
            ref={searchInput}
            placeholder="Search"
            onChange={(e) => setSearchText(e.target.value)}
            style={{ width: 200, marginRight: 8 }}
          />
        </div>
        <Button className='flex justify-center items-center bg-[#3498db] text-[#ffffff] border-[#3498db] hover:bg-[#2980b9] hover:border-[#2980b9] hover:text-blue-400' type="primary" onClick={showAddModal}>
          <PlusOutlined />
        </Button>
      </div>
      <Table
        columns={columns}
        dataSource={data}
        loading={pending}
        rowKey="_id"
        pagination={paginationConfig}
        onChange={(pagination, filters, sorter, extra) => {
          const filteredData = data.filter((record) =>
            Object.keys(filters).every((key) => {
              if (!filters[key] || filters[key].length === 0) return true;
              return filters[key].includes(String(record[key]));
            })
          );

          const searchedData = filteredData.filter(
            (record) =>
              record.title.toLowerCase().includes(searchText.toLowerCase()) ||
              record.genre.toLowerCase().includes(searchText.toLowerCase()) ||
              record.album.toLowerCase().includes(searchText.toLowerCase()) ||
              record.artist.toLowerCase().includes(searchText.toLowerCase())
          );

          setData(searchedData);
        }}
      />
      <PostSongsModal addModalVisible={addModalVisible} form={form}
        handleAdd={handleAdd}
        setAddModalVisible={setAddModalVisible}
      />

      <UpdateSongsModal form={form} handleUpdate={handleUpdate} setUpdateModalVisible={setUpdateModalVisible} updateModalVisible={updateModalVisible}/>
    </div>
  );
};

const mapStateToProps = (state: object) => ({
  songs: state.songReducer.songs,
  pending: state.songReducer.pending,
  error: state.songReducer.error,
});

const mapDispatchToProps = (dispatch: Dispatch) => ({
  postSong: (value: object) => dispatch(postSong(value)),
  updateSong: (id: string, value: object) => dispatch(updateSong(id, value)),
  deleteSong: (id: string) => dispatch(deleteSong(id)),
  fetchSongsRequest: () => dispatch(fetchSongsRequest()),
});

export default connect(mapStateToProps, mapDispatchToProps)(AllSongs);