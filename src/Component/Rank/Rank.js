import React from "react";

export default function Rank ({name, entries}) {
    //console.log("rank: " + name)
    //console.log("rank: " + entries)

    return(
        <div>
            <div className="white f3">
             {`${name}, your current entry count is...`}
            </div>
            <div className="white f1">
             {entries}         
            </div>
        </div>
    )
}