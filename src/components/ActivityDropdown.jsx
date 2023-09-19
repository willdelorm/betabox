import { Dropdown } from "react-bootstrap";

const ActivityDropdown = ({ filter, filterOptions, setFilter }) => {
  return (
    <Dropdown className="flex-fill">
      <Dropdown.Toggle
        variant="outline-dark"
        id="dropdown-time"
        className="w-100"
      >
        {filter}
      </Dropdown.Toggle>

      <Dropdown.Menu>
        {filterOptions.map((option, index) => (
          <Dropdown.Item key={index} onClick={() => setFilter(option)}>
            {option}
          </Dropdown.Item>
        ))}
      </Dropdown.Menu>
    </Dropdown>
  );
};

export default ActivityDropdown;
