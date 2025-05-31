interface LayoutProps {
    children: React.ReactNode
}

export default function Layout({ children }: LayoutProps) {
    return (
        <div className="w-full min-h-screen flex items-center justify-center">
            {children}
        </div>
    )
}