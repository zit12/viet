// src/components/common/ErrorBoundary.js
import React from 'react';
import ErrorAlert from './ErrorAlert';

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidCatch(error, errorInfo) {
    console.error('Error caught by boundary:', error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <ErrorAlert 
          severity="error"
          message="Đã xảy ra lỗi. Vui lòng thử lại sau."
          onRetry={() => this.setState({ hasError: false })}
        />
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;