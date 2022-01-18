import React from 'react'
import { Switch, Link, Route } from 'react-router-dom';
import { Layout, Typography, Space } from 'antd'

import { Navbar, Homepage, Exchanges, Cryptocurrencies, News, CryptoDetails } from './components'
import './App.css';

const App = () => (
    // Whole App
    <div className="app">
        {/* Navbar */}
        <div className="navbar">
            <Navbar />
        </div>
        {/* Main Container */}
        <div className="main">
            {/* Routes (Different Pages of the App) */}
            <Layout>
                <div className="routes">
                    <Switch>
                        <Route exact path="/">
                            <Homepage />
                        </Route>
                        <Route exact path="/exchanges">
                            <Exchanges />
                        </Route>
                        <Route exact path="/cryptocurrencies">
                            <Cryptocurrencies />
                        </Route>
                        <Route exact path="/crypto/:coinId">
                            <CryptoDetails />
                        </Route>
                        <Route exact path="/news">
                            <News />
                        </Route>
                    </Switch>
                </div>
            </Layout>
            {/* Footer */}
            <div className="footer">
                <Typography.Title level={5} style={{ color: 'white', textAlign: 'center' }}>Copyright © 2021
                    <Link to="/">
                        Cryptoland Inc.
                    </Link> <br />
                    All Rights Reserved.
                </Typography.Title>
                <Space>
                    <Link to="/">Home</Link>
                    <Link to="/exchanges">Exchanges</Link>
                    <Link to="/news">News</Link>
                </Space>
            </div>
        </div>
    </div>
);

export default App
