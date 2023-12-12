import {  Dropdown, Table } from 'antd';
import { EllipsisOutlined, EyeOutlined, FilePdfOutlined } from '@ant-design/icons';
import useResponsiveTable from '../../Hooks/useResponsiveTables';

export default function RecentTable({  dataTableColumns ,datas } ,) {

  const items = [
    {
      label: 'Show',
      key: 'read',
      icon: <EyeOutlined />,
    },
    {
      label: 'Download',
      key: 'download',
      icon: <FilePdfOutlined />,
    },
  ];
  const handleRead = (record) => {
  };
  const handleDownload = (record) => {
  };

  dataTableColumns = [
    ...dataTableColumns,
    {
      title: '',
      key: 'action',
      render: (_, record) => (
        <Dropdown
          menu={{
            items,
            onClick: ({ key }) => {
              switch (key) {
                case 'read':
                  handleRead(record);
                  break;
                case 'download':
                  handleDownload(record);
                  break;

                default:
                  break;
              }
            },
          }}
          trigger={['click']}
        >
          <EllipsisOutlined
            style={{ cursor: 'pointer', fontSize: '24px' }}
            onClick={(e) => e.preventDefault()}
          />
        </Dropdown>
      ),
    },
  ];
console.log(datas ,"datasdatasdatas");
  const { result, isLoading, isSuccess } = datas
  const firstFiveItems = () => {
    if (isSuccess && result) return result.slice(0, 5);
    return [];
  };

  const { tableColumns, tableHeader } = useResponsiveTable(
    dataTableColumns,
    firstFiveItems()
  );

  return (
    <div ref={tableHeader}>
       <Table
        columns={tableColumns}
        rowKey={(item) => item._id}
        dataSource={isSuccess && result}
        pagination={true}
        loading={isLoading}
      />
    </div>
  );
}
