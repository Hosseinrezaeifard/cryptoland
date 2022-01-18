import React from 'react'
import millify from 'millify'
import { Link } from 'react-router-dom'
import { Typography, Row, Col, Statistic } from 'antd'

import { useGetCryptosQuery } from '../services/cryptoApi'
import { Cryptocurrencies, News } from '../components'
import Loader from './Loader'
const Homepage = () => {

    // Destructuring Title from Typography 
    const { Title } = Typography

    // Retrieving Data from Redux Api Call Hook
    const { data, isFetching } = useGetCryptosQuery(10)
    const globalStats = data?.data?.stats

    // Showing a Nice-looking Spin if the Data are not Loaded yet
    if (isFetching) return <Loader />

    return (
        <>
            {/* Crypto Stats */}
            <Title level={2} className='heading'>Global Crypto Stats</Title>
            {/* The Way we are Showing the Stats is in a Row Which Consists of 5 Different Columns */}
            <Row>
                <Col span={12}><Statistic title="Total Cryptocurrencies" value={globalStats?.total} /></Col>
                <Col span={12}><Statistic title="Total Markets" value={millify(globalStats?.totalMarkets)} /></Col>
                <Col span={12}><Statistic title="Total Exchanges" value={millify(globalStats?.totalExchanges)} /></Col>
                <Col span={12}><Statistic title="Total Market Cap" value={millify(globalStats?.totalMarketCap)} /></Col>
                <Col span={12}><Statistic title="Total 24h Volume" value={millify(globalStats?.total24hVolume)} /></Col>
            </Row>
            {/* Top 10 Cryptocurrencies of the World*/}
            <div className='home-heading-container'>
                <Title level={2} className='home-title'>Top 10 Cryptocurrencies in the Market</Title>
                <Title level={3} className='show-more'><Link to='/cryptocurrencies'>Show More</Link></Title>
            </div>
            {/* Top 10 News of the Cryptocurrencies of the World */}
            <Cryptocurrencies simplified />
            <div className='home-heading-container'>
                <Title level={2} className='home-title'>Latest News of Cryptocurrencies</Title>
                <Title level={3} className='show-more'><Link to='/news'>Show More</Link></Title>
            </div>
            <News simplified />
        </>
    )
}

export default Homepage
