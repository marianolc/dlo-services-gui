import React from "react";

const INITIAL_CONTEXT = {
    activeView: 'principal',
    current: null,
    editing: null,
    isUpdate: false,
    isCreate: false,
    isDelete: false,
    updateAction: null,
    createAction: null,
    deleteAction: null,
};

const Context = React.createContext(INITIAL_CONTEXT);

export class CrudStore extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            ...INITIAL_CONTEXT,
            data: props.data,
            updateAction: props.updateAction,
            createAction: props.createAction,
            deleteAction: props.deleteAction,
            refreshAction: props.refreshAction,
            initialValue: props.initialValue
        };
    }

    onStartUpdate = () => {
        this.setState({
            isUpdate: true,
            isCreate: false,
            isDelete: false,
            editing: { ...this.state.current }
        })
    };

    onStartCreate = () => {
        this.setState({
            isUpdate: false,
            isCreate: true,
            isDelete: false,
            current: this.state.initialValue,
            editing: this.state.current
        })
    };

    onStartDelete = () => {
        this.setState({
            isUpdate: false,
            isCreate: false,
            isDelete: true,
            editing: this.state.current
        })
    };

    onSelected = (d, force) => {
        if (force || this.state.current !== d)
            this.setState({
                current: d,
                isUpdate: false,
                isCreate: false,
                isDelete: false,
                editing: null
            });
    };

    onViewChanged = (d) => this.setState({
        activeView: d
    });

    onCancel = () => {
        return this.setState({
            isUpdate: false,
            isCreate: false,
            isDelete: false,
            current: this.state.editing,
            editing: null
        })
    };

    onTryDelete = () => {
        this.props.deleteAction(this.state.current, this.state.activeView);
    };

    onUpdateOk = (updatedElement) => {
        this.onSelected(this.state.isDelete ? undefined : updatedElement, true);
        this.state.refreshAction && this.state.refreshAction();
    };

    doUpdate = (f) => {
        this.onStartUpdate();
        f();
    };

    render() {
        return (
            <Context.Provider value={
                {
                    ...this.state,
                    onStartUpdate: this.onStartUpdate,
                    onStartCreate: this.onStartCreate,
                    onStartDelete: this.onStartDelete,
                    onSelected: this.onSelected,
                    onViewChanged: this.onViewChanged,
                    onCancel: this.onCancel,
                    onUpdateOk: this.onUpdateOk,
                    onTryDelete: this.onTryDelete,
                    doUpdate: this.doUpdate
                }}>
                {this.props.children}
            </Context.Provider>
        );
    }
}

export default Context;
