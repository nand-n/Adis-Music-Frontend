import { AlibabaOutlined, PlayCircleFilled, UserOutlined } from '@ant-design/icons';
import { Form, Input, Modal } from 'antd';
import React from 'react'

function PostSongsModal(
  {
    addModalVisible,
setAddModalVisible,
form,
handleAdd
  }
) {
  return (
    <Modal
    title="Add Song"
    open={addModalVisible}
    onCancel={() => {
      setAddModalVisible(false);
      form.resetFields();
    }}
    onOk={handleAdd}
    okButtonProps={{
      className:"text-[#000] hover:text-[#fff] border-gray-300 "
    }}
  >
    <Form
      form={form}
      name="postSong"
      className="login-form"
      initialValues={{
        remember: true,
      }}
    >
      <Form.Item
        name="title"
        rules={[
          {
            required: true,
            message: 'Please enter the song title!',
          },
        ]}
      >
        <Input
          prefix={<PlayCircleFilled className="site-form-item-icon" />}
          placeholder="Song Title"
          size="large"
        />
      </Form.Item>
      <Form.Item
        name="artist"
        rules={[
          {
            required: true,
            message: 'Please enter the artist name!',
          },
        ]}
      >
        <Input
          prefix={<UserOutlined className="site-form-item-icon" />}
          type="text"
          placeholder="Artist Name"
          size="large"
        />
      </Form.Item>
      <Form.Item
        name="album"
        rules={[
          {
            required: true,
            message: 'Please enter the album name!',
          },
        ]}
      >
        <Input
          type='text'
          prefix={<AlibabaOutlined className="site-form-item-icon" />}
          placeholder="Album"
          size="large"
        />
      </Form.Item>
      <Form.Item
        name="genre"
        rules={[
          {
            required: true,
            message: 'Please enter the genre!',
          },
        ]}
      >
        <Input
          type='text'
          prefix={<PlayCircleFilled className="site-form-item-icon" />}
          placeholder="Genre"
          size="large"
        />
      </Form.Item>
    </Form>
  </Modal>


  )
}

export default PostSongsModal