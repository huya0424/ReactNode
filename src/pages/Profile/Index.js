import React, { useEffect, useState } from 'react';
import { getData } from '../../utils/api';
import { TopicReducer } from '../../utils/reducer'
import ProfilePanel from '../../components/ProfilePanel/Index'
import OtherTopic from '../../components/OtherTopic/Index'
import RecentReply from '../../components/RecentReply/Index'
import { Skeleton }  from 'antd'
import './Index.scss'

function Profile(props) {
    const [user, setUser] = useState({});
    const id = props.match.params.id;
    console.log("user-id=" + id);
    useEffect(()=>{
        getData({url:`user/${id}`}).then(res=>{
            console.log(res);
            setUser(res.data);
        })
        return ()=>{
            console.log('离开');
        }
    },[id]);

    if(!user.loginname) {
        return <Skeleton active />
    }

    return (
        <div className="profile">
            <TopicReducer>
                <ProfilePanel loginname={user.loginname} />
                <OtherTopic simple={false} />
                <RecentReply simple={false} />
            </TopicReducer>
        </div>
    )
}

export default Profile