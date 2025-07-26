"use client";
import { Component, ErrorInfo, ReactNode } from "react";

class ErrorBoundary extends Component<{ children: ReactNode }, { hasError: boolean }> {
    constructor(props: any) {
        super(props);
        this.state = { hasError: false };
    }

    static getDerivedStateFromError(_: Error) {
        return { hasError: true };
    }

    componentDidCatch(error: Error, info: ErrorInfo) {
        console.error("Erro capturado:", error, info);
    }

    render() {
        if (this.state.hasError) return <h2>Algo deu errado.</h2>;
        return this.props.children;
    }
}

export default ErrorBoundary;
