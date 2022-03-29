import React, { useEffect, useState } from 'react';
// import { useNavigate } from "react-router-dom";
// import { useLocation } from "react-router-dom";
import { connect } from 'react-redux';
import axios from 'axios';
import withRouter from './withrouter';
import './index.css';

import { Layout, Menu } from 'antd';
import { 
  UserOutlined, 
  MenuOutlined,
  TeamOutlined,
  ControlOutlined,
  ContactsOutlined,
  ContainerOutlined,
  AuditOutlined,
  EditOutlined,
  FormOutlined,
  OrderedListOutlined,
  CarryOutOutlined,
  DeliveredProcedureOutlined,
  FileDoneOutlined,
  GlobalOutlined,
  HourglassOutlined,
  RocketOutlined,
  DatabaseOutlined
} from '@ant-design/icons';

const { Sider } = Layout; 
const { SubMenu } = Menu;

const iconList = {
  "/home":<MenuOutlined />,
  "/user-manage":<UserOutlined />,
  "/user-manage/list":<TeamOutlined />,
  "/right-manage":<ControlOutlined />,
  "/right-manage/role/list":<ContactsOutlined />,
  "/right-manage/right/list":<ContainerOutlined />,
  "/news-manage":<AuditOutlined />,
  "/news-manage/add":<EditOutlined />,
  "/news-manage/draft":<FormOutlined />,
  "/news-manage/category":<OrderedListOutlined />,
  "/audit-manage":<CarryOutOutlined />,
  "/audit-manage/audit":<DeliveredProcedureOutlined />,
  "/audit-manage/list":<FileDoneOutlined />,
  "/publish-manage":<GlobalOutlined />,
  "/publish-manage/unpublished":<HourglassOutlined />,
  "/publish-manage/published":<RocketOutlined />,
  "/publish-manage/sunset":<DatabaseOutlined />
}


function SideMenu(props) {
  const [menu, setMenu] = useState([])

  useEffect(() => {
    axios.get("/rights?_embed=children").then(res=>{
      console.log(res.data)
      setMenu(res.data)
    })
  },[])

  const {role:{rights}} = JSON.parse(localStorage.getItem("token"))
  // console.log("🚀 ~ file: sidemenu.jsx ~ line 65 ~ SideMenu ~ rights", rights)
  // console.log(localStorage.getItem("token"))

  const checkPagePermission = (item) => {
    return item.pagepermisson && rights.includes(item.key)
  }

  const renderMenu = (menuList) => {
    return menuList.map (item => {
      if(item.children?.length>0 && checkPagePermission(item)){
        return <SubMenu 
          key={item.key} 
          icon={iconList[item.key]} 
          title={item.title}
        >
          { renderMenu(item.children) }  
        </SubMenu>
      }

      return checkPagePermission(item) && <Menu.Item key={item.key} icon={iconList[item.key]} onClick={()=>{
        // props.history.push(item.key) 
        props.router.navigate(item.key) 
        // console.log(props.router)
      }}>{item.title}</Menu.Item>
    }) 
  }

  // console.log(props.location.pathname)
  
  
  const selectKeys = [props.router.location.pathname]
  const openKeys = ["/"+props.router.location.pathname.split("/")[1]]

  return (
    <Sider trigger={null} collapsible collapsed={props.isCollapsed}>
      <div 
        style={{
          display:"flex",
          height:"100%","flexDirection":"column"
        }}
      >
        <div className="logo">全球新闻发布管理系统</div> 
        <div style={{flex:1, "overflow":"auto"}}>
          <Menu 
            theme="dark" 
            mode="inline" 
            defaultSelectedKeys={selectKeys}
            className="aaa" 
            defaultOpenKeys={openKeys}
          >
            {renderMenu(menu)}
          </Menu>
        </div>
      </div>
    </Sider>
  )
}

const mapStateToProps= ({CollApsedReducer:{isCollapsed}})=>({
  isCollapsed
})

export default connect(mapStateToProps)(withRouter(SideMenu));