import React, { useState, useEffect, useContext } from 'react';
import { Link } from 'react-router-dom'
import { getData } from '../../utils/api';
import moment from 'moment'
import { Skeleton } from 'antd'
import { TopicContext, UPDATE_TOPIC } from '../../utils/reducer'
import './Index.scss'

function ProfilePanel(props) {

    let [user, setUser] = useState({});
    const { loginname } = props;
    const { dispatch } = useContext(TopicContext);

    useEffect(()=>{
        getData({url: `user/${loginname}`}).then(res=>{
            setUser(res.data);
            dispatch({type:UPDATE_TOPIC, otherTopic: res.data})
        })
    },[]);

    if(!user.loginname) {
        return <Skeleton active />
    }

    return (
        <div className="profile-panel">
            <Link className="user" to={'/user/' + user.loginname}>
                <img src={user.avatar_url} alt="头像" />
                {user.loginname}
            </Link>
            <p> 积分：{user.score} </p>
            <p>
                Github：
                <a href={'https://github.com/' + user.githubUsername} target="_blank" rel="nofollow noopener noreferrer" >
                    {user.githubUsername}
                </a>
            </p>
            <p>
                注册时间：{moment(user.create_at, 'YYYY-MM-DD').startOf('day').fromNow()}
            </p>    
        </div>
    )
}

export default ProfilePanel;