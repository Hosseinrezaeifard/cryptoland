import React, { useState, useEffect } from 'react'
import { Col, Row, Collapse, Typography, Avatar, Input } from 'antd'
import millify from 'millify'
import HTMLReactParser from 'html-react-parser'

import { useGetExchangesQuery } from '../services/cryptoApi'
import Loader from './Loader'
const Exchanges = () => {
    const { Panel } = Collapse;
    const { Text } = Typography;

    const [exchangesList, setExchangesList] = useState([])
    const [exchangeName, setExchangeName] = useState('')

    const { data, isFetching } = useGetExchangesQuery()

    useEffect(() => {
        const filteredData = data?.data?.exchanges.filter(exchange => exchange?.name?.toLowerCase().includes(exchangeName.toLowerCase()))
        setExchangesList(filteredData)
    }, [exchangeName, data])

    if (isFetching) return <Loader />

    return (
        <>
            <div className="search-crypto">
                <Input placeholder="Search Exchange" onChange={(e) => setExchangeName(e.target.value)}></Input>
            </div>
            <Row>
                <Col span={6}>Exchanges</Col>
                <Col span={6}>24h Trade Volume</Col>
                <Col span={6}>Markets</Col>
                <Col span={6}>Change</Col>
            </Row>
            {exchangesList?.map(ex => (
                <Collapse key={ex.id} >
                    <Panel
                        showArrow={false}
                        header={
                            (
                                <Row>
                                    <Col span={6}>
                                        <Text><strong>{ex.rank}.</strong></Text>
                                        <Avatar className="exchange-image" src={ex.iconUrl} />
                                        <Text><strong>{ex.name}</strong></Text>
                                    </Col>
                                    <Col span={6}>{millify(ex.volume)}</Col>
                                    <Col span={6}>{millify(ex.numberOfMarkets)}</Col>
                                    <Col span={6}>{millify(ex.marketShare)}%</Col>
                                </Row>
                            )
                        }>
                        {HTMLReactParser(ex.description || 'There is no Data From This Exchange at the Moment!')}
                    </Panel>
                </Collapse>
            ))}
        </>
    )
}

export default Exchanges
