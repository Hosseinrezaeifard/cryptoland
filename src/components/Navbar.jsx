import React, { useState, useEffect } from 'react'
import { Button, Menu, Typography, Avatar } from 'antd'
import { Link } from 'react-router-dom'
import { HomeOutlined, MoneyCollectOutlined, BulbOutlined, FundOutlined, MenuOutlined, } from '@ant-design/icons'

import icon from '../images/cryptocurrency.jpg'

const Navbar = () => {

    // Saving the State of Menu and Size of the Screen
    const [activeMenu, setActiveMenu] = useState(true)
    const [screenSize, setScreenSize] = useState(null)

    // This Function Sets the Current Screen Size to the Screen Size State 
    const handleResize = () => setScreenSize(window.innerWidth)

    // Using useEffect in order to determine the Screen Size & Save it (After Mounting & Before Unmounting)
    useEffect(() => {
        window.addEventListener('resize', handleResize)

        handleResize()

        return () => window.removeEventListener('resize', handleResize)
    }, [])

    // Setting the Screen Size to State Whenever the Screen Size Changes
    useEffect(() => {
        if (screenSize < 768) {
            setActiveMenu(false)
        } else {
            setActiveMenu(true)
        }
    }, [screenSize])

    return (
        // Navbar Container
        <div className="nav-container">
            {/* Logo and Title */}
            <div className="logo-container">
                <Avatar src={icon} size="large" />
                <Typography.Title level={1} className="logo"><Link to="/">Cryptoland</Link></Typography.Title>
                {/* Button which is Shown Just When Device is less than a Range of Pixel (CSS FILE) */}
                <Button className="menu-control-container" onClick={() => setActiveMenu(!activeMenu)}>
                    <MenuOutlined />
                </Button>
            </div>
            {/* Only if Menu is Active then Show the Menu */}
            {activeMenu && (
                <Menu theme="dark">
                    <Menu.Item key='home' icon={<HomeOutlined />}>
                        <Link to="/">Home</Link>
                    </Menu.Item>
                    <Menu.Item key='cryptocurrencies' icon={<FundOutlined />}>
                        <Link to="/cryptocurrencies">Cryptocurrencies</Link>
                    </Menu.Item>
                    <Menu.Item key='exchanges' icon={<MoneyCollectOutlined />}>
                        <Link to="/exchanges">Exchanges</Link>
                    </Menu.Item>
                    <Menu.Item key='news' icon={<BulbOutlined />}>
                        <Link to="/news">News</Link>
                    </Menu.Item>
                </Menu>
            )}
        </div>
    )
}

export default Navbar
