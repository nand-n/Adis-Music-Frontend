import { jsx as _jsx } from "react/jsx-runtime";
import { Spin } from 'antd';
const PageLoader = () => {
    return (_jsx("div", { className: "centerAbsolute", children: _jsx(Spin, { size: "large" }) }));
};
export default PageLoader;
