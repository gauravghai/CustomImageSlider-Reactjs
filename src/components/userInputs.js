import React from 'react'

function UserInputs(props) {
    return (
        <form onSubmit={props.submit}>
            <div className="duration">
                <label>Duration : </label>
                <input id="duration" name="duration" type="text" value={props.autoPlayInterval} onChange={(e) => props.valueUpdate(e, 1)}/>
                <p className="error">{props.autoPlayDurationError && props.autoPlayInterval !== '' && 'Duration value can not be zero'}</p>
            </div>
            <div className="direction">
                <label>Direction: </label>
                <div className="form-check">
                    <input className="form-check-input" type="radio" name="exampleRadios" id="exampleRadios1" value="1" defaultChecked onChange={(e) => props.valueUpdate(e, 0)}/>
                    <label className="form-check-label" htmlFor="exampleRadios1">
                    Forward
                    </label>
                </div>
                <div className="form-check">
                    <input className="form-check-input" type="radio" name="exampleRadios" id="exampleRadios2" value="0" onChange={(e) => props.valueUpdate(e, 0)}/>
                    <label className="form-check-label" htmlFor="exampleRadios2">
                    Reverse
                    </label>
                </div>
            </div>
            <button>Submit</button>
        </form>
    )
}

export default UserInputs;