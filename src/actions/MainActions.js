import {
  FETCH_ALL_CARDS,
  FETCH_ALL_CARDS_SUCCESS,
  FETCH_ALL_CARDS_FAIL,
} from './types';
import axios from 'axios';
import {BASE_URL, headers} from '../constants/api';

export const fetchAllCards = () => async dispatch => {
  dispatch({type: FETCH_ALL_CARDS});
  try {
    const {data} = await axios.get(BASE_URL + 'cards', {headers});
    console.log(data);
  } catch (e) {
    dispatch({type: FETCH_ALL_CARDS_FAIL, payload: 'Failed to get cards'});
  }
};
