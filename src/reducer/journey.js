import {fromJS} from 'immutable'

const initialState = fromJS({
  //journey data
  journeyList: [1,2,3]
})

const ADD_JOURNEY = 'ADD_JOURNEY'

export const addJourney = (journey) => {
  return {
    type: ADD_JOURNEY,
    payload: journey
  }
}

export default (state = initialState, action) => {
  switch (action) {
    case ADD_JOURNEY:
      state = state.get('journeyList').push(action.payload)
      break
    default:
      break
  }

  return state
}