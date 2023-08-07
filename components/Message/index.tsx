import { createRoot } from 'react-dom/client';
import Message from './Message';

const message = {
    dom: null,
    success({ content, duration = 1500 }) {
        // 创建一个dom
        this.dom = document.createElement('div');
        // 定义组件，
        const JSXdom = <Message content={content} duration={duration} type="success"></Message>;
        // 渲染DOM
        createRoot(this.dom).render(JSXdom);
        // 置入到body节点下
        document.body.appendChild(this.dom);
    },
    error({ content, duration }:any) {
        this.dom = document.createElement('div');
        const JSXdom = <Message content={content} duration={duration} type="error"></Message>;
        createRoot(this.dom).render(JSXdom);
        document.body.appendChild(this.dom);
    },
    warning({ content, duration }:any) {
        this.dom = document.createElement('div');
        const JSXdom = <Message content={content} duration={duration} type="warning"></Message>;
        createRoot(this.dom).render(JSXdom);
        document.body.appendChild(this.dom);
    },
    info({ content, duration }:any) {
        this.dom = document.createElement('div');
        const JSXdom = <Message content={content} duration={duration} type="warning"></Message>;
        createRoot(this.dom).render(JSXdom);
        document.body.appendChild(this.dom);
    }
};

export default message;