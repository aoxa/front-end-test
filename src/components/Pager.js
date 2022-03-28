import React from "react";

const Pager = (props) => {
    const {page, total} = props;
    return (
        <>
            <a>First</a>
            <a>{page}</a>
            <a>...{total}</a>
            <a>Last</a>
        </>
    );
};

export default Pager;