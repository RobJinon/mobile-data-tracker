import React from 'react';

function MobileDataInput(props) {
    return (
        <div className="join flex flex-col">

            <div className="flex flex-row justify-start">
                <label for={props.class}>{props.name}</label>
            </div>
            <div className="flex flex-row justify-start">
                <input className="input input-bordered join-item" placeholder="Enter amount" />
                <select className="select select-bordered join-item">
                    <option>TB</option>
                    <option selected>GB</option>
                    <option>MB</option>
                    <option>KB</option>
                </select>
            </div>

        </div>
    );
}

function DatePicker(props) {
    return (
        <div className="date-input-field flex flex-col">
            <div className="flex flex-row justify-start"><label for={props.class}>{props.name}</label></div>
            <input type="date" className="bg-transparent p-2 border border-primary rounded" id={props.class} name={props.class}/>
        </div>
    );
}

function InputFields() {
    return ( 
        <div id="input-fields">
            <h1 id="welcome">Welcome!</h1>
            <div id="date-fields" className="flex flex-col justify-items-start">

                <DatePicker name="Start Date" class="start-date" ></DatePicker>
                <DatePicker name="Current Date" class="current-date" ></DatePicker>
                <DatePicker name="End Date" class="end-date" ></DatePicker>
                <MobileDataInput name="Original Data" class="original-data"></MobileDataInput>

            </div>

        </div>
     );
}

export default InputFields;