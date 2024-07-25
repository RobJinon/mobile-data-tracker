import React from 'react';

function MobileDataInput(props) {
    return (
        <div className='flex flex-col gap-y-1'>
            <div className="flex flex-row justify-start h-[40%]">
                <label for={props.class}>{props.name}</label>
            </div>
            <div className="join flex flex-col gap-y-1 w-full h-[60%]">
                <div className="flex flex-row justify-start h-[60%]">
                    <input className="input input-sm bg-white border-primary rounded text-base-300 join-item w-full" placeholder="Amount" />
                    <select className="select select-sm select-bordered bg-base-300 border-primary rounded join-item w-[55%]">
                        <option>TB</option>
                        <option selected>GB</option>
                        <option>MB</option>
                        <option>KB</option>
                    </select>
                </div>
            </div>
        </div>
    );
}

function DatePicker(props) {
    return (
        <div className='flex flex-col justify-between gap-y-1.5'>
            <div className="flex flex-row justify-start h-[35%]">
                <label for={props.class}>{props.name}</label>
            </div>
            <div className="flex flex-col w-full h-[65%]">
                <input type="date" className="bg-white border border-primary rounded text-base-300 py-0.5 px-1" id={props.class} name={props.class}/>
            </div>
        </div>
    );
}

function InputFields() {
    return ( 
        <div className="flex flex-col gap-y-6">
            <div id="input-fields" className="flex flex-row justify-between gap-x-0.5">
                <div id="date-fields" className="flex flex-col justify-items-start gap-y-2 w-[47%]">
                    <DatePicker name="Start Date" class="start-date" ></DatePicker>
                    <DatePicker name="Current Date" class="current-date" ></DatePicker>
                    <DatePicker name="End Date" class="end-date" ></DatePicker>
                </div>
                <div id="mobile-data-fields" className="flex flex-col justify-items-start gap-y-2 w-[47%]">
                    <MobileDataInput name="Original Data" class="original-data"></MobileDataInput>
                    <MobileDataInput name="Original Data" class="original-data"></MobileDataInput>
                </div>
            </div>

            <button className="btn btn-wide bg-primary text-white w-full">COMPUTE MY DATA</button>
        </div>
     );
}

export default InputFields;