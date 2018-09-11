import React from 'react'
import styles from './Table.scss'
import PropTypes from 'prop-types'
import classnames from 'classnames'
import Pagination from './Pagination'

class Table extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      page: 1
    }

    this.getDataSource = this.getDataSource.bind(this)
  }

  UNSAFE_componentWillReceiveProps(nextProps) {
    if (nextProps !== this.props) {
      //表格内容数据变化重置页数
      this.setState({
        page: 1
      })
    }
  }

  /**
   * 根据页数返回相应数据
   */
  getDataSource() {
    const {pagination, pageSize} = this.props
    const {page} = this.state
    let dataSource = this.props.dataSource

    if (pagination && pageSize > 0) {
      return dataSource.slice((page - 1) * pageSize, Math.min(dataSource.length, page * pageSize))
    } else {
      return dataSource
    }
  }

  render() {
    const {className, columns, pagination, pageSize} = this.props
    const {page} = this.state
    const dataSource = this.getDataSource()

    return (
      <div>
        <table className={classnames(className, styles.table)}>
          {/*控制列宽*/}
          <colgroup>
            {columns.map((column, index) => {
              return <col key={`col_${index}`} style={{width: column.width, minWidth: column.width}}/>
            })}
          </colgroup>
          <thead className={styles.thead}>
          {/*表头*/}
          <tr>
            {columns.map((column, index) => {
              return <th key={`th_${index}`}><span>{column.title}</span></th>
            })}
          </tr>
          </thead>

          {/*表格内容*/}
          <tbody className={styles.tbody}>
          {dataSource.map((data, dIndex) => {
            return (
              <tr key={`tr_${dIndex}`}>
                {columns.map((column, cIndex) => {
                  return <td key={`td_${column.key || cIndex}`}>{
                    column.render ?
                      column.render(data, dIndex)
                      :
                      data[column.dataIndex]
                  }</td>
                })}
              </tr>
            )
          })}
          </tbody>
        </table>

        {/*控制分页*/}
        {
          pagination ?
            <Pagination current={page}
                        total={this.props.dataSource.length}
                        pageSize={pageSize}
                        pageClick={(page) => this.setState({page: page})}
                        switchChange={page => this.setState({page: page})}
            />
            :
            null
        }
      </div>
    )
  }
}

Table.propTypes = {
  columns: PropTypes.any,
  dataSource: PropTypes.any,//考虑兼容性，不使用immutable
  className: PropTypes.string,
  pagination: PropTypes.bool,//是否分页，分页为true
  pageSize: PropTypes.number//当pagination为true时有效，每页的数据量
}

Table.defaultProps = {
  dataSource: []
}

export default Table