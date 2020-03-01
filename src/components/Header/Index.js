import React, { useState } from 'react';
import { Modal, Icon } from 'antd';
import logo from '../../assets/image/cnodejs.svg'
import './Index.scss'

function Header() {
    const [visible, setVisible] = useState(false);

     /** 隐藏Modal(模态)框 */
    const handleOk = () => {
        setVisible(false)
    }
    /* 显示Modal(模态)框 */
    const showModal = () => {
        setVisible(true)
    }

    return(
        <div className="header">
            <div>
                <a href="/">
                    <img src={logo} alt="logo" />
                </a>
                <a href="javscript:void(0);" className="about" onClick={showModal}>关于</a>
            </div>
            <Modal title="关于本项目" visible={visible} onOk={handleOk} onCancel={handleOk} >
                {/* P.S. 当使用_blank时有一个容易忽略的安全漏洞，需要注意：https://developers.google.com/web/tools/lighthouse/audits/noopener?hl=zh-cn */}
                <p>
                    作者：
                    <a href="javscript:void(0);" rel="nofollow noopener noreferrer" >
                        胡大头
                    </a>
                </p>
                <p>
                    源码：
                    <Icon type="star" theme="twoTone" twoToneColor="#eb2f96" />
                    <a href="https://github.com/huya123/ReactNode" target="_blank" rel="nofollow noopener noreferrer" >
                        ReactCnodeJS
                    </a>
                    <Icon type="star" theme="twoTone" twoToneColor="#eb2f96" />
                    &nbsp;欢迎Star~&nbsp;
                    <Icon type="star" theme="twoTone" twoToneColor="#eb2f96" />
                </p>
                <div>
                    <p>技术栈：</p>
                    <ul>
                        <li>React</li>
                        <li>React Hooks</li>
                        <li>React Router</li>
                        <li>Ant Design</li>
                        <li>Axios</li>
                    </ul>
                </div>
            </Modal>
        </div>
    )
}
 
export default Header