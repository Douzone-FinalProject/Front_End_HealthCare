import ResultSearchContainer from "./ResultSearchContainer";
import ResultContainer from "./ResultContainer";

function Result(props) {
    return (
        <div className="d-flex">
            <ResultSearchContainer props={props}/>
            <ResultContainer />
        </div>
    );
}

export default Result;