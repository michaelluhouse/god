import React, { useEffect, useState } from 'react';
import { Route, Routes } from 'react-router-dom';
import { connect } from 'react-redux';
import { Spin } from 'antd';
import axios from 'axios';
import Home from '../../views/sandbox/home/home.jsx';
import UserList from '../../views/sandbox/user-manage/userlist.jsx';
import RoleList from '../../views/sandbox/right-manage/rolelist.jsx';
import RightList from '../../views/sandbox/right-manage/rightlist.jsx';
import NoPermission from '../../views/sandbox/nopermission/nopermission.jsx';
import NewsAdd from '../../views/sandbox/news-manage/newsadd.jsx';
import NewsDraft from '../../views/sandbox/news-manage/newsdraft.jsx';
import NewsCategory from '../../views/sandbox/news-manage/newscategory.jsx';
import NewsPreview from '../../views/sandbox/news-manage/newspreview.jsx';
import NewsUpdate from '../../views/sandbox/news-manage/newsupdate.jsx';
import Audit from '../../views/sandbox/audit-manage/audit.jsx';
import AuditList from '../../views/sandbox/audit-manage/auditlist.jsx';
import Unpublished from '../../views/sandbox/publish-manage/unpublished.jsx';
import Published from '../../views/sandbox/publish-manage/published.jsx';
import Sunset from '../../views/sandbox/publish-manage/sunset.jsx';


const LocalRouterMap = {
    "/home":<Home/>,
    "/user-manage/list":<UserList />,
    "/right-manage/role/list":<RoleList />,
    "/right-manage/right/list":<RightList />,
    "/news-manage/add":<NewsAdd />,
    "/news-manage/draft":<NewsDraft />,
    "/news-manage/category":<NewsCategory />,
    "/news-manage/preview/:id":<NewsPreview />,
    "/news-manage/update/:id":<NewsUpdate />,
    "/audit-manage/audit":<Audit />,
    "/audit-manage/list":<AuditList />,
    "/publish-manage/unpublished":<Unpublished />,
    "/publish-manage/published":<Published />,
    "/publish-manage/sunset":<Sunset />
}

function NewsRouter(props) {

  const [BackRouteList, setBackRouteList] = useState([])

  useEffect(()=>{
    Promise.all([
      axios.get("/rights"),
      axios.get("/children"),
    ]).then(res=>{
      // console.log(res)
      setBackRouteList([...res[0].data,...res[1].data])

      // console.log(BackRouteList)
    })
  },[])

  const {role:{rights}} = JSON.parse(localStorage.getItem("token"))

  const checkRoute = (item) => {
    return LocalRouterMap[item.key] && (item.pagepermisson || item.routepermisson)
  }

  const checkUserPermission = (item) => {
    return rights.includes(item.key)

  }

  return (
    <Spin size="large" spinning={props.isLoading}>
      <Routes>
          {
            BackRouteList.map(item=>
              {
                if(checkRoute(item) && checkUserPermission(item)){
                  return <Route 
                  path={item.key} 
                  key={item.key} 
                  // component={LocalRouterMap[item.key]}
                  element={LocalRouterMap[item.key]}
                  exact
                  />
                }
                return null
              }
            )
          }
          <Route path='/' element={<Home/>}/>
          {
            BackRouteList.length>0 && <Route path="*" element={<NoPermission/>} />
          }
      </Routes>
    </Spin>
  )
}

const mapStateToProps= ({LoadingReducer:{isLoading}})=>({
  isLoading
})

export default connect(mapStateToProps)(NewsRouter)
