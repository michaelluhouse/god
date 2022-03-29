import { Button } from 'antd';
import NewsPublish from '../../../components/publish-manage/newspublish.jsx';
import usePublish from '../../../components/publish-manage/usepublish.jsx';

export default function Published() {

  const {dataSource, handleSunset} = usePublish(2)

  return (
    <div>
      <NewsPublish 
        dataSource={dataSource} 
        button={(id)=>
          <Button 
            danger 
            onClick={()=>handleSunset(id)}
          >
            下线 
          </Button>
        }
        
      >        
      </NewsPublish>
    </div>
  )
}