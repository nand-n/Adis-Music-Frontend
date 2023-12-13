import { Collapse, Table } from 'antd';
import React, { ReactNode } from 'react';

const { Panel } = Collapse;

interface Song {
  _id: string;
}

interface DataItem {
  title: string;
  songs: Song[];
  // Define other properties in your data objects
}

interface SongByProps {
  data: DataItem[];
  activeKey: string[] | number;
  handlePanelChange: (keys: string[] | number[]) =>()=> void;
  columns: { title: string; dataIndex: string; key: string }[]; 
  titleKey: string; 
  pending:boolean
}

function SongBy({ data, activeKey, handlePanelChange, columns, titleKey , pending }: SongByProps): ReactNode {
  const paginationConfig = {
    pageSize: 10,
    total: data.length,
    showSizeChanger: false,
  };

  return (
    <Collapse  accordion activeKey={activeKey} onChange={handlePanelChange}>
      {data.map((item, index) => (
        <Panel
          key={index}
          header={
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <div>
                <p>{item[titleKey]}</p>
              </div>
            </div>
          }
        >
          <Table loading={pending} columns={columns} dataSource={item.songs} rowKey="_id" pagination={paginationConfig} />
        </Panel>
      ))}
    </Collapse>
  );
}

export default SongBy;


