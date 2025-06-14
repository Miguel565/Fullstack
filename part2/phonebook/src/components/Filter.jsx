const Filter = ({ text, onChange }) => {
    return (
        <div className="filter">
            <label htmlFor="filter">Filter shown with: </label>
            <input
                type="text"
                id="filter"
                value={text}
                onChange={onChange}
            />
        </div>
    )
}

export default Filter