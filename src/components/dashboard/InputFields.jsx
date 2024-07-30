import React from 'react';

function MobileDataInput(props) {
    return (
        <div className='flex flex-col gap-y-1 lg:w-[32%]'>
            <div className="flex flex-row justify-start h-[40%]">
                <label for={props.class}>{props.name}</label>
            </div>
            <div className="join flex flex-col gap-y-1 w-full h-[60%]">
                <div className="flex flex-row justify-start h-[60%]">
                    <input type="number" defaultValue={0} name={props.class} className="input input-sm bg-white border-primary rounded join-item w-full placeholder-transparent::placeholder" placeholder="Amount"/>
                    <select name={`${props.class}-unit`} className="select select-sm select-bordered bg-base-300 border-primary rounded join-item w-[55%] pl-1.5">
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
    
    // Today's date as default value of date picker
    var date = new Date();

    var day = date.getDate();
    var month = date.getMonth() + 1;
    var year = date.getFullYear();

    if (month < 10) month = "0" + month;
    if (day < 10) day = "0" + day;

    var today = year + "-" + month + "-" + day;

    return (
        <div className='flex flex-col justify-between gap-y-1.5 lg:w-[32%]'>
            <div className="flex flex-row justify-start h-[35%]">
                <label for={props.class}>{props.name}</label>
            </div>
            <div className="flex flex-col w-full h-[65%]">
                <input type="date" defaultValue={today} name={props.class} id={props.class} className="bg-white border border-primary rounded py-0.5 px-1 w-full"/>
            </div>
        </div>
    );
}

function InputFields({ onInput }) {

    function handleSubmit(e) {

        // Prevent the browser from reloading the page
        e.preventDefault();

        // Read the form data
        const form = e.target;
        const formData = new FormData(form);

        // You can pass formData as a fetch body directly:
        fetch('/submitData', { method: form.method, body: formData });

        // Or you can work with it as a plain object:
        const formJson = Object.fromEntries(formData.entries());

        onInput(formJson);

    }

    return ( 
        <div className="flex flex-col gap-y-6">
            <form method="post" onSubmit={handleSubmit}>
                <div id="input-fields" className="flex flex-row lg:flex-col justify-between gap-x-0.5 lg:gap-y-5">
                    <div id="date-fields" className="flex flex-col lg:flex-row justify-items-start lg:justify-between gap-y-2 w-[47%] lg:w-full">
                        <DatePicker name="Start Date" class="start-date" ></DatePicker>
                        <DatePicker name="Current Date" class="current-date" ></DatePicker>
                        <DatePicker name="End Date" class="end-date" ></DatePicker>
                    </div>
                    <div id="mobile-data-fields" className="flex flex-col lg:flex-row justify-items-start lg:justify-between gap-y-2 w-[47%] lg:w-full">
                        <MobileDataInput name="Original Data" class="original-data"></MobileDataInput>
                        <MobileDataInput name="Current Data" class="current-data"></MobileDataInput>
                        <div className='flex flex-col gap-y-1 justify-end lg:w-[32%]'>
                            <button type="submit" className="btn btn-sm bg-primary text-white w-full hidden lg:block lg:self-end lg:h-[55%]">COMPUTE MY DATA</button>
                        </div>
                    </div>
                </div>

                <button type="submit" className="btn btn-wide bg-primary text-white w-full lg:hidden">COMPUTE MY DATA</button>
            </form>
        </div>
     );
}

export default InputFields;