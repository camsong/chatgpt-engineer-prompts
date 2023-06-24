import React, { ErrorInfo, FC, ReactNode } from 'react';
import ReactDOM from 'react-dom/client';
import App from './client/App.tsx';
import './client.css';

interface ErrorBoundaryProps {
  fallbackComponent: FC<{ error: Error | null }>;
  children: ReactNode;
}

interface ErrorBoundaryState {
  hasError: boolean;
  error: Error | null;
}

class ErrorBoundary extends React.Component<ErrorBoundaryProps, ErrorBoundaryState> {
  constructor(props: ErrorBoundaryProps) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error: Error): ErrorBoundaryState {
    // Update state so the next render will show the fallback UI.
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, info: ErrorInfo) {
    console.error('[chat-data] Error occur when rendering', error, info);
  }

  render() {
    const FallbackComponentInErrorBoundary = this.props.fallbackComponent;
    if (this.state.hasError) {
      return <FallbackComponentInErrorBoundary error={this.state.error} />;
    }

    return this.props.children;
  }
}

// eslint-disable-next-line react-refresh/only-export-components
function FallbackComponent(props: { error: Error | null }) {
  return (
    <div className="error-fallback">
      <h4 className="card-title">Oops, We got an error</h4>
      <div className="card-content" style={{ color: 'red' }}>
        {props.error.message && <div>{props.error.message}</div>}
        <div>{props.error.stack && <pre style={{ color: 'red', whiteSpace: 'break-spaces', textAlign: 'left' }}>{props.error.stack}</pre>}</div>
      </div>
    </div>
  );
}

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <ErrorBoundary fallbackComponent={FallbackComponent}>
      <App />
    </ErrorBoundary>
  </React.StrictMode>,
);
