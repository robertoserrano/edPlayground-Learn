import React, { Component } from 'react'
import {Link} from 'react-router-dom'
import Results from '../../data/results'

export default class CourseBox extends Component {

  constructor(props) {
    super(props);

    this.state = {
      progress: 0
    };

    Results.getCourseResults(this.props.course._id)
      .then(lessonsResults => {
        const progress = Results.calcCourseProgress(lessonsResults);
        this.setState({ progress: progress });
      });
  }

  render() {
    const link = `/course/${this.props.course._id}`;
    const linkText = this.state.progress === 100 ? 'Review' : 'Continue';
    const badge = this.state.progress === 100
      ? <i className="certificate fas fa-certificate"></i>
      : '';

    return (
      <div className="course">
          <h1>{badge} {this.props.course.name}</h1>
          <p className="short-desc">{this.props.course.description}</p>
          <progress className="progress is-success" value={this.state.progress} max="100">{this.state.progress}%</progress>
          <Link to={link} className="ed-link">{linkText}</Link>
      </div>
    );
  }
}