import React from 'react';

function DatePicker(props) {
    return (
        <div className="date-input-field flex flex-col">
            <div className="flex flex-row justify-start"><label for="start-date">{props.name}</label></div>
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

            </div>

        </div>
     );
}

export default InputFields;