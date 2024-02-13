import "./Spinner.css";

interface Spinner {
  active: boolean;
}

const Spinner = ({ active = true }) => {
  return (
    <div className={`ui dimmer ${active ? "active" : null}`}>
      <div className="ui loader"></div>
    </div>
  );
};

export default Spinner;
