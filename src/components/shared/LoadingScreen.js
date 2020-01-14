import React from 'react';
import Backdrop from "@material-ui/core/Backdrop";
import { withStyles } from "@material-ui/core/styles";
import CircularProgress from "@material-ui/core/CircularProgress";

const styles = theme => ({
    backdrop: {
        zIndex: theme.zIndex.drawer + 1,
        color: '#fff',
    }
});

class LoadingScreen extends React.Component {

    render() {

        return (
            <Backdrop
                className={this.props.classes.backdrop}
                open={true}
            >
                <CircularProgress color="inherit" />
            </Backdrop>
        )
    }

}


export default withStyles(styles)(LoadingScreen);