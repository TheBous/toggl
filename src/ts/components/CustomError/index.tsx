import React, { FC } from "react"; 

import { ICustomErrorProps } from "./index.d";

import "./index.scss";

const CustomError: FC<ICustomErrorProps> = ({ error }): JSX.Element => {
    return (
        <div className="error">
            {error}
        </div>
    )
};

export default CustomError;