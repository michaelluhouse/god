import React, { useEffect, useState, useRef } from 'react';
import axios from 'axios';
import * as Echarts from 'echarts';
import _ from 'lodash';
import { Card, Row, Col, List, Avatar, Drawer } from 'antd';
import { 
  EditOutlined, 
  EllipsisOutlined, 
  SettingOutlined 
} from '@ant-design/icons';

const { Meta } = Card;

export default function Home() {
  const [viewList, setviewList] = useState([])
  const [starList, setstarList] = useState([])
  const [allList, setallList] = useState([])
  const [visible, setvisible] = useState(false)
  const [pieChart, setpieChart] = useState(null)

  const barRef = useRef([])
  const pieRef = useRef([])

  useEffect(()=>{
    axios.get("/news?publishState=2&_expand=category&_sort=view&_order=desc&_limit=6").then(res=>{
      // console.log(res.data)
      setviewList(res.data)
    })
  },[])

  useEffect(()=>{
    axios.get("/news?publishState=2&_expand=category&_sort=star&_order=desc&_limit=6").then(res=>{
      // console.log(res.data)
      setstarList(res.data)
    })
  },[])

  useEffect(()=>{

    axios.get("/news?publishState=2&_expand=category").then(res=>{
      // console.log(res.data)
      // console.log(_.groupBy(res.data),item=>item.category.title)

      renderBarView(_.groupBy(res.data,item=>item.category.title))
      setallList(res.data)
    })

    return () => {
      window.onresize = null 
    }
  },[])

  const renderBarView = (obj) => { 
    var myChart = Echarts.init(barRef.current);
    var option = {
      title: {
        text: '新闻分类图示'
      },
      tooltip: {},
      legend: {
        data: ['数量']
      },
      xAxis: {
        data: Object.keys(obj),
        axisLabel:{
          rotate:"45",
          interval: 0
        }
      },
      yAxis: {
        minInterval: 1
      },
      series: [
        {
          name: '数量',
          type: 'bar',
          data: Object.values(obj).map(item=>item.length)
        }
      ]
    };
    myChart.setOption(option);

    window.onresize = () =>{
      // console.log("resize")
      myChart.resize()
    }
  }

  const renderPieView = (obj) => {

    var currentList = allList.filter(item=>item.author===username)
    // console.log(currentList)
    var groupObj = _.groupBy(currentList, item=>item.category.title)
    var list = []
    for (var i in groupObj){
      list.push({
        name:i,
        value:groupObj[i].length
      })
    }
    var myChart;

    if(!pieChart){
      myChart = Echarts.init(pieRef.current)
      setpieChart(myChart)
    }else{
      myChart = pieChart
    }

    var option;

    option = {
      title: {
        text: '当前用户新闻分类图示',
        // subtext: 'Fake Data',
        left: 'center'
      },
      tooltip: {
        trigger: 'item'
      },
      legend: {
        orient: 'vertical',
        left: 'left'
      },
      series: [
        {
          name: '发布数量',
          type: 'pie',
          radius: '50%',
          data: list,
          emphasis: {
            itemStyle: {
              shadowBlur: 10,
              shadowOffsetX: 0,
              shadowColor: 'rgba(0, 0, 0, 0.5)'
            }
          }
        }
      ]
    };

    option && myChart.setOption(option);
  }

  const {username, region, role:{roleName}} = JSON.parse(localStorage.getItem("token"))

  return (
    <div className="site-card-wrapper">
      <Row gutter={16}>
        <Col span={8}>
          <Card title="用户最常浏览" bordered={true}>
            <List
              size="small"
              // bordered
              dataSource={viewList}
              renderItem={item => <List.Item>
                <a href={`#/news-manage/preview/${item.id}`}>{item.title}</a>
              </List.Item>}
            />          
          </Card>
        </Col>
        <Col span={8}>
          <Card title="用户点赞最多" bordered={true}>
            <List
                size="small"
                // bordered
                dataSource={starList}
                renderItem={item => <List.Item>
                  <a href={`#/news-manage/preview/${item.id}`}>{item.title}</a>
                </List.Item>}
            />   
          </Card>
        </Col>
        <Col span={8}>
          <Card
            cover={
              <img
                alt="example"
                src="https://gw.alipayobjects.com/zos/rmsportal/JiqGstEfoWAOHiTxclqi.png"
              />
            }
            actions={[
              <SettingOutlined key="setting" onClick={()=>{
                setTimeout(()=>{
                  setvisible(true)
                  renderPieView()
                }, 0)
              }}/>,
              <EditOutlined key="edit" />,
              <EllipsisOutlined key="ellipsis" />,
            ]}
          >
            <Meta
              avatar={<Avatar src="https://joeschmoe.io/api/v1/random" />}
              title={username}
              description={
                <div>
                  <b>{region?region:"全球"}</b>
                  <span 
                    style={{
                      paddingLeft:"30px"
                    }}
                  >
                    {roleName}
                  </span>
                </div>
              }
            />
          </Card>
        </Col>
      </Row>

      <Drawer
        title="个人新闻分类"
        placement="right"
        width={500}
        closable={true}
        onClose={()=>{
          setvisible(false)
        }}
        visible={visible}
      >
        <div 
          ref={pieRef} 
          style={{
            width:'100%',
            height:"400px",
            marginTop:"30px"
          }}
        >

        </div>
      </Drawer>

      <div 
        ref={barRef} 
        style={{
          width:'100%',
          height:"400px",
          marginTop:"30px"
        }}
      >

      </div>

    </div>
  )
}
