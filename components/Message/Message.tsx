import { useState } from 'react';
import { Snackbar, Alert } from '@mui/material';

interface IMessageProps {
    content?: any;
    duration?: any;
    type?: any;
}

function Message(props: IMessageProps) {
    const { content = '', duration = null, type } = {...props};
    // 开关控制：默认true,调用时会直接打开
    const [open, setOpen] = useState(true);
    // 关闭消息提示
    const handleClose = (event, reason) => {
        setOpen(false);
    };
    return (
        <Snackbar open={open} autoHideDuration={duration} anchorOrigin={{ vertical: 'top', horizontal: 'center' }} onClose={handleClose}>
            <Alert severity={type} variant="standard">
                {content}
            </Alert>
        </Snackbar>
    );
}

export default Message;