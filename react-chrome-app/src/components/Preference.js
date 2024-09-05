import React from 'react';


function Preference({id, title, deletePreference}) {
    return (
        <div className="row">
            <div className="col text-center">
                <p>{title}</p>
            </div>
            <div className="col-md-4">
                <input type="image" onClick={() => deletePreference(id)} src="/static/images/bin.png" height="24px" alt="button failed to display" />
            </div>
        </div>
    );
}

export default Preference;
