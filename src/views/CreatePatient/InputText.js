function InputText(props) {
    return (
        <div className="row mt-1">
            <div className="col-4 text-right">{props.children}</div>
            <div className="col-8">
                <input type="text" className="w-100" name={props.name} value={props.val} onChange={props.handleChange}/>
            </div>
        </div>
    );
}

export default InputText;