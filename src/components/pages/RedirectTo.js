import React from 'react';
import { Redirect, useLocation } from "react-router-dom";

function useQuery() {
    return new URLSearchParams(useLocation().search);
}

const RedirectTo = () => {
    let query = useQuery();
    return (
        <Redirect to={query.get("dest")} />
    );
}

export default RedirectTo;