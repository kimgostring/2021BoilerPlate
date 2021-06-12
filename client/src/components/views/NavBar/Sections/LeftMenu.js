import React from 'react'
import { Menu } from 'antd'

function LeftMenu(props) {
    return (
        <div style={{ float: 'left' }}>
            <Menu mode={props.mode} style={{ marginTop: '12px' }}>
                <Menu.Item key="home" style={{ margin: '0 5px' }}>
                    <a href="/">Home</a>
                </Menu.Item>
            </Menu>
        </div>
    )
}

export default LeftMenu
