"use client";

import { Component, ReactNode } from "react";

interface ErrorBoundaryProps {
	children: ReactNode;
}

interface ErrorBoundaryState {
	hasError: boolean;
	error?: Error;
}

class ErrorBoundary extends Component<ErrorBoundaryProps, ErrorBoundaryState> {
	constructor(props: ErrorBoundaryProps) {
		super(props);
		this.state = { hasError: false };
	}

	static getDerivedStateFromError(error: Error): ErrorBoundaryState {
		return { hasError: true, error };
	}

	componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
		console.error("Error caught by ErrorBoundary:", error, errorInfo);
	}

	render() {
		if (this.state.hasError) {
			return (
				<div className="flex items-center justify-center h-screen text-center">
					<div>
						<h1 className="text-2xl font-bold text-red-500">
							Oops! Something went wrong.
						</h1>
						<p className="text-gray-600">
							An unexpected error has occurred. Please try refreshing the page.
						</p>
					</div>
				</div>
			);
		}

		return this.props.children;
	}
}

export default ErrorBoundary;
