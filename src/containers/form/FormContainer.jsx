import React from 'react'
import styles from './FormContainer.scss'
import classnames from 'classnames'
import Select from '../../components/MultiSelect'
import {List, fromJS} from "immutable";
import PropTypes from 'prop-types'

//名称最小和最大长度
const NAME_LENGTH_MIN = 5, NAME_LENGTH_MAX = 30
//检查是否合法的验证
const validation = {
  isNameValid: name => name.length >= NAME_LENGTH_MIN && name.length <= NAME_LENGTH_MAX,
  isDestinationValid: destinations => destinations.size > 0,
  isTagValid: tags => tags.size > 0,
  isHotValid: hot => {
    if (/\d{1,3}/.test(hot)) {
      let hotValue = parseInt(hot)
      return hotValue >= 0 && hotValue <= 100
    } else {
      return false
    }
  },
  isIntroductionValid: intro => intro.trim().length > 0
}

class FormContainer extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      name: '',
      isNameValid: true,//名称是否合法
      img_meituan: '',
      img_dianping1: '',
      img_dianping2: '',
      destinations: List(),
      isDestinationValid: true,//目的地是否合法
      tags: List(),
      isTagValid: true,//标签是否合法
      hot: '',
      isHotValid: true,//热度是否合法
      introduction: '',
      isIntroductionValid: true//介绍是否合法
    }

    this.handleNameChange = this.handleNameChange.bind(this)
    this.handleMeituanImgChoose = this.handleMeituanImgChoose.bind(this)
    this.handleDianping1ImgChoose = this.handleDianping1ImgChoose.bind(this)
    this.handleDianping2ImgChoose = this.handleDianping2ImgChoose.bind(this)
    this.handleHotChange = this.handleHotChange.bind(this)
    this.handleIntroChange = this.handleIntroChange.bind(this)
    this.handleDestinationsChange = this.handleDestinationsChange.bind(this)
    this.handleTagsChange = this.handleTagsChange.bind(this)
    this.handleFormSubmit = this.handleFormSubmit.bind(this)
  }

  handleNameChange(e) {
    let value = e.target.value,
      isNameValid = validation.isNameValid(value)

    this.setState({
      name: value,
      isNameValid: isNameValid
    })
  }

  handleMeituanImgChoose() {
    let file = this.meituanInput.files[0]
    this.handleLoadImg(file, (result) => {
      this.setState({
        img_meituan: result
      })
    })
  }

  handleDianping1ImgChoose() {
    let file = this.dianpingInput1.files[0]
    this.handleLoadImg(file, (result) => {
      this.setState({
        img_dianping1: result
      })
    })
  }

  handleDianping2ImgChoose() {
    let file = this.dianpingInput2.files[0]
    this.handleLoadImg(file, (result) => {
      this.setState({
        img_dianping2: result
      })
    })
  }

  /**
   * 从本地文件获取文件流，将结果返回给回调函数cb
   * @param file
   * @param cb
   */
  handleLoadImg(file, cb) {
    let reader = new FileReader()
    reader.onload = (e) => {
      cb(e.target.result)
    }
    reader.readAsDataURL(file)
  }

  handleHotChange(e) {
    let value = e.target.value,
      isHotValid = validation.isHotValid(value)

    this.setState({
      hot: value,
      isHotValid: isHotValid
    })
  }

  handleIntroChange(e) {
    let value = e.target.value,
      isIntroductionValid = validation.isIntroductionValid(value)

    this.setState({
      introduction: value,
      isIntroductionValid: isIntroductionValid
    })
  }

  handleDestinationsChange(selectedItems) {
    let destinations = fromJS(selectedItems)
    this.setState({
      destinations: destinations,
      isDestinationValid: validation.isDestinationValid(destinations)
    })
  }

  handleTagsChange(selectedItems) {
    let tags = fromJS(selectedItems)
    this.setState({
      tags: tags,
      isTagValid: validation.isTagValid(tags)
    })
  }

  /**
   * 表单提交和检查
   */
  handleFormSubmit() {
    const {name, hot, introduction, tags, destinations} = this.state

    this.setState({
      isNameValid: validation.isNameValid(name),
      isHotValid: validation.isHotValid(hot),
      isIntroductionValid: validation.isIntroductionValid(introduction),
      isTagValid: validation.isTagValid(tags),
      isDestinationValid: validation.isDestinationValid(destinations)
    })

    /*
    something to do
     */
  }

  render() {
    const {journeyTags, destinations} = this.props
    const {name, isNameValid, hot, isHotValid, introduction, isIntroductionValid, isTagValid, isDestinationValid, img_meituan, img_dianping1, img_dianping2} = this.state

    return (
      <div className={styles.container}>
        <div className={styles.operations}>
          <button className={classnames(styles.btn, styles.ghost)} onClick={this.handleFormSubmit}>保存</button>
          <button className={classnames(styles.btn, styles.blue)} onClick={this.handleFormSubmit}>发布</button>
          <button className={classnames(styles.btn, styles.blue)}>+ 添加行程</button>
        </div>

        <div className={styles.content}>
          {/*导航*/}
          <ul className={styles.nav}>
            <li className={styles.active}><a href={'#'}>行程概况</a></li>
            <li><a href={'#'} >Day 1</a></li>
            <li><a href={'#'} >Day 2</a></li>
            <li><a href={'#'} >Day 3</a></li>
          </ul>

          {/*表单内容*/}
          <form className={styles.form}>
            <div className={styles.formItem}>
              <div className={styles.formLabel}>
                <label htmlFor="name" className={styles.required}>行程名称</label>
              </div>
              <div className={styles.itemControl}>
                <span className={classnames(styles.required, isNameValid ? null : styles.invalid)}><input type="text" id="name" value={name} onChange={this.handleNameChange}/></span>
                <span className={styles.prompt}>(名称长度5-30个字)</span>
              </div>
            </div>

            <div className={styles.formItem}>
              <div className={styles.formLabel}>
                <label htmlFor="meituan">美团行程头图(尺寸要求 750*420)</label>
              </div>
              <div className={styles.itemControl}>
                {
                  img_meituan.length > 0 ?
                    <div className={styles.img} onClick={() => this.meituanInput.click()}>
                      <img src={img_meituan} alt="美团行程头图"/>
                    </div>
                    :
                    <div className={styles.upload} onClick={() => this.meituanInput.click()}>上传</div>
                }
                <input id="meituan"
                       type="file"
                       style={{ display: 'none' }}
                       accept="image/gif, image/jpg, image/jpeg, image/png"
                       ref={ref => this.meituanInput = ref}
                       onChange={this.handleMeituanImgChoose}
                       onClick={(e) => e.target.value = null}/>
              </div>
            </div>

            <div className={styles.formItem}>
              <div className={styles.formLabel}>
                <label>点评行程头图(建议尺寸 750*300、750*1334)</label>
              </div>
              <div className={styles.itemControl}>
                {
                  img_dianping1.length > 0 ?
                    <div className={classnames(styles.img, styles.dianping1)} onClick={() => this.dianpingInput1.click()}>
                      <img src={img_dianping1} alt="点评行程头图"/>
                    </div>
                    :
                    <div className={styles.upload} onClick={() => this.dianpingInput1.click()}>上传</div>
                }
                {
                  img_dianping2.length > 0 ?
                    <div className={classnames(styles.img, styles.dianping2)} onClick={() => this.dianpingInput2.click()}>
                      <img src={img_dianping2} alt="点评行程头图"/>
                    </div>
                    :
                    <div className={styles.upload} onClick={() => this.dianpingInput2.click()}>上传</div>
                }
                <input id="dianpint1"
                       type="file"
                       ref={ref => this.dianpingInput1 = ref}
                       style={{ display: 'none' }}
                       onChange={this.handleDianping1ImgChoose}
                       accept="image/gif, image/jpg, image/jpeg, image/png"/>
                <input id="dianpint2"
                       type="file"
                       ref={ref => this.dianpingInput2 = ref}
                       style={{ display: 'none' }}
                       onChange={this.handleDianping2ImgChoose}
                       accept="image/gif, image/jpg, image/jpeg, image/png"/>
              </div>
            </div>

            <div className={styles.formItem}>
              <div className={styles.formLabel}>
                <label className={styles.required}>目的地</label>
              </div>
              <div className={styles.itemControl}>
                <Select isValid={isDestinationValid}
                        data={destinations.map(destination => ({name: destination, value: destination})).toJS()}
                        onChange={this.handleDestinationsChange}/>
              </div>
            </div>

            <div className={styles.formItem}>
              <div className={styles.formLabel}>
                <label className={styles.required}>标签</label>
              </div>
              <div className={styles.itemControl}>
                <Select isValid={isTagValid}
                        data={journeyTags.map(tag => ({name: tag, value: tag})).toJS()}
                        onChange={this.handleTagsChange}/>
              </div>
            </div>

            <div className={styles.formItem}>
              <div className={styles.formLabel}>
                <label htmlFor="name" className={styles.required}>热度</label>
              </div>
              <div className={styles.itemControl}>
                <span className={styles.required}>
                  <input className={classnames(styles.hot, isHotValid ? null : styles.invalid)} type="number" pattern="\d{1,3}" min={1} max={100} value={hot} onChange={this.handleHotChange} />
                  <span>%人旅行者选择此路线</span>
                </span>
              </div>
            </div>

            <div className={styles.formItem}>
              <div className={styles.formLabel}>
                <label htmlFor="introduction" className={styles.required}>行程介绍</label>
              </div>
              <div className={styles.itemControl}>
                <span className={styles.required}>
                  <textarea className={classnames(styles.intro, isIntroductionValid ? null : styles.invalid)} name="introduction" id="introduction" value={introduction} onChange={this.handleIntroChange} cols="30" rows="5"/>
                </span>
              </div>
            </div>

          </form>
        </div>
      </div>
    )
  }
}

FormContainer.defaultProps = {
  journeyTags: List(["经典", "参观博物馆", "美团", "点评", "亲子", "暑假", "情侣"]),//行程标签
  destinations:  List(["西班牙", "纽约", "巴黎", "首尔", "奥地利", "日本", "伦敦"]),//目的地
}

FormContainer.propTypes = {
  journeyTags: PropTypes.object,
  destinations: PropTypes.object
}

export default FormContainer
