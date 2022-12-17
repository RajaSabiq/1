import './spinner.css'
import ClipLoader from "react-spinners/ClipLoader";

const override = {
    display: "block",
    margin: "0 auto",
    borderColor: "#AD00EA",
};

const Spinner = () => {
    return (
        <div className="spinner">
            <ClipLoader
                color={'#AD00EA'}
                loading={true}
                cssOverride={override}
                size={80}
                aria-label="Loading Spinner"
                data-testid="loader"
            />
        </div>
    )
}

export default Spinner