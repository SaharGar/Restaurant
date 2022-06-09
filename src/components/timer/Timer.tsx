import React, {useEffect} from "react";
import {useTimer} from "use-timer";
import {useDispatch} from "react-redux";
import {timerActions} from "../../store/timer.slice";

export const Timer: React.FC = () => {

    const {time, start, pause, reset} = useTimer();
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(timerActions.setTimer(time));
    }, [time])

    const handleTimerActions = (action: string) => {
        switch (action) {
            case 'start':
                start()
                dispatch(timerActions.setStatus('running'))
                break;
            case 'pause':
                pause()
                dispatch(timerActions.setStatus('paused'))
                break;
            case 'reset':
                reset()
                dispatch(timerActions.setStatus('stopped'))
                break;
        }
    }

    return (
        <div className='timer-btns'>
            <span>{time}</span>
            <button onClick={() => handleTimerActions('start')}>Start</button>
            <button onClick={() => handleTimerActions('pause')}>Pause</button>
            <button onClick={() => handleTimerActions('reset')}>Reset</button>
        </div>
    )
}