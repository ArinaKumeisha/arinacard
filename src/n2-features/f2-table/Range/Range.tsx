import React from 'react';
import {getTrackBackground, Range} from 'react-range';
import style from './Range.module.css'

type  PropsType = {
    values: number[]
    setValues: ([]: number[]) => void
}
const PriceRange: React.FC<PropsType> =props=> {
     const {values, setValues} = props
    return (
        <div className={style.block}>
            <h3>amount of cards</h3>
        <Range
            values={values}
            step={1}
            min={0}
            max={100}
            onChange={values => setValues(values)}
            renderTrack={({props, children}) => (
                <div
                    onMouseDown={props.onMouseDown} //выполняется при нажатии клавиши
                    onTouchStart={props.onTouchStart} //срабатывает при касании элемента(длинная)
                    className={style.band}>

                    <div
                        ref={props.ref}
                        style={{
                            height: '5px',
                            width: '100%',
                            borderRadius: '4px',
                            background: getTrackBackground({
                                values: values,
                                colors: ['#ccc', 'yellow', '#ccc'],
                                min: 0,
                                max: 100,
                            }),
                            alignSelf: 'center'}}>
                        {children}

                    </div>
                </div>)}

            renderThumb={({index, props, isDragged}) => (
                <div
                    {...props}
                    className={style.slider}>

                    <div className={style.numSlider}>
                        {values[index].toFixed(0)}
                        {/*// 10.12345 => 10; (1) => 10.1; (2) > 10.12; ...*/}
                    </div>

                    <div style={{
                            height: '16px',
                            width: '5px',
                            backgroundColor: isDragged ? '#fbbf62' : '#CCC'}}/>
                </div>)}
        />
        </div>
    );
};

export default PriceRange;