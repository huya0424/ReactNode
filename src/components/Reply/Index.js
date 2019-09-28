import React from 'react';
import { Link } from 'react-router-dom'
import moment from 'moment'
import './Index.scss'

function Reply(props) {
    const getThumbs = (length) =>{
        if(!length) {
            return <span />
        }
        return (
            <span className="thumbs">
                <img src={require('../../assets/image/thumbs-up.svg')} alt="点赞" />
                {length}
            </span>
        )
    }

    const { replies } = props;
    const data = replies.map((item, index) => {
        return(
            <div key={item.id}>
                <Link to={"/user/" + item.author.loginname}>
                    <img src={item.author && item.author.avatar_url} alt="头像" />
                </Link>
                <div>
                    <div className="info">
                        <p>
                            <span>{index+1}楼&nbsp;</span>
                            <Link to={"/user/" + item.author.loginname}>
                                {item.author.loginname} &nbsp;
                            </Link>
                            <span>
                                {moment(item.create_at, 'YYYY-MM-DD').startOf('day').fromNow()}
                            </span>
                        </p>
                        { getThumbs(item.ups.length) }
                    </div>
                    <p dangerouslySetInnerHTML={{__html:item.content}}></p>
                </div>

            </div>
        )
    });

    data.splice(0, 0, <div key={1}> <span>{replies.length}</span>&nbsp; 回复 </div>);
    
    return <div className="reply">{data}</div>
}
export default Reply