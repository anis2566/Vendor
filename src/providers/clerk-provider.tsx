import { ClerkProvider } from '@clerk/nextjs'

interface ClerkProviderProps {
    children: React.ReactNode;
}

export const AuthProvider = ({ children }: ClerkProviderProps) => {
    return (
        <ClerkProvider>
            {children}
        </ClerkProvider>
    )
}