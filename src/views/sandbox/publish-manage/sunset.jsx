import { Button } from 'antd';
import NewsPublish from '../../../components/publish-manage/newspublish.jsx';
import usePublish from '../../../components/publish-manage/usepublish.jsx';

export default function Sunset() {

  const {dataSource, handleDelete} = usePublish(3)

  return (
    <div>
      <NewsPublish 
        dataSource={dataSource} 
        button={(id)=>
          <Button 
            danger
            onClick={()=>handleDelete(id)}
          >
            删除 
          </Button>  
        }
        
      >        
      </NewsPublish>
    </div>
  )
}