import React from 'react';
import Backdrop from "@material-ui/core/Backdrop";
import { withStyles } from "@material-ui/core/styles";
import CircularProgress from "@material-ui/core/CircularProgress";
import { connect } from "react-redux";
import { createLoadingSelector } from '../../apis/selectors';

const styles = theme => ({
    backdrop: {
        zIndex: theme.zIndex.drawer + 1,
        color: '#fff',
    }
});

class LoadingScreen extends React.Component {

    render() {
        if (!this.props.isFetchingList && !this.props.isFetchingView)
            return null;
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


const loadingListSelector = createLoadingSelector(['LIST']);
const loadingViewSelector = createLoadingSelector(['VIEW']);

const mapStateToProps = ({ loading }) => {
    return {
        isFetchingList: loadingListSelector(loading),
        isFetchingView: loadingViewSelector(loading)
    };
};

const componentWithStyle = withStyles(styles)(LoadingScreen);
export default connect(mapStateToProps, null)(componentWithStyle);