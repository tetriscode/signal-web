import React, { Component, PropTypes } from "react";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import find from "lodash/find";
import ProcessorView from "../components/processor/ProcessorView";
import * as processorActions from "../reducers/processors";

class ProcessorDetailsContainer extends Component {
  componentDidMount() {
    if (!this.props.processor) {
      this.props.actions.loadProcessor(this.props.id);
    }
  }

  render() {
    return (
      <section className="main noPad">
        {this.props.processor ? <ProcessorView {...this.props} /> : null}
      </section>
    );
  }
}

ProcessorDetailsContainer.propTypes = {
  actions: PropTypes.object.isRequired,
  processor: PropTypes.object,
  id: PropTypes.string.isRequired
};

const mapStateToProps = (state, ownProps) => ({
  id: ownProps.params.id,
  processor: find(state.sc.processors.spatial_processors, {
    id: ownProps.params.id
  }),
  menu: state.sc.menu,
  errors: state.sc.processors.errors,
  capabilities: state.sc.processors.capabilities
});

const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators(processorActions, dispatch)
});

// connect this "smart" container component to the redux store
export default connect(mapStateToProps, mapDispatchToProps)(
  ProcessorDetailsContainer
);
