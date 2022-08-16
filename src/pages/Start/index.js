import styles from './Start.module.scss'
import classNames from 'classnames/bind'
import { useNavigate } from 'react-router'
import { useState, useEffect } from 'react'
import { useDispatch } from 'react-redux'
import {
	setName,
	setTotalPoint,
	setCorrect,
	setIncorrect,
	setMaxStreak,
	setTimeStart,
	setMode,
	setId,
} from '../../store/playing'
import axios from 'axios'

let cx = classNames.bind(styles)

function Start() {
	const [name, setNamePlayer] = useState('')
	const [age, setAge] = useState()
	const [score, setScore] = useState(0)

	const navigate = useNavigate()
	const dispatch = useDispatch()

	useEffect(() => {
		if (name != '') axios({
			url: `http://localhost:8080/user/${name}`,
			method: 'get',
		}).then(res => {
			setScore(res.data.score)
			dispatch(setId(res.data.id))
			// console.log(res.data.id);
		})
	}, [age])

	const playGame = (e) => {
		dispatch(setName(name))
		dispatch(setTotalPoint(0))
		dispatch(setCorrect(0))
		dispatch(setIncorrect(0))
		dispatch(setMaxStreak(0))
		dispatch(setTimeStart(new Date().getTime()))
		// console.log(e.target.innerText);
		dispatch(setMode(e.target.innerText))
		navigate('/play', { replace: true })
	}

	return (
		<div className={cx('wrap')}>
			<div className={cx('top')}>
				<button className={cx('logo')}>Quiziz</button>
				<button className={cx('escape')}>End</button>
			</div>

			<div className={cx('start')}>
				<div className={cx('information')}>
					<p>To play this quiz</p>
					<p>Your name</p>
					<input
						type="text"
						value={name}
						onChange={(e) => setNamePlayer(e.target.value)}
					/>
					<p>Your age</p>
					<input
						type="number"
						min="1"
						onChange={(e) => setAge(e.target.value)}
					/>
					<p>Your highest score: {score}</p>
				</div>
				<div className={cx('choose_box')}>
					<button className={cx('start_btn')} onClick={(e) => playGame(e)}>
						Practice
					</button>
					<button className={cx('start_btn')} onClick={(e) => playGame(e)}>
						Exam
					</button>
				</div>
			</div>
		</div>
	)
}

export default Start
