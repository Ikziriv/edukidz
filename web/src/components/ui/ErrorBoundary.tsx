import React from 'react';

interface ErrorBoundaryProps {
  fallback: (reset: () => void) => React.ReactNode;
  /** Changing this value clears a caught error (e.g. when switching viewport). */
  resetKey?: unknown;
  children: React.ReactNode;
}

interface ErrorBoundaryState {
  hasError: boolean;
  prevResetKey?: unknown;
}

export class ErrorBoundary extends React.Component<ErrorBoundaryProps, ErrorBoundaryState> {
  state: ErrorBoundaryState = { hasError: false, prevResetKey: this.props.resetKey };

  static getDerivedStateFromError(): Partial<ErrorBoundaryState> {
    return { hasError: true };
  }

  static getDerivedStateFromProps(props: ErrorBoundaryProps, state: ErrorBoundaryState): Partial<ErrorBoundaryState> | null {
    if (state.hasError && props.resetKey !== state.prevResetKey) {
      return { hasError: false, prevResetKey: props.resetKey };
    }
    return { prevResetKey: props.resetKey };
  }

  componentDidCatch(error: Error) {
    console.error('Story stage failed to render:', error);
  }

  reset = () => this.setState({ hasError: false });

  render() {
    return this.state.hasError ? this.props.fallback(this.reset) : this.props.children;
  }
}
