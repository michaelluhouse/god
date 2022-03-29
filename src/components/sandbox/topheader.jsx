import React from 'react'
import { Layout, Dropdown, Menu, Avatar } from 'antd';
import {
  MenuUnfoldOutlined,
  MenuFoldOutlined,
  UserOutlined
} from '@ant-design/icons';
import withRouter from './withrouter';
import { connect } from 'react-redux';

const { Header } = Layout;

function TopHeader(props) {

  // console.log(props)
  // const [collapsed, se  tCollapsed] = useState(false)
  // const [userName, setUserName] = useState('nooooo')
  const changeCollapsed = () => {
    // console.log(props)
    props.changeCollapsed()
  }

  const {role:{roleName},username} = JSON.parse(localStorage.getItem("token"))

  const menu = (
    <Menu>
      <Menu.Item key='user'>
        {roleName}
      </Menu.Item>
      <Menu.Item key='logout' danger onClick={()=>{
        localStorage.removeItem("token")
        props.router.navigate("/login")

      }}>退出</Menu.Item>
    </Menu>
  );

  return (
    <Header className="site-layout-background" style={{ padding: '0 16px' }}>
      {
        props.isCollapsed ? <MenuUnfoldOutlined onClick={changeCollapsed} /> :
          <MenuFoldOutlined onClick={changeCollapsed} />
      }

      <div style={{ float: "right" }}>
        {/* <span>{`欢迎 ${userName} 回来`}</span> */}
        <span>欢迎<span style={{color:"#1890ff"}}>{username}</span>回来</span>
        <Dropdown overlay={menu}>
          <Avatar size="large" icon={<UserOutlined />} />
        </Dropdown>
      </div>

    </Header>
  )
}

const mapStateToProps = ({CollApsedReducer:{isCollapsed}}) =>{
  // console.log(state)
  return {
    isCollapsed
  }
}

const mapDispatchToProps = {
  changeCollapsed(){
    return {
      type: "change_collapsed"
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(TopHeader))