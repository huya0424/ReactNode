import React, { useContext } from 'react';
import { Link } from 'react-router-dom'
import { TopicContext } from '../../utils/reducer'
import { Divider } from 'antd'
import moment from 'moment'
import "./Index.scss"

function RecentReply(props) {

    const { otherTopic } = useContext(TopicContext);

    if(!otherTopic.loginname) {
        return <div />
    }
    const data = otherTopic.recent_replies.map((item, index) => {
        let temp = <div key={item.id}><Link key={item.id} to={"/topics/" + item.id}>{item.title}</Link></div>
        
        if(!props.simple) {
            temp = (
                <div key={item.id}>
                    <Link to={"/user/" + item.author.loginname}>
                        <img src={item.author.avatar_url} alt="头像" />
                    </Link>
                    <Link to={"/topics/" + item.id}>
                        {item.title}
                    </Link>
                    <span className="time">
                        {moment(item.last_reply_at, 'YYYY-MM-DD').startOf('day').fromNow()}
                    </span>
                    <Divider className="inside-divider" />
                </div>
            )
        }
        return temp
    })

    return (
        <div className="recent-reply">
            <header>最近参与的话题</header>
            <Divider className="divider" />
            {data}
        </div>
    )
}

// 设置默认值
RecentReply.defaultProps = {
    simple: true
}

export default RecentReply;