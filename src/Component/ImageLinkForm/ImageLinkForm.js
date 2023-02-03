import React from 'react';
import './ImageLinkForm.css'

export default function ImageLinkForm ({onChange, onSubmit}) {
    return (
        <div>
            <p className = "f3">
                {'This will detect faces in your pictures. Give it a try.'}
            </p>
            <div className = "center">
                <div className="form pa4 br3 shadow-5 center">
                    <input className="f4 pa2 w-70 center" type="text" placeholder='paste image url here'
                            onChange={onChange}/>
                    <button className="w-30 grow f4 link ph3 pv2 dib white bg-light-purple" 
                            onClick = {onSubmit}>
                        Detect 
                    </button>
           
                </div>
                 </div>
        </div>

    )
}



