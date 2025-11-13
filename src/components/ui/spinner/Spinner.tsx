import "./Spinner.css";

const Spinner = () => {
  return (
    <div className="spinner-overlay">
      <div className="spinner">
        <div></div><div></div><div></div>
      </div>
    </div>
  );
}

export default Spinner;