import React, { useState, useEffect, useCallback } from 'react'
import 'antd/dist/antd.css'
import { Tabs } from 'antd'
import { StickyContainer, Sticky } from 'react-sticky'
import './Index.scss'
import { getData } from '../../utils/api'
import Topics from '../../components/Topics/Index'

const { TabPane } = Tabs;
const renderTabBar = (props, DefaultTabBar) => (
    <Sticky bottomOffset={80}>
        {
            ({ style }) => (
                <DefaultTabBar {...props} style={{ ...style, zIndex: 1, background: '#fff' }} />
            )
        }
    </Sticky>
);

function useList() {
    let [param, setParam] = useState({
        page: 1,
        limit: 20,
        list: [],
        store: {},
        tab: 'all'
    });

    const scrollMethod = useCallback(()=>{
        const sumH = document.body.scrollHeight || document.documentElement.scrollHeight;
        const viewH = document.documentElement.clientHeight;
        const scrollH = document.body.scrollTop || document.documentElement.scrollTop;
        if (viewH + scrollH >= sumH) {
            getTopics();
        }
    },[param.list]);

    useEffect(()=>{
        getTopics();
    }, []);

    useEffect(()=>{
        window.addEventListener('scroll', scrollMethod);

        return ()=>{
            window.removeEventListener('scroll', scrollMethod);
        }
    }, [param.list]);

    const getTopics = () => {
        let params = {
            page: param.page,
            limit: param.limit,
            tab: param.tab
        };
        getData({url:'topics', params}).then(res => {
            const store = param.store;
            setParam((param)=>{
                return {
                    ...param,
                    limit: param.limit + 10,
                    list: res.data,
                };
            });
            // 将数据存储到对应的key下
            store[param.tab] = {
                limit: param.limit,
                list: res.data
            };
        });
    }

    return {param, setParam, getTopics};
}


function Home() {
    let { param, setParam, getTopics } = useList();

    const changedTab = (tab) => {
        const store = param.store;

        if(!param.store[tab]) {
            param.limit = 20;
            param.list = [];
            param.tab = tab;
            getTopics();
            return;
        }
        setParam((param)=>{
            return {
                ...param,
                tab,
                limit: store[tab].limit + 10,
                list: store[tab].list
            }
        });
    }
    
    return (
        <div className="wrapper">
            <div className="home">
                <StickyContainer>
                    <Tabs defaultActiveKey="all" renderTabBar={renderTabBar} onChange={changedTab}  >
                        <TabPane tab="全部" key="all">
                            <Topics list={param} />
                        </TabPane>
                        <TabPane tab="精华" key="good">
                            <Topics list={param} />
                        </TabPane>
                        <TabPane tab="分享" key="share">
                            <Topics list={param} />
                        </TabPane>
                        <TabPane tab="问答" key="ask">
                            <Topics list={param} />
                        </TabPane>
                        <TabPane tab="工作" key="job">
                            <Topics list={param} />
                        </TabPane>
                    </Tabs>
                </StickyContainer>
            </div>
            
        </div>
    )
}
export default Home