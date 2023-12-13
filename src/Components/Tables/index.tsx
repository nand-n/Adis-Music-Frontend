import { Dropdown, Table } from 'antd';
import { EllipsisOutlined, EyeOutlined } from '@ant-design/icons';
import useResponsiveTable from '../../Hooks/useResponsiveTables';
import React, { useRef } from 'react';
import { ColumnGroupType } from 'antd/es/table';

interface EntityData {
  _id: string;
  result?: number;
  isLoading: boolean;
  entity: string;
  title: string;
}

interface DataTableColumn {
  title: string;
  dataIndex: string;
  key: string;
  render?: (value: string, record: EntityData, index: number) => React.ReactNode;
}

interface DataTableProps {
  datas: {
    result: EntityData[];
    isLoading: boolean;
    isSuccess: boolean;
  };
  dataTableColumns: DataTableColumn[];
  entity: string;
}

const RecentTable: React.FC<DataTableProps> = ({ dataTableColumns, datas }) => {
  const items = [
    {
      label: 'Show',
      key: 'read',
      icon: <EyeOutlined />,
    },
  ];

  const handleRead = (record: EntityData) => {
    console.log(record);
  };

  const newDataTableColumns: (DataTableColumn | ColumnGroupType<EntityData>)[] = [
    ...dataTableColumns,
    {
      title: '',
      key: 'action',
      dataIndex: 'action', // Add this line with a dataIndex
      render: (_, record) => (
        <Dropdown
          menu={{
            items,
            onClick: ({ key }) => {
              switch (key) {
                case 'read':
                  handleRead(record);
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

  console.log(datas, 'datasdatasdatas');

  const { result, isLoading, isSuccess } = datas;

  const firstFiveItems = () => {
    if (isSuccess && result) return result.slice(0, 5);
    return [];
  };

  const tableHeader = useRef<HTMLDivElement>(null);

  const { tableColumns } = useResponsiveTable(newDataTableColumns, firstFiveItems());

  return (
    <div ref={tableHeader}>
      <Table<EntityData>
        columns={tableColumns as [] as (DataTableColumn)[]}
        rowKey={(item) => item._id}
        dataSource={isSuccess && result}
        loading={isLoading}
      />
    </div>
  );
};

export default RecentTable;
