import React from "react";
import {connect} from "react-redux";

import {customers} from "../../actions";
import TableContainer from "../shared/TableContainer";

class Customers extends React.Component {

    componentDidMount() {
        this.props.customers();
    }

    render() {
        return (
            <TableContainer
                title={'Customers'}
                data={this.props.data}
                error={this.props.error}
                loaded={this.props.loaded}
                loadAction={this.props.customers}
                addView={'new-customer'}
                editView={'customer'}
                columns={[
                    {title: "Id", field: "id"},
                    {title: "Reference code", field: "referenceId"},
                    {title: "Name", field: "name"},
                    {title: "Email", field: "email"},
                    {title: "Address 1", field: "address1"},
                    {title: "Address 2", field: "address2"},
                    {title: "Phone 1", field: "phone1"},
                    {title: "Phone 2", field: "phone2"},
                ]}
            >
            </TableContainer>
        );
    }
}

const mapStateToProps = ({listData}) => {
    return {
        data: listData.data,
        error: listData.error,
        loaded: listData.loaded
    };
};

export default connect(mapStateToProps, {customers})(Customers);
