import React from 'react'
import PropTypes from 'prop-types'
import styles from './Pagination.scss'
import classnames from 'classnames'

const MAX_SHOW_PAGE = 5 //显示的最多页数导航

class Pagination extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      page: 1
    }

    this.handleChangePage = this.handleChangePage.bind(this)
  }

  handleChangePage(e) {
    const {total, pageSize} = this.props
    const totalPage = pageSize > 0 && Math.ceil(total / pageSize) //总页数

    if (/\d*/.test(e.target.value)) {
      let value = parseInt(e.target.value)

      if (value > totalPage) {
        value = totalPage
      }

      this.setState({
        page: value
      })
    }
  }

  render() {
    const {current, total, pageSize, switchChange} = this.props
    const {page} = this.state
    const totalPage = pageSize > 0 && Math.ceil(total / pageSize) //总页数

    //显示分页按钮
    let begin //页数显示开始位置
    let len = totalPage
    if (len > MAX_SHOW_PAGE) {
      len = MAX_SHOW_PAGE;
      if (current >= (totalPage - 2)) {
        //当前页数在后MAX_SHOW_PAGE中后，只显示后5页导航
        begin = totalPage - 4;
      } else if (current <= 3) {
        //当前页数在前MAX_SHOW_PAGE中前，只显示开始5页导航
        begin = 1;
      } else {
        begin = current - 2;
      }
    } else {
      len = totalPage;
      begin = 1;
    }

    //根据返回的总记录数计算当前页显示的数据
    let pageNum = []
    for (let i = 0; i < len; i++) {
      let index = begin + i //页数
      pageNum.push(
        <a onClick={() => switchChange(index)}
           className={classnames(styles.num, index === current ? styles.current : null,)}
           key={`page_${index}`}>
          {index}
        </a>)
    }
    return (
      <div className={styles.pagination}>
        <a className={classnames(styles.pre, current === 1 ? styles.disable : null)} onClick={() => switchChange(current - 1)}>{'<'}</a>
        <span>
            {pageNum}
          </span>
        <a className={classnames(styles.next, current === totalPage ? styles.disable : null)} onClick={() => switchChange(current + 1)}>{'>'}</a>

        <div className={styles.info}>
          总共
          <span className={styles.total}>{total}</span>
          条， 共
          <span className={styles.total}>{totalPage}</span>
          页，跳转到第
          <input type="number" min={Math.min(1, totalPage)} max={totalPage} value={page} onChange={this.handleChangePage}/>页
          <button className={styles.confirm} onClick={() => switchChange(page)}>确定</button>
        </div>
      </div>
    )
  }
}

Pagination.propTypes = {
  current: PropTypes.number, //当前页数
  total: PropTypes.number, //数据总数
  pageSize: PropTypes.number, //每页大小
  switchChange: PropTypes.func,
}

export default Pagination