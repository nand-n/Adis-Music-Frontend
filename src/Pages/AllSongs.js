import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
/* eslint-disable @typescript-eslint/no-unused-vars */
import { useEffect, useState } from 'react';
import { Table, Button, Form, Popconfirm } from 'antd';
import { DeleteFilled, EditFilled, PlusOutlined } from "@ant-design/icons";
import { deleteSong, fetchSongsRequest, postSong, updateSong } from '../Store/Songs/songAction';
import { connect } from 'react-redux';
import UpdateSongsModal from '../Components/Modals/UpdateSongsModal';
import PostSongsModal from '../Components/Modals/PostSongsModal';
const AllSongs = ({ songs, pending, error, postSong, updateSong, deleteSong, fetchSongsRequest }) => {
    const [data, setData] = useState(songs);
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
        { title: 'Title', dataIndex: 'title', key: 'title', },
        { title: 'Genre', dataIndex: 'genre', key: 'genre' },
        { title: 'Album', dataIndex: 'album', key: 'album' },
        { title: 'Artist', dataIndex: 'artist', key: 'artist' },
        {
            title: 'Action',
            key: 'action',
            render: (_, record) => (_jsxs("span", { className: "flex items-center gap-2 justify-start", children: [_jsx("div", { onClick: () => showUpdateModal(record), children: _jsx(EditFilled, {}) }), _jsx("span", { children: " | " }), _jsx(Popconfirm, { title: "Are you sure you want to delete this song?", onConfirm: () => confirmDelete(record._id), okText: "Yes", cancelText: "No", okButtonProps: {
                            className: "text-[#000] hover:text-[#fff] border-gray-300 "
                        }, children: _jsx("a", { children: _jsx(DeleteFilled, { className: "text-red-400 hover:text-red-600" }) }) })] })),
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
            updateSong(selectedItem?._id || '', values);
        })
            .catch((errorInfo) => {
            console.log('Validation failed:', errorInfo);
        })
            .finally(() => {
            setUpdateModalVisible(false);
        });
    };
    const confirmDelete = (itemId) => {
        deleteSong(itemId);
    };
    const paginationConfig = {
        pageSize: 10,
        total: data.length,
        showSizeChanger: false,
    };
    return (_jsxs("div", { className: 'min-h-screen bg-gray-50 p-4 sm:overflow-x-scroll', children: [_jsxs("div", { className: "flex justify-between items-center pb-4", children: [_jsx("div", { className: "flex" }), _jsx(Button, { className: 'flex justify-center items-center bg-[#3498db] text-[#ffffff] border-[#3498db] hover:bg-[#2980b9] hover:border-[#2980b9] hover:text-blue-400', type: "primary", onClick: showAddModal, children: _jsx(PlusOutlined, {}) })] }), _jsx(Table, { columns: columns, dataSource: data, loading: pending, rowKey: "_id", pagination: paginationConfig, onChange: (pagination, filters, sorter, extra) => {
                    const filteredData = data.filter((record) => Object.keys(filters).every((key) => {
                        if (!filters[key] || filters[key].length === 0)
                            return true;
                        return filters[key].includes(String(record[key]));
                    }));
                } }), _jsx(PostSongsModal, { addModalVisible: addModalVisible, form: form, handleAdd: handleAdd, setAddModalVisible: setAddModalVisible }), _jsx(UpdateSongsModal, { form: form, handleUpdate: handleUpdate, setUpdateModalVisible: setUpdateModalVisible, updateModalVisible: updateModalVisible })] }));
};
const mapStateToProps = (state) => ({
    songs: state.songReducer.songs,
    pending: state.songReducer.pending,
    error: state.songReducer.error,
});
const mapDispatchToProps = (dispatch) => ({
    postSong: (value) => dispatch(postSong(value)),
    updateSong: (id, value) => dispatch(updateSong(id, value)),
    deleteSong: (id) => dispatch(deleteSong(id)),
    fetchSongsRequest: () => dispatch(fetchSongsRequest()),
});
export default connect(mapStateToProps, mapDispatchToProps)(AllSongs);
