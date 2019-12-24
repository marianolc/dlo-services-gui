import React from "react";
import TextField from '@material-ui/core/TextField';
import {withStyles} from "@material-ui/core/styles";
import {Redirect, withRouter} from 'react-router-dom';
import {customer, newCustomer} from "../../actions";
import {connect} from "react-redux";
import FormContainer from "../shared/FormContainer";
import Backdrop from "@material-ui/core/Backdrop";

const styles = theme => ({
        root: {
            padding: theme.spacing(2, 2),
        },
        button: {
            margin: theme.spacing(1),
        },
        textField: {
            marginLeft: theme.spacing(1),
            marginRight: theme.spacing(1),
            width: 200,
        },
        buttonAction: {},
        actionBar: {
            marginRight: '-17px',
            marginLeft: '-17px',
            marginBottom: '-17px',
            padding: theme.spacing(2),
            backgroundColor: '#E5E7E9'
        },
    })
;


class Customer extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            data: null
        }

    }

    handleChange = event => {
        this.setState({[event.target.id]: event.target.value});
    };

    submitData = () => {
        this.props.newCustomer(this.state);
    };

    render() {
        if (this.props.updated)
            return <Redirect to={'/customers'}/>;
        if (!this.props.loaded)
            return <Backdrop open={true}/>;

        const {classes} = this.props;
        return (
            <FormContainer
                title={'Customer'}
                getAction={this.props.customer}
                submitHandler={this.submitData}
                error={this.props.error}
                id={this.props.match.params.id}
                content={
                    <form className={classes.root} noValidate autoComplete="off">
                        <div>
                            <TextField
                                id="name"
                                label="Label"
                                placeholder="Placeholder"
                                fullWidth
                                margin="normal"
                                defaultValue={this.props.data.name}
                                onChange={e => this.handleChange(e)}
                            />
                            <TextField
                                id="email"
                                label="Label"
                                placeholder="Placeholder"
                                fullWidth
                                margin="normal"
                                className={classes.textField}
                                defaultValue={this.props.data.email}
                                onChange={e => this.handleChange(e)}
                            />

                        </div>
                        <div>
                            <TextField
                                id="standard-full-width"
                                label="Label"
                                placeholder="Placeholder"
                                fullWidth
                                margin="normal"
                            />
                        </div>
                    </form>
                }
            />
        );
    }

}

const mapStateToProps = ({viewData}) => {
    console.log(viewData);
    return {
        data: viewData.data,
        error: viewData.error,
        loaded: viewData.loaded,
        updated: viewData.updated
    };
};

export default connect(mapStateToProps, {customer, newCustomer})(withStyles(styles)(withRouter(Customer)));
