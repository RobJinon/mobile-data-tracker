import React, { useState, useEffect } from 'react';

function AddIspModal(props) {
    const today = new Date().toISOString().split('T')[0];

    const [ispName, setIspName] = useState("");
    const [startDate, setStartDate] = useState(today);
    const [endDate, setEndDate] = useState(today);
    const [origData, setOrigData] = useState(0);
    const [origDataUnit, setOrigDataUnit] = useState("GB");
    const [errors, setErrors] = useState({});

    const [ispList, setIspList] = useState();

    const validateForm = () => {
        const newErrors = {};
        if (!ispName) newErrors.ispName = "ISP name is required";
        if (!startDate) newErrors.startDate = "Start date is required";
        if (!endDate) newErrors.endDate = "End date is required";
        if (!origData) newErrors.origData = "Amount is required";
        if (origData <= 0) newErrors.origData = "Amount must be greater than 0";
        return newErrors;
    };


    return (
        <dialog id="add_isp_modal" className="modal">
            <div className="modal-box w-5/6 flex flex-col gap-3 lg:w-full">
                <h3 className="font-bold text-xl text-center">ADD ISP</h3>

                <label className="form-control px-5 w-full mt-5 max-w-xs">
                    <div className="label">
                        <span className="label-text">Internet Service Provider {"("}ISP{")"}</span>
                    </div>
                    <input
                        id='isp_name'
                        type="text"
                        placeholder="ISP Name"
                        className={`input input-bordered w-full max-w-xs ${errors.ispName ? 'input-error' : ''}`}
                        value={ispName}
                        onChange={e => setIspName(e.target.value)}
                    />
                    {errors.ispName && <span className="text-error">{errors.ispName}</span>}
                </label>

                <label className="form-control px-5 w-full max-w-xs">
                    <div className="label">
                        <span className="label-text">When did you start consuming data?</span>
                    </div>
                    <input
                        id='date_start'
                        type="date"
                        className={`input input-bordered w-full ${errors.startDate ? 'input-error' : ''}`}
                        value={startDate}
                        onChange={e => setStartDate(e.target.value)}
                    />
                    {errors.startDate && <span className="text-error">{errors.startDate}</span>}
                </label>

                <label className="form-control px-5 w-full max-w-xs">
                    <div className="label">
                        <span className="label-text">Until when do you want your data to last?</span>
                    </div>
                    <input
                        id='date_end'
                        type="date"
                        className={`input input-bordered w-full ${errors.endDate ? 'input-error' : ''}`}
                        value={endDate}
                        onChange={e => setEndDate(e.target.value)}
                    />
                    {errors.endDate && <span className="text-error">{errors.endDate}</span>}
                </label>

                <label className="form-control px-5 w-full max-w-xs">
                    <div className="label">
                        <span className="label-text">How much data do you initially have?</span>
                    </div>
                    <div className='join'>
                        <input
                            id='amount'
                            type="number"
                            className={`input input-bordered w-1/4 join-item ${errors.origData ? 'input-error' : ''}`}
                            value={origData}
                            onChange={e => setOrigData(e.target.value)}
                        />
                        <select
                            id='amount_unit'
                            className='select select-bordered bg-base-300 join-item'
                            value={origDataUnit}
                            onChange={e => setOrigDataUnit(e.target.value)}
                        >
                            <option value="TB">TB</option>
                            <option value="GB">GB</option>
                            <option value="MB">MB</option>
                        </select>
                    </div>
                    {errors.origData && <span className="text-error">{errors.origData}</span>}
                </label>

                <div className="flex flex-col w-full my-4 gap-2 p-5">
                    <button className='btn btn-primary text-white'>BEGIN TRACKING MY DATA</button>
                    <form method='dialog' className='w-full'>
                        <button className='btn bg-base-300 w-full'>CANCEL</button>
                    </form>
                </div>
            </div>

            <form method="dialog" className="modal-backdrop">
                <button>close</button>
            </form>
        </dialog>
    );
}

export default AddIspModal;
