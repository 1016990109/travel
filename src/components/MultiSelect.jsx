import React from 'react'
import styles from './MultiSelect.scss'
import PropTypes from 'prop-types'
import classnames from 'classnames'

class MultiSelect extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      isShow: false,//控制dropdown是否显示
      selectedItems: props.defaultValue || [] //初始选中的项
    }

    this.handleSelectClick = this.handleSelectClick.bind(this)
    this.handleHideDropDown = this.handleHideDropDown.bind(this)
    this.handleChooseItem = this.handleChooseItem.bind(this)
  }

  componentWillUnmount() {
    //移除组件前确保事件监听被移除
    if (this.windowListener) {
      window.removeEventListener('click', this.windowListener)
      this.windowListener = null
    }

  }

  /**
   * 点击select内容
   * @param e
   */
  handleSelectClick(e) {
    const {isShow} = this.state
    if (!isShow){
      this.setState({
        selectWidth: this.chooseDiv.clientWidth
      }, () => {
        //下拉列表显示后，添加window事件监听（隐藏下拉列表）
        if (!this.windowListener) {
          this.windowListener = this.handleHideDropDown
          window.addEventListener('click', this.windowListener)
        }
      })
    }

    this.setState({
      isShow: !isShow
    })
  }

  /**
   * 隐藏下拉列表
   */
  handleHideDropDown(e) {
    if (!this.chooseDiv.contains(e.target)) {
      this.setState({
        isShow: false
      })
    }
  }

  /**
   * 选择下拉列表项
   * @param e
   * @param item
   */
  handleChooseItem(e, item) {
    let selectedItems = this.state.selectedItems
    let index = selectedItems.findIndex(selectedItem => selectedItem.value === item.value)
    if (index !== -1) {
      selectedItems.splice(index, 1)
    } else {
      selectedItems.push(item)
    }

    this.setState({
      selectedItems: selectedItems
    }, () => {
      this.props.onChange && this.props.onChange(selectedItems)
    })

    e.stopPropagation()
  }

  render() {
    const {data, className, placeholder, isValid} = this.props
    const {isShow, selectWidth, selectedItems} = this.state

    return (
      <div className={className}>
        <div className={styles.chooseZh} onClick={this.handleSelectClick} ref={ref => this.chooseDiv = ref}>
            <div className={classnames(styles.content, isValid ? null : styles.invalid)}>
              {/*select显示内容，有内容则显示标签，否则提示选择*/}
              {
                selectedItems.length > 0 ?
                  <ul>
                    {selectedItems.map((item, index) => {
                      return (
                        <li key={`selected_${index}`} className={styles.selectedItemContainer}>
                          <div className={styles.selectedItem}>{item.name}</div>
                          <span className={styles.close} onClick={(e) => this.handleChooseItem(e, item)}>×</span>
                        </li>
                      )
                    })}
                  </ul>
                  :
                  <span className={styles.prompt}> {placeholder} </span>
              }
            </div>
        </div>
        {
          isShow ?
            <div className={styles.pull} style={{width: selectWidth}} onClick={e => e.stopPropagation()}>
              {
                ((filteredData)=> {
                return filteredData.length > 0 ?
                  filteredData.map((item, index) =>  <div key={`item_${index}`} className={styles.pullItem} onClick={(e) => this.handleChooseItem(e, item)}>{item.name}</div>)
                  :
                  <div className={styles.pullItem}>暂无数据</div>
                })(data.filter(item => !selectedItems.find(selectedItem => item.value === selectedItem.value)))
              }
            </div>
            :
            null
        }

      </div>
    )
  }
}

MultiSelect.propTypes = {
  data: PropTypes.arrayOf(PropTypes.shape({
    name: PropTypes.string,
    value: PropTypes.any
  })).isRequired, //下拉列表内容
  className: PropTypes.string,
  placeholder: PropTypes.string,//提示
  onChange: PropTypes.func,//选中或移除某一项的回调
  defaultValue: PropTypes.arrayOf(PropTypes.shape({
    name: PropTypes.string,
    value: PropTypes.any
  })),//默认选中
  isValid: PropTypes.bool//控制是否合法
}

MultiSelect.defaultProps = {
  placeholder: '请选择',
  isValid: true
}

export default MultiSelect