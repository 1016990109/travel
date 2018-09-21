import React from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import SearchContainer from './search/SearchContainer'
import FormContainer from './form/FormContainer'
import styles from './AppComponent.scss'
import { addJourney } from '../reducer/journey'
import ImmutablePropTypes from 'react-immutable-proptypes'
import PropTypes from 'prop-types'

class AppComponent extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      url: 'search'
    }
  }

  componentDidMount() {
    //test redux
    console.log(this.props.journeyList)
    this.props.addJourney('test')
  }

  handleRouteChange(url) {
    this.setState({
      url: url
    })
  }

  render() {
    return (
      <div className={styles.container}>
        <ul className={styles.nav}>
          <li onClick={() => this.handleRouteChange('search')}>行程列表</li>
          <li onClick={() => this.handleRouteChange('form')}>新加行程</li>
        </ul>

        <div className={styles.content}>
          {this.state.url === 'search' ? <SearchContainer/> : <FormContainer/>}
        </div>
      </div>
    )
  }
}

AppComponent.propTypes = {
  addJourney: PropTypes.func.isRequired,
  journeyList: ImmutablePropTypes.list.isRequired
}

function mapStateToProps(state) {
  return {
    journeyList: state.get('journey').get('journeyList')
  }
}

function mapDispatchToProps(dispatch) {
  return {
    addJourney: bindActionCreators(addJourney, dispatch)
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AppComponent)
