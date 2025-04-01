import React from "react";
import { toastError } from "../../utils/toastNotifications";

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true };
  }

  componentDidCatch(error, errorInfo) {
    toastError("Error caught in Error Boundary:", error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return <h1>Something went wrong. Please reload the page.</h1>;
    }
    return this.props.children;
  }
}

export default ErrorBoundary;
