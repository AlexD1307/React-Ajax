import React from "react";
import {get, post, put, del, getAll} from "./../redux/asyncReducer";
import {connect} from "react-redux";

class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            id: "",
            name: "",
            num: ""
        };
        this.onChange = this.onChange.bind(this);
        this.getAll = this.getAll.bind(this);
        this.get = this.get.bind(this);
        this.post = this.post.bind(this);
        this.put = this.put.bind(this);
        this.del = this.del.bind(this);
    }

    onChange(event) {
        let {name, value} = event.target;
        this.setState({
            [name]: value
        });
    }

    getAll() {
        this.props.getAll(this.state.id);
    }

    get() {
        this.props.get(this.state.id);
    }
    post() {
        this.props.post(this.state.name, this.state.num);
    }
    put() {
        this.props.put(this.state.id, this.state.name, this.state.num);
    }
    del() {
        this.props.del(this.state.id);
    }

    render() {
        return (
            <div>
                <div>
                    Channel id:<input type="text" name="id" value={this.state.id} onChange={this.onChange} />
                    <br />
                    Channels name:<input type="text" name="name" value={this.state.name} onChange={this.onChange} />
                    <br />
                    Channel number:<input type="number" name="num" value={this.state.num} onChange={this.onChange} />
                </div>
                <div>
                    <button type="button" onClick={this.getAll}>List</button>
                    <button type="button" onClick={this.get}>Watch</button>
                    <button type="button" onClick={this.post} >Add</button>
                    <button type="button" onClick={this.put}>Change</button>
                    <button type="button" onClick={this.del}>Remove</button>
                    <div>{this.props.status}</div>
                    <div>{this.props.header}</div>
                    <div>{this.props.data}</div>
                </div>
            </div>
        );
    }
}

function mapStateToProps(state) {
    return {
        status: state.channel.status,
        header: state.channel.header,
        data: state.channel.data
    };
};

function mapDispatchToProps(dispatch) {
    return {
        getAll: () => getAll()(dispatch),
        get: id => get(id)(dispatch),
        post: (name, num) => post(name, num)(dispatch),
        put: (id, name, num) => put(id, name, num)(dispatch),
        del: id => del(id)(dispatch)
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(App);