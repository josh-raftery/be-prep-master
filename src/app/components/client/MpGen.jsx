import React from 'react'

const MpGen = () => {
  return (
    <form className="space-y-4 p-4">
      <div className="form-control">
        <label className="label">
          <span className="label-text">Day</span>
        </label>
        <select className="select select-bordered w-full mb-4">
          <option disabled selected>
            Select day
          </option>
          <option>Monday</option>
          <option>Tuesday</option>
          <option>Wednesday</option>
          <option>Thursday</option>
          <option>Friday</option>
          <option>Saturday</option>
          <option>Sunday</option>
        </select>
        <label className="label">
          <span className="label-text">Meal Type</span>
        </label>
        <select className="select select-bordered w-full mb-4">
          <option disabled selected>
            Select meal type
          </option>
          <option>Breakfast</option>
          <option>Lunch</option>
          <option>Dinner</option>
          <option>Snacks</option>
          <option>Dessert</option>
        </select>

        <label className="label">
          <span className="label-text">Meal</span>
        </label>
        <input
          type="text"
          placeholder="Enter your meal"
          className="input input-bordered w-full"
        />
      </div>
      <button type="submit" className="btn btn-primary w-full bg-purple-500">
        Generate
      </button>
    </form>
  );
}

export default MpGen
