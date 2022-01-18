import { Spin } from 'antd'
import React from 'react'

const loader = () => {
    return (
        <div className="loader">
            <Spin />
        </div>
    )
}

export default loader
