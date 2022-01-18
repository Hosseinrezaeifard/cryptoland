import React, { useState } from 'react'
import { Select, Typography, Row, Col, Avatar, Card } from 'antd'
import moment from 'moment'

import { useGetCryptoNewsQuery } from '../services/cryptoNewsApi'
import { useGetCryptosQuery } from '../services/cryptoApi'
import Loader from './Loader'

const { Text } = Typography;

const { Option } = Select;

const demoImage = 'https://www.bing.com/th?id=OVFT.mpzuVZnv8dwIMRfQGPbOPC&pid=News'

const News = ({ simplified }) => {
    const [newsCategory, setNewsCategory] = useState('Cryptocurrency')

    const count = simplified ? 6 : 12
    const { data: cryptoNews, isFetching } = useGetCryptoNewsQuery({ newsCategory, count })

    const { data } = useGetCryptosQuery(100)

    if (isFetching) return <Loader />

    if (!cryptoNews?.value && !isFetching) return 'No News at the Moment, Please Try Again Later!'

    return (
        <Row gutter={[24, 24]}>
            {!simplified && (
                <Col span={24}>
                    <Select
                        showSearch
                        className="select-news"
                        placeholder="Select a Cryptocurrency"
                        optionFilterProp="children"
                        onChange={(value) => setNewsCategory(value)}
                        filterOption={(input, option) => option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0}>
                        <Option value="Cryptocurrency">Cryptocurrency</Option>
                        {data?.data?.coins.map((coin, i) => <Option key={i} value={coin.name}>{coin.name}</Option>)}
                    </Select>
                </Col>
            )
            }
            {
                cryptoNews?.value.map((news, i) => (
                    <Col xs={24} sm={12} lg={8} key={i}>
                        <Card className="news-card" hoverable>
                            <a href={news.url} target="_blank" rel="noreferrer">
                                <div className="news-image-container">
                                    <Text className="news-title" strong>{
                                        news.name.length > 100
                                            ? `${news.name.substring(0, 100)} ... `
                                            : news.name
                                    }</Text>
                                    <img style={{ maxWidth: '200px', maxHeight: '100px' }} alt="news" src={news?.image?.thumbnail?.contentUrl || demoImage} />
                                </div>
                                <p>
                                    {
                                        news.description.length > 100
                                            ? `${news.description.substring(0, 100)} ... `
                                            : news.description
                                    }
                                </p>
                                <div className="provider-container">
                                    <Avatar src={news?.provider[0]?.image?.thumbnail?.contentUrl || demoImage} />
                                    <Text className="provider-name">{news.provider[0].name}</Text>
                                </div>
                                <Text>{moment(news.datePublished).startOf('ss').fromNow()}</Text>
                            </a>
                        </Card>
                    </Col>
                ))
            }
        </Row >
    )
}

export default News