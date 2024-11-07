import { createPortal } from "react-dom";

const Loader = () => (createPortal(
    <div id='overlay'>
        <div className='loader'></div>
    </div>
, document.body));

export default Loader;