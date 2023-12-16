import React from 'react';
import { Spin } from 'antd';

const PageLoader = () => {
  return (
    <div className="w-full h-screen flex justify-center items-center">
      <Spin size="large" />
    </div>
  );
};
export default PageLoader;
