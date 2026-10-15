import React, { Component, ErrorInfo, ReactNode } from 'react';
import { AlertCircle, RotateCcw } from 'lucide-react';

interface Props {
  children: ReactNode;
}

interface State {
  hasError: boolean;
  error: Error | null;
}

export default class ErrorBoundary extends Component<Props, State> {
  public state: State = {
    hasError: false,
    error: null,
  };

  public static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error('Uncaught error in application:', error, errorInfo);
  }

  public handleReload = () => {
    window.location.reload();
  };

  public handleReset = () => {
    this.setState({ hasError: false, error: null });
  };

  public render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen flex items-center justify-center p-6 bg-white text-[#202020]">
          <div className="max-w-md w-full p-8 rounded-2xl border border-[#EAEAEA] bg-[#FAFAFA] text-center shadow-xs">
            <div className="w-12 h-12 rounded-xl bg-[#FFE0C2] flex items-center justify-center mx-auto mb-4 text-[#202020]">
              <AlertCircle className="w-6 h-6" />
            </div>
            <h2 className="text-xl font-bold text-[#202020] mb-2">Something went wrong</h2>
            <p className="text-xs text-[#737373] mb-6 leading-relaxed">
              An unexpected error occurred while loading this view. Try reloading or resetting the interface.
            </p>
            {this.state.error && (
              <pre className="text-[11px] bg-white p-3 rounded-lg border border-[#EAEAEA] text-left text-red-600 mb-6 overflow-x-auto max-h-32">
                {this.state.error.message || String(this.state.error)}
              </pre>
            )}
            <div className="flex gap-3 justify-center">
              <button
                onClick={this.handleReset}
                className="px-4 py-2 text-xs font-semibold rounded-lg bg-white border border-[#EAEAEA] text-[#202020] hover:bg-[#FAFAFA] transition-colors"
              >
                Reset View
              </button>
              <button
                onClick={this.handleReload}
                className="px-4 py-2 text-xs font-semibold rounded-lg bg-[#202020] text-white hover:bg-black transition-colors flex items-center gap-1.5"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                <span>Reload Page</span>
              </button>
            </div>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}
