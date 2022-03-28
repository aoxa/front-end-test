import React from "react";

const TopicListing = (props) => {
    const {topic} = props;
    return (
        <span style={{display: "inline-block", background: "#eaebed", 
                        border: "solid 1px #dddddd", fontSize: "12px", 
                        padding: "2px 4px 4px", margin: "0 6px 0 0"}}>
            {topic.name}
        </span>
    );
};

export default TopicListing;