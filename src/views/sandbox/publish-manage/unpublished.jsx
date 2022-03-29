import { Button } from 'antd';
import NewsPublish from '../../../components/publish-manage/newspublish.jsx';
import usePublish from '../../../components/publish-manage/usepublish.jsx';

export default function Unpublished() {

  const {dataSource, handlePublish} = usePublish(1)

  return (
    <div>
      <NewsPublish 
        dataSource={dataSource} 
        button={(id)=>
          <Button 
            type="primary" 
            onClick={()=>handlePublish(id)}
          >
            发布 
          </Button>
        }
      >        
      </NewsPublish>
    </div>
  )
}