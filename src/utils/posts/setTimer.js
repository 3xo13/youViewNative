// set a timer on the post and handle time end
useEffect(() => {
	let interval

	if (play) {
		interval = setInterval(() => {
			setTimer((prevSeconds) => {
				if (prevSeconds === 0) {
					clearInterval(interval)
					setPlay(false)
					setSendReward(true)
					return 0
				} else {
					return prevSeconds - 1
				}
			})
		}, 1000)
	} else {
		clearInterval(interval)
	}

	return () => clearInterval(interval)
}, [play])
