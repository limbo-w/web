import { createRoot } from 'react-dom/client';
import GOModels from './share';
const models = {
    dom: null,
    share({ content, duration = 1500 }) {
        // 创建一个dom
        this.dom = document.createElement('div');
        // 定义组件，
        const JSXdom =
            <GOModels link={content} content={content} duration={duration} type="success"></GOModels>;
        createRoot(this.dom).render(JSXdom);
        document.body.appendChild(this.dom);
    },
    destroy() {
        document.getElementById('share-modal-container').parentElement.remove()
    }

};

export default models;