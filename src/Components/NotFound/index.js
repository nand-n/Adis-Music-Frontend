import { jsx as _jsx } from "react/jsx-runtime";
import { Result, Button } from 'antd';
import { useNavigate } from 'react-router-dom';
export default function NotFound({ entity }) {
    const navigate = useNavigate();
    return (_jsx(Result, { status: "404", title: 'error_404', subTitle: 'Sorry the Page you requested does not exist', extra: _jsx(Button, { type: "primary", onClick: () => {
                navigate(`/${entity?.toLowerCase()}`);
            }, children: "Back" }) }));
}
