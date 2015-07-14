var HomePage = React.createClass({
    getInitialState: function () {
        var goals = [];
        feed.onChange(function (goal) {
            this.setState({goals: goal});
        }.bind(this));
        return {
            goals: goals
        };
    },
    render: function () {
        var rows = [];
        for (var i = 0; i < this.state.goals.length; i++) {
            rows.push(<Row row={this.state.goals[i]} key={this.state.goals[i].EventId}/>);
        }
        return (
            <table className="table table-hover">
                <tbody>
                {rows}
                </tbody>
            </table>
        );
    }
});

var Row = React.createClass({
    getInitialState: function () {

        return {rowClass: ""}
    },
    componentWillReceiveProps: function (nextProps) {
        if (nextProps.row.LastUpdateTime != this.props.row.LastUpdateTime) {

            this.setState({
                rowClass: "success"
            });
            setInterval(this.clearCssClass, 15000);
        }
    },
    clearCssClass: function () {
        this.setState({
            rowClass: ""
        });
        clearInterval(this.clearCssClass);
    },
    render: function () {

        return (
            <tr className={this.state.rowClass}>
                <td>{this.props.row.LastUpdateTime}</td>
                <td>{this.props.row.Minute}</td>
                <td>{this.props.row.HomeTeamName}</td>
                <td>{this.props.row.HomeTeamScore} - {this.props.row.AwayTeamScore} </td>
                <td>{this.props.row.AwayTeamName}</td>
            </tr>
        )
    }
});

React.render(<HomePage />, document.getElementById('main'));