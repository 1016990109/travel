import React from 'react'
import {Switch, Route, NavLink, Redirect} from 'react-router-dom'
import {connect} from 'react-redux'
import { bindActionCreators } from 'redux';
import SearchContainer from './search/SearchContainer'
import FormContainer from './form/FormContainer'
import styles from './AppComponent.scss'
import {addJourney} from '../reducer/journey'
import ImmutablePropTypes from 'react-immutable-proptypes'
import PropTypes from 'prop-types'

class AppComponent extends React.Component {
  componentDidMount() {
    //test redux
    console.log(this.props.journeyList)
    this.props.addJourney('test')
  }

  render() {
    return (
      <div className={styles.container}>
        <ul className={styles.nav}>
          <li><NavLink to={"/search"} activeClassName={styles.active}>行程列表</NavLink></li>
          <li><NavLink to={"/form"} activeClassName={styles.active}>新加行程</NavLink></li>
        </ul>

        <div className={styles.content}>
          <Switch>
            <Redirect from='/' to='/search' exact/>
            <Route path='/search' component={SearchContainer}/>
            <Route path='/form' component={FormContainer}/>
          </Switch>
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

export default connect(mapStateToProps, mapDispatchToProps)(AppComponent)
