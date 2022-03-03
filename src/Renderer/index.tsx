import React from 'react';
import styles from './index.less';

interface Iprops {}

const Renderer: React.FC<Iprops> = () => {
    return <div className={styles.container}>
        {'This is First Components position!!!'}
    </div>
};

export default Renderer;