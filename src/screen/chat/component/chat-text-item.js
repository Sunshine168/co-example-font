import React from 'react'
import { Bubble } from '../../../component/base-style-component'

const BubbleComponent = ({ children, bgColor, className }) => {
  return (
    <Bubble className={className}>
      <a className='avatar'>
        <img src='http://res.jsrun.net/avatar/2464_1491377479769.png' />
      </a>
      <div className='wrap'>
        <div className='content'>
          清明节期间，雄县人员流动较大。通过走访了解，一是慕名而来，认为雄安新区“雄”字开头就是雄县，来县拍照留念人员较多；二是周边游客假期出游，雄县区位优越，交通便捷，拥有白洋淀、温泉等旅游资源，每逢节假日都会吸引大批京津游客；三是京津及周边地区的投资客，对新区建设存在高预期值，来寻找投资房产机会，在了解到雄县已经暂停所有房地产交易，整个区域处于“有价无市、有市无房、有房也不能交易”的严管严控状态的情况后，打消炒房念头，怀着美好的愿望而来，带着满满的遗憾而去。目前，随着全县房屋销售管理力度不断加大，广大群众的认识程度提高，对购房的关注度明显降温，县域内房地产市场未出现大规模的炒作现象。
        </div>
      </div>
    </Bubble>
  )
}

export default BubbleComponent
