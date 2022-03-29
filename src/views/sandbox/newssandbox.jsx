import React, { useEffect } from 'react';
import NProgress from 'nprogress';
import 'nprogress/nprogress.css';
import NewsRouter from '../../components/sandbox/newsrouter.jsx';
import SideMenu from '../../components/sandbox/sidemenu.jsx';
import TopHeader from '../../components/sandbox/topheader.jsx';
import './newssandbox.css';

import { Layout } from 'antd';
const { Content } = Layout;


export default function NewsSandBox() {
  
  NProgress.start()
  useEffect(() => {
    NProgress.done()
  })

  return (
    <Layout>
      <SideMenu></SideMenu>
      <Layout className="site-layout">
        <TopHeader></TopHeader>
        <Content  className="site-layout-background"
          style={{
            margin: '24px 16px',
            padding: 24,
            minHeight: 280,
            overFlow: "auto"
          }}
        >
          <NewsRouter></NewsRouter>
        </Content>
      </Layout>
    </Layout>
    
  )
}
