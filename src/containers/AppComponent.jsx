import React from 'react'
import {Switch, Route, NavLink, Redirect} from 'react-router-dom'
import {connect} from 'react-redux'
import SearchContainer from './search/SearchContainer'
import FormContainer from './form/FormContainer'
import styles from './AppComponent.scss'

class AppComponent extends React.Component {
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

function mapStateToProps() {
  return {}
}

function mapDispatchToProps(dispatch) {
  return {}
}

export default connect(mapStateToProps, mapDispatchToProps)(AppComponent)
