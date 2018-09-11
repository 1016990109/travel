import React from 'react'
import styles from './SearchContainer.scss'
import classnames from 'classnames'
import {Map, List, fromJS} from 'immutable'
import Select from '../../components/MultiSelect'
import Table from '../../components/Table'
import date from '../../utils/date'
import PropTypes from 'prop-types'

//模拟的初始化数据
const initialData = (() => {
  let data = []
  const destinations = ['西班牙', '马德里', '纽约'], tags = ["经典", "参观博物馆", "美团", "点评", "亲子", "暑假", "情侣"]

  for (let i = 0; i < 100; i++) {
    data.push({
      id: i,
      name: `行程${i}`,
      days: i % 7,
      destination: destinations[i % 3],
      tags: tags.slice(0, i % 7),
      scenicNumber: parseInt(20 * Math.random()),
      platform: i % 2,// 0代表美团，1代表点评
      status: i % 2,//0代表未发布，1代表进行中
      lastModified: Date.now() + 1000 * 60 * 60 * 24 * i,
      lastModifier: 0
    })
  }

  return fromJS(data)
})()

//平台code
const PLATFORM_ALL = -1, PLATFORM_MEITUAN = 0, PLATFORM_DIANPING = 1
const PLATFORM_NAMES = ['美团', '点评']
//状态code
const STATUS_ALL = -1, STATUS_ING = 0,STATUS_OFF = 1
const STATUS_NAMES = ['进行中', '未发布']

const initialState =  {
  journeyList: [],
  destination: "",//目的地
  selectedTags: List(),//选中的平台
  selectedStatus: STATUS_ALL,//选中的状态
  selectedPlatform: PLATFORM_ALL,//选中的平台
  journeyId: "",//行程id
  keywords: "",//关键词
  days: Map({
    start: 1,
    end: 1
  })
}

const OperationComponent = () => (
  <div className={styles.operations}>
      <button className={styles.ghost}>编辑</button>
      <button className={styles.ghost}>发布</button>
      <button className={styles.ghost}>预览</button>
      <button className={styles.ghost}>删除</button>
    </div>
)

//表格渲染列
const columns = [{
  title: '行程id',
  dataIndex: 'id',
  key: 'id',
  width: 80
}, {
  title: '行程名称',
  dataIndex: 'name',
  key: 'name',
  width: 80
}, {
  title: '天数',
  dataIndex: 'days',
  key: 'days',
  width: 80
}, {
  title: '目的地',
  dataIndex: 'destination',
  key: 'destination',
  width: 80
}, {
  title: '标签',
  dataIndex: 'tags',
  key: 'tags',
  width: 80,
  render: data => data.tags.join(',')
}, {
  title: '观光点数量',
  dataIndex: 'scenicNumber',
  key: 'scenicNumber',
  width: 80
}, {
  title: '平台',
  dataIndex: 'platform',
  key: 'platform',
  width: 80,
  render: (data) => PLATFORM_NAMES[data.platform]
}, {
  title: '状态',
  dataIndex: 'status',
  key: 'status',
  width: 80,
  render: data => STATUS_NAMES[data.platform]
}, {
  title: '最后修改时间',
  dataIndex: 'lastModified',
  key: 'lastModified',
  width: 80,
  render: data => date.dateFtt('yyyy-MM-dd hh:mm:ss', new Date(data.lastModified))
}, {
  title: '最后修改人',
  dataIndex: 'lastModifier',
  key: 'lastModifier',
  width: 80
}, {
  title: '操作',
  dataIndex: '',
  key: 'option',
  render: OperationComponent
}]

class SearchContainer extends React.Component {
  constructor(props) {
    super(props)
    this.state = initialState

    this.handleChangeDestination = this.handleChangeDestination.bind(this)
    this.handleChangeDaysStart = this.handleChangeDaysStart.bind(this)
    this.handleChangeDaysEnd = this.handleChangeDaysEnd.bind(this)
    this.handleResetCondition = this.handleResetCondition.bind(this)
    this.handleChangePlatform = this.handleChangePlatform.bind(this)
    this.handleChangeStatus = this.handleChangeStatus.bind(this)
    this.handleSearchJourney = this.handleSearchJourney.bind(this)
    this.handleChangeKeyword = this.handleChangeKeyword.bind(this)
    this.handleChangeId = this.handleChangeId.bind(this)
    this.handleChangeTags = this.handleChangeTags.bind(this)
  }

  fetchData() {
    //根据条件筛选，也可以发网络请求
    const {destination, selectedTags, selectedStatus, selectedPlatform, journeyId, keywords, days} = this.state
    return new Promise((resolve => {
      resolve(initialData.filter(item => {
        const containedDes = destination === "" || item.get('destination').indexOf(destination) !== -1,
          containedTag = selectedTags.size === 0 || selectedTags.every(tag => item.get('tags').indexOf(tag) !== -1),
          containedPlatform = selectedPlatform === PLATFORM_ALL || selectedPlatform === item.get('platform'),
          containedStatus = selectedStatus === STATUS_ALL || selectedStatus === item.get('status'),
          containedJourneyId = journeyId === "" || parseInt(journeyId) === item.get('id'),
          containedKeyword = keywords === "" || item.get('name').indexOf(keywords) !== -1,
          containedDays = days.get('start') <= item.get('days') && days.get('end') >= item.get('days')

        return containedDes && containedTag && containedPlatform && containedStatus && containedJourneyId &&containedKeyword && containedDays
      }).toJS())
    }))
  }

