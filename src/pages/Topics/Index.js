import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom'
import moment from 'moment'
import { getData } from '../../utils/api';
import  tab  from '../../utils/tab'
import { Divider, Skeleton } from 'antd'
import { TopicReducer } from '../../utils/reducer'
import Reply from '../../components/Reply/Index';
import ProfilePanel from '../../components/ProfilePanel/Index';
import OtherTopic from '../../components/OtherTopic/Index';
import RecentReply from '../../components/RecentReply/Index';
import './Index.scss';
import '../../assets/vue.css'

function Topics(props) {
    const [topic, setTopic] = useState({});
    const id = props.match.params.id;

    useEffect(()=>{
        getData({url: `topic/${id}`}).then(res=>{
            setTopic(res.data);
        });

        return ()=>{
            console.log('离开');
        }
    }, [id]); //id发生变化时重新调用，比如点击最近参与话题、最近创建话题

    if(!topic.id) {
        return (
            <Skeleton active />
        )
    }

    return (
        <div className="topic">
            <div className="left">
                <div className="title" dangerouslySetInnerHTML={{__html:topic.title}}></div>
                <div className="info">
                    <span>
                        发布于&nbsp;
                        {moment(topic.create_at, 'YYYY-MM-DD').startOf('day').fromNow()}
                        &nbsp;•&nbsp;
                    </span>
                    作者：
                    <Link to={'/user/' + topic.author.loginname}>
                        {topic.author.loginname}
                    </Link>
                    &nbsp;•&nbsp;
                    <span>{topic.visit_count}次浏览</span>
                    &nbsp;•&nbsp;
                    <span>来自：{tab[topic.tab] && tab[topic.tab].name}</span>
                </div>
                <Divider />
                <div className="content" dangerouslySetInnerHTML={{__html:topic.content}}></div>
                <Reply replies={topic.replies} />
            </div>
            <div className="right">
                <TopicReducer>
                    <ProfilePanel loginname={topic.author.loginname} />
                    <OtherTopic />
                    <RecentReply />
                </TopicReducer>
            </div>
        </div>
    )
}

export default Topics