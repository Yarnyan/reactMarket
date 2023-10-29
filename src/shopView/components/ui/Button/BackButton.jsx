import React from 'react'
import {MdKeyboardArrowLeft} from 'react-icons/md'
import classes from './Button.module.css'
import { useNavigate } from "react-router-dom"
import { useSelector, useDispatch } from 'react-redux';
import { connect } from 'react-redux';
const mapStateToProps = (state) => {
  return {
      counter: state.newValue,
  };
};
const BackButton = ({counter}) => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const handleClick = () => {
    dispatch({ type: 'SET_NEW_ADDRESS_VALUE', payload: '' })
    dispatch({ type: 'SET_NEW_MAX_VALUE', payload: null})
    navigate(-1)
  }
  return (
    <button className={classes.shopPage__header_btn} onClick={() => handleClick()}>
        <MdKeyboardArrowLeft className={classes.Arrow}/>
    </button>
  )
}

export default connect(mapStateToProps)(BackButton);