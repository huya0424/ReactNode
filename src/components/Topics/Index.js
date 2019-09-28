import React from 'react';
import { Skeleton, Tag } from 'antd'
import { Link } from 'react-router-dom'
import moment from 'moment'
import  tab  from '../../utils/tab'
import './Index.scss'

function Topics(props) {
    const { list } = props.list;

    if(list.length === 0) {
        return (<Skeleton active />)
    } 

    const item = list.map((item) => {
        return (
            <div className="topics" key={item.id}>
                <Link to={'/user/' + item.author.loginname}>
                    <img src={item.author.avatar_url} alt="用户头像" />
                </Link>
                <span className="count">
                    <em>{item.reply_count}</em>/<em>{item.visit_count}</em>
                </span>
                <Tag color={tab[item.tab] && tab[item.tab].color}>
                    {tab[item.tab] && tab[item.tab].name}
                </Tag>
                <Link className="title" to={'/topics/' + item.id}>
                    {item.title}
                </Link>
                <span className="time">
                    {moment(item.last_reply_at, 'YYYY-MM-DD').startOf('day').fromNow()}
                </span>
            </div>
            
        )
    })
    return item;
}

export default Topics