  handleChangeDestination(e) {
    this.setState({destination : e.target.value})
  }

  handleChangeDaysStart(e) {
    this.setState({days: this.state.days.set('start', e.target.value)})
  }

  handleChangeDaysEnd(e) {
    this.setState({days: this.state.days.set('end', e.target.value)})
  }

  handleResetCondition() {
    this.setState(initialState)
  }

  handleChangePlatform(e) {
    this.setState({selectedPlatform: parseInt(e.target.value)})
  }

  handleChangeStatus(e) {
    this.setState({selectedStatus: parseInt(e.target.value)})
  }

  handleChangeKeyword(e) {
    this.setState({keywords: e.target.value})
  }

  handleChangeId(e) {
    this.setState({journeyId: e.target.value})
  }

  handleChangeTags(tags) {
    this.setState({
      selectedTags: List(tags.map(tag => tag.value))
    })
  }

  handleSearchJourney() {
    this.fetchData().then(res => {
      this.setState({
        journeyList: res,
      })
    })
  }

  /**
   * 搜索条件渲染
   * @returns {*}
   */
  renderSearchContainer() {
    const state = this.state
    const {platforms, journeyTags, status} = this.props

    return (
      <div className={styles.searchContainer}>
        <div className={styles.left}>
          <div className={styles.item}>
            <div className={styles.condition}>包含目的地</div>
            <input type="text" placeholder="请输入字符后选择" value={state.destination} onChange={this.handleChangeDestination}/>
          </div>
          <div className={styles.item}>
            <div className={styles.condition}>行程标签</div>
            <Select data={journeyTags.map(journey => {return {name: journey, value: journey}}).toArray()}
                    className={styles.select}
                    placeholder="请选择标签"
                    onChange={this.handleChangeTags}/>
          </div>
          <div className={styles.item}>
            <div className={styles.condition}>平台</div>
            <select name="platform" id="platform" value={state.selectedPlatform} onChange={this.handleChangePlatform}>
              {platforms.map(platform => {
                return (<option key={platform.get('code')} value={platform.get('code')}>{platform.get('name')}</option>)
              })}
            </select>
          </div>
          <div className={styles.item}>
            <div className={styles.condition}>关键词搜索</div>
            <input type="text" placeholder="请输入检索词" value={state.keywords} onChange={this.handleChangeKeyword}/>
          </div>
        </div>

        <div className={styles.right}>
          <div className={styles.item}>
            <div className={styles.condition}>行程天数</div>
            <div>
              <input type="number" min={1} value={state.days.get('start')} className={styles.inputNumber} onChange={this.handleChangeDaysStart}/>
              <span className={styles.inputNumberSep}>到</span>
              <input type="number" min={state.days.get('start')} value={state.days.get('end')} className={styles.inputNumber} onChange={this.handleChangeDaysEnd}/>
            </div>
          </div>
          <div className={styles.item}>
            <div className={styles.condition}>状态</div>
            <select name="status" id="status" value={state.selectedStatus} onChange={this.handleChangeStatus}>
              {status.map(status => {
                return (<option key={status.get('code')} value={status.get('code')}>{status.get('name')}</option>)
              })}
            </select>
          </div>
          <div className={styles.item}>
            <div className={styles.condition}>行程id</div>
            <input type="text" placeholder="请输入行程id" value={state.journeyId} onChange={this.handleChangeId}/>
          </div>
        </div>
      </div>
    )
  }

  render() {
    return (
      <div className={styles.container}>
        {this.renderSearchContainer()}

        <div className={styles.btnContainer}>
          <button className={classnames(styles.btn, styles.blue)} onClick={this.handleSearchJourney}>查询</button>
          <button className={classnames(styles.btn, styles.ghost)} onClick={this.handleResetCondition}>重置条件</button>
        </div>

        <div className={styles.btnContainer}>
          <button className={classnames(styles.btn, styles.green)}>批量上线</button>
          <button className={classnames(styles.btn, styles.red)}>批量下线</button>
        </div>

        <div>
          <Table columns={columns} dataSource={this.state.journeyList} className={styles.table} pagination={true} pageSize={2}/>
        </div>
      </div>
    )
  }
}

SearchContainer.defaultProps = {
  platforms: fromJS([{code: PLATFORM_ALL, name: "全部"}, {code: PLATFORM_MEITUAN, name: "美团"}, {code: PLATFORM_DIANPING, name: "点评"}]),//平台
  journeyTags: List(["经典", "参观博物馆", "美团", "点评", "亲子", "暑假", "情侣"]),//行程标签
  status: fromJS([{code: STATUS_ALL, name: "全部"}, {code: STATUS_OFF, name: "未发布"}, {code: STATUS_ING, name: "进行中"}]),//状态
}

SearchContainer.propTypes = {
  platforms: PropTypes.object,
  journeyTags: PropTypes.object,
  status: PropTypes.object
}

export default SearchContainer